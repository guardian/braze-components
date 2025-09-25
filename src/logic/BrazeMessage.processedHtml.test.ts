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

// Sample HTML content similar to the provided index.html
const sampleCompleteHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
    <style>.bz-modal { background: white; }</style>
</head>
<body>
    <div class="bz-page active">
        <div class="bz-modal">
            <div class="bz-modal-content">
                <h2>This is the modal content</h2>
                <p>Some modal text here</p>
                <button class="bz-close-btn">Close</button>
            </div>
        </div>
    </div>
    <script>
        console.log('Some script');
    </script>
</body>
</html>
`.trim();

const expectedModalHtml = `<div class="bz-modal">
            <div class="bz-modal-content">
                <h2>This is the modal content</h2>
                <p>Some modal text here</p>
                <button class="bz-close-btn">Close</button>
            </div>
        </div>`;

describe('BrazeMessage processedHtml getter', () => {
    const createBrazeMessage = (html: string, slotName: MessageSlotName) => {
        const mockHtmlMessage = {
            extras: {
                renderRawHtml: 'true',
                slotName,
            },
            message: html,
        };

        return new BrazeMessage(
            'test-id',
            mockHtmlMessage as any,
            mockBraze as any,
            slotName,
            mockCache,
            mockErrorHandler,
        );
    };

    describe('Default slot behavior', () => {
        it('returns raw HTML without processing for Default slot', () => {
            const brazeMessage = createBrazeMessage(sampleCompleteHtml, MessageSlotNames.Default);

            expect(brazeMessage.processedHtml).toBe(sampleCompleteHtml);
        });

        it('returns raw HTML even if it contains .bz-modal for Default slot', () => {
            const brazeMessage = createBrazeMessage(sampleCompleteHtml, MessageSlotNames.Default);

            // Should get the complete HTML, not just the modal part
            expect(brazeMessage.processedHtml).toContain('<!DOCTYPE html>');
            expect(brazeMessage.processedHtml).toContain('<script>');
            expect(brazeMessage.processedHtml).toBe(sampleCompleteHtml);
        });
    });

    describe('Banner slot behavior', () => {
        it('extracts .bz-modal content for Banner slot', () => {
            const brazeMessage = createBrazeMessage(sampleCompleteHtml, MessageSlotNames.Banner);

            const processed = brazeMessage.processedHtml;
            expect(processed).toContain('class="bz-modal"');
            expect(processed).toContain('This is the modal content');
            expect(processed).not.toContain('<!DOCTYPE html>');
            expect(processed).not.toContain('<script>');
        });

        it('returns raw HTML if no .bz-modal found for Banner slot', () => {
            const htmlWithoutModal = '<div class="some-content">No modal here</div>';
            const brazeMessage = createBrazeMessage(htmlWithoutModal, MessageSlotNames.Banner);

            expect(brazeMessage.processedHtml).toBe(htmlWithoutModal);
        });
    });

    describe('EndOfArticle slot behavior', () => {
        it('extracts .bz-modal content for EndOfArticle slot', () => {
            const brazeMessage = createBrazeMessage(
                sampleCompleteHtml,
                MessageSlotNames.EndOfArticle,
            );

            const processed = brazeMessage.processedHtml;
            expect(processed).toContain('class="bz-modal"');
            expect(processed).toContain('This is the modal content');
            expect(processed).not.toContain('<!DOCTYPE html>');
            expect(processed).not.toContain('<script>');
        });
    });

    describe('Error handling', () => {
        it('returns raw HTML when DOM parsing fails', () => {
            // Mock DOMParser to throw an error
            const originalDOMParser = global.DOMParser;
            global.DOMParser = jest.fn().mockImplementation(() => ({
                parseFromString: jest.fn().mockImplementation(() => {
                    throw new Error('Parse error');
                }),
            }));

            const brazeMessage = createBrazeMessage(sampleCompleteHtml, MessageSlotNames.Banner);

            expect(brazeMessage.processedHtml).toBe(sampleCompleteHtml);

            // Restore original DOMParser
            global.DOMParser = originalDOMParser;
        });

        it('returns undefined when html getter returns undefined', () => {
            const mockHtmlMessage = {
                extras: { renderRawHtml: 'true', slotName: MessageSlotNames.Banner },
                message: 123, // Invalid message type
            };

            const brazeMessage = new BrazeMessage(
                'test-id',
                mockHtmlMessage as any,
                mockBraze as any,
                MessageSlotNames.Banner,
                mockCache,
                mockErrorHandler,
            );

            expect(brazeMessage.processedHtml).toBeUndefined();
        });
    });

    describe('Multiple modal elements', () => {
        it('returns the first .bz-modal when multiple exist', () => {
            const htmlWithMultipleModals = `
                <div class="bz-modal" id="first">First modal</div>
                <div class="bz-modal" id="second">Second modal</div>
            `;

            const brazeMessage = createBrazeMessage(
                htmlWithMultipleModals,
                MessageSlotNames.Banner,
            );

            const processed = brazeMessage.processedHtml;
            expect(processed).toContain('id="first"');
            expect(processed).toContain('First modal');
            expect(processed).not.toContain('id="second"');
        });
    });
});
