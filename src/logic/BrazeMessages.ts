/* eslint-disable max-classes-per-file */

import type appboy from '@braze/web-sdk-core';
import { MessageCache, MessageWithId } from './LocalMessageCache';
import type { ErrorHandler, Extras, MessageSlotName } from './types';
import { canRenderBrazeMsg } from '../canRender';

interface BrazeArticleContext {
    section?: string;
}
interface BrazeMessagesInterface {
    getMessageForBanner: (articleContext?: BrazeArticleContext) => Promise<BrazeMessage>;
    getMessageForEndOfArticle: (articleContext?: BrazeArticleContext) => Promise<BrazeMessage>;
}

const generateId = (): string => `${Math.random().toString(16).slice(2)}-${new Date().getTime()}`;

const splitByContextFilters = (
    messages: MessageWithId[],
): { messagesWithFilters: MessageWithId[]; messagesWithoutFilters: MessageWithId[] } => {
    return {
        messagesWithFilters: messages.filter((msg) => Boolean(msg.message.extras.section)),
        messagesWithoutFilters: messages.filter((msg) => !Boolean(msg.message.extras.section)),
    };
};

class BrazeMessage {
    id: string;

    appboy: typeof appboy;

    message: appboy.HtmlMessage;

    slotName: MessageSlotName;

    cache: MessageCache;

    errorHandler: ErrorHandler;

    constructor(
        id: string,
        message: appboy.HtmlMessage,
        appboyInstance: typeof appboy,
        slotName: MessageSlotName,
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
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.errorHandler(error, 'BrazeMessage.logImpression');
            }
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
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.errorHandler(error, 'BrazeMessage.logButtonClick');
            }
        }
    }

    get extras(): Extras | undefined {
        return this.message.extras;
    }
}

class BrazeMessages implements BrazeMessagesInterface {
    appboy: typeof appboy;

    freshMessageBySlot: Record<MessageSlotName, Promise<appboy.HtmlMessage>>;

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
    private getFreshMessagesForSlot(targetSlotName: MessageSlotName): Promise<appboy.HtmlMessage> {
        return new Promise((resolve) => {
            const callback = (m: appboy.InAppMessage | appboy.ControlMessage) => {
                // Cast this as we only ever expect it to be an HtmlMessage (subclass of InAppMessage)
                const message = m as appboy.HtmlMessage;
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

    getMessageForBanner(articleContext?: BrazeArticleContext): Promise<BrazeMessage> {
        return this.getMessageForSlot('Banner', articleContext);
    }

    getMessageForEndOfArticle(articleContext?: BrazeArticleContext): Promise<BrazeMessage> {
        return this.getMessageForSlot('EndOfArticle', articleContext);
    }

    private getMessageForSlot(slotName: MessageSlotName, articleContext?: BrazeArticleContext) {
        // If there's already a message in the cache, return it
        const firstRenderableMessage = this.getHighestPriorityMessageFromCache(
            slotName,
            articleContext,
        );

        if (firstRenderableMessage) {
            return Promise.resolve(firstRenderableMessage);
        }

        // Otherwise we'll wait for a fresh message to arrive, returning the
        // data from the cache (where it will have already been added)
        return this.freshMessageBySlot[slotName].then(() => {
            const firstRenderableMessage = this.getHighestPriorityMessageFromCache(
                slotName,
                articleContext,
            );

            if (firstRenderableMessage) {
                return Promise.resolve(firstRenderableMessage);
            }

            // Generally we don't expect to reach this point
            throw new Error(`No valid messages for ${slotName} slot`);
        });
    }

    private getHighestPriorityMessageFromCache(
        slotName: MessageSlotName,
        articleContext?: BrazeArticleContext,
    ) {
        const messagesFromCache = this.cache.all(slotName, this.appboy, this.errorHandler);

        const allRenderableMessages = messagesFromCache.filter((msg) =>
            canRenderBrazeMsg(msg.message.extras),
        );

        // We want to prioritise messages with a filter if any of those match
        const { messagesWithFilters, messagesWithoutFilters } =
            splitByContextFilters(allRenderableMessages);

        const [firstRenderableMessage] = messagesWithFilters
            .concat(messagesWithoutFilters)
            .filter((msg) => {
                // The message does not have a section filter
                if (!msg.message.extras.section || typeof msg.message.extras.section != 'string') {
                    return true;
                }

                // The message has section(s) but no section was provided by the page
                const pageSection = articleContext?.section?.toLowerCase();
                if (!pageSection) {
                    return false;
                }

                // The message has a section filter and the page provided a section, do they match?
                const messageSections = msg.message.extras.section
                    .split('|')
                    .map((section) => section.toLowerCase());
                return messageSections.includes(pageSection);
            });

        if (firstRenderableMessage) {
            return new BrazeMessage(
                firstRenderableMessage.id,
                firstRenderableMessage.message,
                this.appboy,
                slotName,
                this.cache,
                this.errorHandler,
            );
        }

        return;
    }
}

export { BrazeMessages, BrazeMessagesInterface, BrazeMessage, BrazeArticleContext };
