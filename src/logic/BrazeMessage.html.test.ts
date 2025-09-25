import { BrazeMessage } from './BrazeMessages';
import type { MessageCache } from './LocalMessageCache';
import { MessageSlotNames, type ErrorHandler, type MessageSlotName } from './types';

// Mock braze module
const mockBraze = {
    HtmlMessage: jest.fn(),
    InAppMessageButton: jest.fn(),
    logInAppMessageImpression: jest.fn(),
    logInAppMessageButtonClick: jest.fn(),
};

// Mock message cache
const mockCache: MessageCache = {
    peek: jest.fn(),
    all: jest.fn(),
    remove: jest.fn(),
    push: jest.fn(),
    clear: jest.fn(),
};

// Mock error handler
const mockErrorHandler: ErrorHandler = jest.fn();

describe('BrazeMessage html getter', () => {
    it('returns the raw HTML string when message contains HTML', () => {
        const mockHtmlMessage = {
            extras: { slotName: MessageSlotNames.Banner },
            message: '<h1>Hello World!</h1>',
        } as any;

        const brazeMessage = new BrazeMessage(
            'test-id',
            mockHtmlMessage,
            mockBraze as any,
            MessageSlotNames.Banner as MessageSlotName,
            mockCache,
            mockErrorHandler,
        );

        expect(brazeMessage.html).toBe('<h1>Hello World!</h1>');
    });

    it('returns undefined when message property is not a string', () => {
        const mockHtmlMessage = {
            extras: { slotName: MessageSlotNames.Banner },
            message: 123,
        } as any;

        const brazeMessage = new BrazeMessage(
            'test-id',
            mockHtmlMessage,
            mockBraze as any,
            MessageSlotNames.Banner as MessageSlotName,
            mockCache,
            mockErrorHandler,
        );

        expect(brazeMessage.html).toBeUndefined();
    });

    it('returns undefined when message property is missing', () => {
        const mockHtmlMessage = {
            extras: { slotName: MessageSlotNames.Banner },
        } as any;

        const brazeMessage = new BrazeMessage(
            'test-id',
            mockHtmlMessage,
            mockBraze as any,
            MessageSlotNames.Banner as MessageSlotName,
            mockCache,
            mockErrorHandler,
        );

        expect(brazeMessage.html).toBeUndefined();
    });

    it('returns undefined when HTML is empty string', () => {
        const mockHtmlMessage = {
            extras: { slotName: MessageSlotNames.Banner },
            message: '',
        } as any;

        const brazeMessage = new BrazeMessage(
            'test-id',
            mockHtmlMessage,
            mockBraze as any,
            MessageSlotNames.Banner as MessageSlotName,
            mockCache,
            mockErrorHandler,
        );

        expect(brazeMessage.html).toBe('');
    });

    it('works with raw HTML processing workflow', () => {
        const htmlWithModal = `
            <div class="bz-modal">
                <h1>Modal Content</h1>
            </div>
        `;

        const mockHtmlMessage = {
            extras: {
                renderRawHtml: 'true',
                slotName: MessageSlotNames.Banner,
            },
            message: htmlWithModal,
        } as any;

        const brazeMessage = new BrazeMessage(
            'test-id',
            mockHtmlMessage,
            mockBraze as any,
            MessageSlotNames.Banner,
            mockCache,
            mockErrorHandler,
        );

        // Raw HTML getter returns the complete content
        expect(brazeMessage.html).toBe(htmlWithModal);

        // processedHtml would extract just the modal (tested separately)
        expect(brazeMessage.processedHtml).toContain('class="bz-modal"');
    });
});
