import * as braze from '@braze/web-sdk';
import { storage } from '@guardian/libs';
import { MessageSlotName, MessageSlotNames } from './types';
import type { ErrorHandler } from './types';

const localStorageKeyBase = 'gu.brazeMessageCache';
export const millisecondsBeforeExpiry = 1000 * 60 * 60 * 24; // 24 hours: 60 seconds * 60 minutes

type Message = braze.HtmlMessage;

export type MessageWithId = {
    id: string;
    message: Message;
};

// From the serialized JSON, duplicated from the Braze SDK types
export type MessageData = {
    message: string;
    extras?: Record<string, string>;
    campaignId?: string;
    cardId?: string;
    triggerId?: string;
    dismissType?: braze.DismissType;
    duration?: number;
    animateIn?: boolean;
    animateOut?: boolean;
    frameColor?: number;
    htmlId?: string;
    css?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messageFields?: Record<string, any>;
};

type CachedMessage = {
    message: {
        id: string;
        message: MessageData;
    };
    expires: number; // Expiry date in Unix time
};

const MAX_QUEUE_SIZE = 2;

const keyFromSlotName = (slotName: MessageSlotName): string => `${localStorageKeyBase}.${slotName}`;

const hasNotExpired = (cachedMessage: CachedMessage) => cachedMessage.expires > Date.now();

// setQueue is effectively private, but it's useful to expose it publicly
// so that we can use it in the tests
const setQueue = (slotName: MessageSlotName, queue: CachedMessage[]): void => {
    const key = keyFromSlotName(slotName);
    storage.local.set(key, queue);
};

const readQueue = (slotName: MessageSlotName): CachedMessage[] => {
    const key = keyFromSlotName(slotName);
    const queue = storage.local.get(key);

    if (Array.isArray(queue)) {
        return queue;
    }

    return [];
};

const hydrateMessage = (
    messageData: MessageData,
    brazeInstance: typeof braze,
): braze.HtmlMessage => {
    /**
     * Removed APIs
     * The following methods and properties have been removed:
     * "cardId" and "campaignId" properties of In-App Messages
     * https://github.com/braze-inc/braze-web-sdk/blob/master/UPGRADE_GUIDE.md#removed-apis-1
     * We will move them into "extras" to keep the same data as before
     */
    let extras: Record<string, string> | undefined = messageData.extras;
    if (messageData.cardId) {
        if (!extras) {
            extras = {};
        }
        extras.cardId = messageData.cardId;
    }
    if (messageData.campaignId) {
        if (!extras) {
            extras = {};
        }
        extras.campaignId = messageData.campaignId;
    }

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    const hydratedMessage = new brazeInstance.HtmlMessage(
        messageData.message,
        extras,
        messageData.triggerId,
        messageData.dismissType,
        messageData.duration,
        messageData.animateIn,
        messageData.animateOut,
        messageData.frameColor,
        messageData.htmlId,
        messageData.css,
        messageData.messageFields,
    );
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */

    return hydratedMessage;
};

const isValid = (m: CachedMessage): boolean => {
    return Boolean(
        m?.expires &&
            Number.isFinite(m?.expires) &&
            m?.message?.id &&
            m?.message?.message?.triggerId &&
            m?.message?.message?.extras,
    );
};

const getQueue = (slotName: MessageSlotName, errorHandler: ErrorHandler): CachedMessage[] => {
    const queue = readQueue(slotName);
    const validQueue = queue.filter((i) => isValid(i));
    const unexpiredQueue = validQueue.filter((i) => hasNotExpired(i));

    if (queue.length !== unexpiredQueue.length) {
        const expiredMessageCount = queue.length - unexpiredQueue.length;

        errorHandler(
            Error(
                `Removed ${expiredMessageCount} expired message${
                    expiredMessageCount === 1 ? '' : 's'
                } from queue`,
            ),
            'LocalMessageCache',
        );

        setQueue(slotName, unexpiredQueue);
    }

    return unexpiredQueue;
};

interface MessageCache {
    peek: (
        slotName: MessageSlotName,
        brazeInstance: typeof braze,
        errorHandler: ErrorHandler,
    ) => MessageWithId | undefined;
    all: (
        slotName: MessageSlotName,
        brazeInstance: typeof braze,
        errorHandler: ErrorHandler,
    ) => MessageWithId[];
    remove: (slotName: MessageSlotName, id: string, errorHandler: ErrorHandler) => boolean;
    push: (
        slotName: MessageSlotName,
        message: MessageWithId,
        errorHandler: ErrorHandler,
    ) => boolean;
    clear: () => void;
}

class LocalMessageCache {
    static peek(
        slotName: MessageSlotName,
        brazeInstance: typeof braze,
        errorHandler: ErrorHandler,
    ): MessageWithId | undefined {
        const queue = getQueue(slotName, errorHandler);
        const topItem = queue[0];

        if (topItem) {
            return {
                id: topItem.message.id,
                message: hydrateMessage(topItem.message.message, brazeInstance),
            };
        }
        return;
    }

    static all(
        slotName: MessageSlotName,
        brazeInstance: typeof braze,
        errorHandler: ErrorHandler,
    ): MessageWithId[] {
        const queue = getQueue(slotName, errorHandler);

        return queue.map((item) => ({
            id: item.message.id,
            message: hydrateMessage(item.message.message, brazeInstance),
        }));
    }

    static remove(slotName: MessageSlotName, id: string, errorHandler: ErrorHandler): boolean {
        const queue = getQueue(slotName, errorHandler);
        const idx = queue.findIndex((i) => i.message.id === id);

        if (idx >= 0) {
            const removedItem = queue.splice(idx, 1);

            if (removedItem) {
                setQueue(slotName, queue);
                return true;
            }
        }

        return false;
    }

    static push(
        slotName: MessageSlotName,
        message: MessageWithId,
        errorHandler: ErrorHandler,
    ): boolean {
        const queue = getQueue(slotName, errorHandler);

        if (queue.length < MAX_QUEUE_SIZE) {
            const expires = Date.now() + millisecondsBeforeExpiry;

            const messageToCache: CachedMessage = {
                // Casting here as the Message will become a MessageData as part
                // of the JSON serialization proccess
                message: message as { id: string; message: MessageData },
                expires,
            };

            queue.push(messageToCache);

            setQueue(slotName, queue);
            return true;
        }
        errorHandler(new Error('Failed to add message to queue - queue full'), 'LocalMessageCache');

        return false;
    }

    static clear(): void {
        // eslint-disable-next-line guard-for-in
        for (const slotName in MessageSlotNames) {
            const key = keyFromSlotName(slotName as MessageSlotName);
            storage.local.remove(key);
        }
    }
}

export { LocalMessageCache, CachedMessage, MessageCache, setQueue, hydrateMessage };
