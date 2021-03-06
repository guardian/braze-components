/* eslint-disable max-classes-per-file */

import type appboy from '@braze/web-sdk-core';
import { MessageCache } from './LocalMessageCache';
import type { SlotName } from './types';
import { canRenderBrazeMsg } from '../canRender';

export type Extras = Record<string, string>;
export type ErrorHandler = (error: Error, identifier: string) => void;

interface BrazeMessagesInterface {
    getMessageForBanner: () => Promise<BrazeMessage>;
    getMessageForEndOfArticle: () => Promise<BrazeMessage>;
}

const generateId = (): string => `${Math.random().toString(16).slice(2)}-${new Date().getTime()}`;

class BrazeMessage {
    id: string;

    appboy: typeof appboy;

    message: appboy.InAppMessage;

    slotName: SlotName;

    cache: MessageCache;

    errorHandler: ErrorHandler;

    constructor(
        id: string,
        message: appboy.InAppMessage,
        appboyInstance: typeof appboy,
        slotName: SlotName,
        cache: MessageCache,
        errorHandler: ErrorHandler,
    ) {
        this.id = id;
        this.message = message;
        this.appboy = appboyInstance;
        this.slotName = slotName;
        this.cache = cache;
        this.errorHandler = errorHandler;
    }

    logImpression(): void {
        try {
            this.appboy.logInAppMessageImpression(this.message);
        } catch (error) {
            this.errorHandler(error, 'BrazeMessage.logImpression');
        }

        this.cache.remove(this.slotName, this.id, this.errorHandler);
    }

    logButtonClick(internalButtonId: number): void {
        const button = new this.appboy.InAppMessageButton(
            `Button: ID ${internalButtonId}`,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            internalButtonId,
        );
        try {
            this.appboy.logInAppMessageButtonClick(button, this.message);
        } catch (error) {
            this.errorHandler(error, 'BrazeMessage.logButtonClick');
        }
    }

    get extras(): Extras | undefined {
        return this.message.extras;
    }
}

class BrazeMessages implements BrazeMessagesInterface {
    appboy: typeof appboy;

    freshMessageBySlot: Record<SlotName, Promise<appboy.InAppMessage>>;

    cache: MessageCache;

    errorHandler: ErrorHandler;

    constructor(appboyInstance: typeof appboy, cache: MessageCache, errorHandler: ErrorHandler) {
        this.appboy = appboyInstance;
        this.cache = cache;
        this.freshMessageBySlot = {
            Banner: this.getFreshMessagesForSlot('Banner'),
            EndOfArticle: this.getFreshMessagesForSlot('EndOfArticle'),
        };
        this.errorHandler = errorHandler;
    }

    // Generally we only expect a single message per slot max in a pageview. This method
    // returns a promise which will resolve when the first message arrives
    private getFreshMessagesForSlot(targetSlotName: SlotName): Promise<appboy.InAppMessage> {
        return new Promise((resolve) => {
            const callback = (m: appboy.InAppMessage | appboy.ControlMessage) => {
                // Cast this as we only ever expect it to be an InAppMessage
                const message = m as appboy.InAppMessage;
                const { extras } = message;

                if (extras && extras.slotName && extras.slotName === targetSlotName) {
                    this.cache.push(
                        targetSlotName,
                        {
                            message,
                            id: generateId(),
                        },
                        this.errorHandler,
                    );

                    resolve(message);
                }
            };

            this.appboy.subscribeToInAppMessage(callback);
        });
    }

    getMessageForBanner(): Promise<BrazeMessage> {
        return this.getMessageForSlot('Banner');
    }

    getMessageForEndOfArticle(): Promise<BrazeMessage> {
        return this.getMessageForSlot('EndOfArticle');
    }

    private getMessageForSlot(slotName: SlotName) {
        // If there's already a message in the cache, return it
        const messagesFromCache = this.cache.all(slotName, this.appboy, this.errorHandler);

        const [firstRenderableMessage] = messagesFromCache.filter((msg) =>
            canRenderBrazeMsg(msg.message.extras),
        );

        if (firstRenderableMessage) {
            return Promise.resolve(
                new BrazeMessage(
                    firstRenderableMessage.id,
                    firstRenderableMessage.message,
                    this.appboy,
                    slotName,
                    this.cache,
                    this.errorHandler,
                ),
            );
        }

        // Otherwise we'll wait for a fresh message to arrive, returning the
        // data from the cache (where it will have already been added)
        return this.freshMessageBySlot[slotName].then(() => {
            const messagesFromCache = this.cache.all(slotName, this.appboy, this.errorHandler);

            const [firstValidMessage] = messagesFromCache.filter((msg) =>
                canRenderBrazeMsg(msg.message.extras),
            );

            if (firstValidMessage) {
                return new BrazeMessage(
                    firstValidMessage.id,
                    firstValidMessage.message,
                    this.appboy,
                    slotName,
                    this.cache,
                    this.errorHandler,
                );
            }

            // Generally we don't expect to reach this point
            throw new Error(`No valid messages for ${slotName} slot`);
        });
    }
}

export { BrazeMessages, BrazeMessagesInterface, BrazeMessage };
