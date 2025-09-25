import { canRenderBrazeMsg } from './canRender';
import { MessageSlotNames, type Extras } from './types';

describe('canRenderBrazeMsg', () => {
    describe('existing functionality', () => {
        it('returns false when msgExtras is undefined', () => {
            expect(canRenderBrazeMsg(undefined)).toBe(false);
        });

        it('returns false when msgExtras is null', () => {
            expect(canRenderBrazeMsg(null as any)).toBe(false);
        });

        it('returns false when componentName is missing and no raw HTML flags are present', () => {
            const msgExtras: Extras = {
                slotName: MessageSlotNames.Banner,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });

        it('returns false when using Default slot without renderRawHtml flag', () => {
            // Note: This test documents expected behavior, but the main validation
            // for Default slot exclusivity happens in getMessageForDefault()
            const msgExtras: Extras = {
                slotName: MessageSlotNames.Default,
                componentName: 'SomeComponent',
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });
    });

    describe('raw HTML fallback functionality', () => {
        it('returns true when renderRawHtml is "true" and slotName is "Banner"', () => {
            const msgExtras: Extras = {
                renderRawHtml: 'true',
                slotName: MessageSlotNames.Banner,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });

        it('returns true when renderRawHtml is "true" and slotName is "EndOfArticle"', () => {
            const msgExtras: Extras = {
                renderRawHtml: 'true',
                slotName: 'EndOfArticle',
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });

        it('returns true when renderRawHtml is "true" and slotName is "Default"', () => {
            const msgExtras: Extras = {
                renderRawHtml: 'true',
                slotName: MessageSlotNames.Default,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });

        it('returns true when renderRawHtml is "true" with any valid slotName', () => {
            const msgExtras: Extras = {
                renderRawHtml: 'true',
                slotName: MessageSlotNames.Default,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });

        it('returns false when renderRawHtml is "false"', () => {
            const msgExtras: Extras = {
                renderRawHtml: 'false',
                slotName: MessageSlotNames.Banner,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });

        it('returns false when renderRawHtml is not exactly "true"', () => {
            const msgExtras: Extras = {
                renderRawHtml: '1',
                slotName: MessageSlotNames.Banner,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });

        it('returns false when renderRawHtml is missing', () => {
            const msgExtras: Extras = {
                slotName: MessageSlotNames.Banner,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });

        it('returns false when slotName is empty string', () => {
            const msgExtras: Extras = {
                renderRawHtml: 'true',
                slotName: '',
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });

        it('returns false when slotName is missing', () => {
            const msgExtras: Extras = {
                renderRawHtml: 'true',
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });
    });
});
