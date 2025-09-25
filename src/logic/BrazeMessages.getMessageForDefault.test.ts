import { BrazeMessages } from './BrazeMessages';
import type { MessageCache } from './LocalMessageCache';
import { MessageSlotNames, type ErrorHandler } from './types';

// Mock braze module
const mockBraze = {
    HtmlMessage: jest.fn(),
    InAppMessageButton: jest.fn(),
    logInAppMessageImpression: jest.fn(),
    logInAppMessageButtonClick: jest.fn(),
    subscribeToInAppMessage: jest.fn(),
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

// Mock canRender function
const mockCanRender = jest.fn(() => true);

describe('BrazeMessages.getMessageForDefault', () => {
    let brazeMessages: BrazeMessages;

    beforeEach(() => {
        jest.clearAllMocks();
        brazeMessages = new BrazeMessages(
            mockBraze as any,
            mockCache,
            mockErrorHandler,
            mockCanRender,
        );
    });

    it('returns message when renderRawHtml is "true"', async () => {
        const mockMessage = {
            extras: {
                renderRawHtml: 'true',
                slotName: MessageSlotNames.Default,
            },
            message: '<h1>Raw HTML content</h1>',
        };

        // Mock the cache to return a valid message
        (mockCache.peek as jest.Mock).mockReturnValue({
            id: 'test-id',
            message: mockMessage,
        });

        const result = await brazeMessages.getMessageForDefault();

        expect(result.extras?.renderRawHtml).toBe('true');
        expect(result.extras?.slotName).toBe(MessageSlotNames.Default);
    });

    it('throws error when renderRawHtml is not "true"', async () => {
        const mockMessage = {
            extras: {
                slotName: MessageSlotNames.Default,
                componentName: 'SomeComponent',
            },
            message: 'Some content',
        };

        // Mock the cache to return a message without renderRawHtml
        (mockCache.peek as jest.Mock).mockReturnValue({
            id: 'test-id',
            message: mockMessage,
        });

        await expect(brazeMessages.getMessageForDefault()).rejects.toThrow(
            'Default slot can only be used with raw HTML messages (renderRawHtml: "true")',
        );
    });

    it('throws error when renderRawHtml is "false"', async () => {
        const mockMessage = {
            extras: {
                renderRawHtml: 'false',
                slotName: MessageSlotNames.Default,
            },
            message: 'Some content',
        };

        // Mock the cache to return a message with renderRawHtml: "false"
        (mockCache.peek as jest.Mock).mockReturnValue({
            id: 'test-id',
            message: mockMessage,
        });

        await expect(brazeMessages.getMessageForDefault()).rejects.toThrow(
            'Default slot can only be used with raw HTML messages (renderRawHtml: "true")',
        );
    });

    it('throws error when extras is undefined', async () => {
        const mockMessage = {
            message: 'Some content',
        };

        // Mock the cache to return a message without extras
        (mockCache.peek as jest.Mock).mockReturnValue({
            id: 'test-id',
            message: mockMessage,
        });

        await expect(brazeMessages.getMessageForDefault()).rejects.toThrow(
            'Default slot can only be used with raw HTML messages (renderRawHtml: "true")',
        );
    });

    it('works with article context parameter', async () => {
        const mockMessage = {
            extras: {
                renderRawHtml: 'true',
                slotName: MessageSlotNames.Default,
                section: 'technology',
            },
            message: '<div>Tech content</div>',
        };

        (mockCache.peek as jest.Mock).mockReturnValue({
            id: 'test-id',
            message: mockMessage,
        });

        const articleContext = { section: 'technology' };
        const result = await brazeMessages.getMessageForDefault(articleContext);

        expect(result.extras?.renderRawHtml).toBe('true');
        expect(result.extras?.section).toBe('technology');
    });
});
