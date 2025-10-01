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

    it('works with complex HTML content', () => {
        const complexHtml = `
            <div class="bz-custom-content">
                <h1>Custom Content</h1>
                <p>Some complex HTML structure</p>
                <button onclick="alert('test')">Click me</button>
            </div>
        `;

        const mockHtmlMessage = {
            extras: {
                slotName: MessageSlotNames.Banner,
            },
            message: complexHtml,
        } as any;

        const brazeMessage = new BrazeMessage(
            'test-id',
            mockHtmlMessage,
            mockBraze as any,
            MessageSlotNames.Banner,
            mockCache,
            mockErrorHandler,
        );

        // Raw HTML getter returns the complete content as-is
        expect(brazeMessage.html).toBe(complexHtml);
        expect(brazeMessage.html).toContain('class="bz-modal"');
        expect(brazeMessage.html).toContain('onclick="alert(\'test\')"');
    });
});
