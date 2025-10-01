import { canRenderBrazeMsg } from './canRender';
import { MessageSlotNames, type Extras } from './types';

describe('canRenderBrazeMsg', () => {
    describe('existing functionality', () => {
        it('returns false when msgExtras is undefined', () => {
            expect(canRenderBrazeMsg(undefined)).toBe(false);
        });

        it('returns false when msgExtras is null', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(canRenderBrazeMsg(null as any)).toBe(false);
        });

        it('returns true when only slotName is provided (allows raw HTML)', () => {
            const msgExtras: Extras = {
                slotName: MessageSlotNames.Banner,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });

        it('returns true when a valid componentName is provided', () => {
            const msgExtras: Extras = {
                slotName: MessageSlotNames.Banner,
                componentName: 'SomeComponent',
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });
    });

    describe('valid slot name functionality', () => {
        it('returns true when slotName is "Banner"', () => {
            const msgExtras: Extras = {
                slotName: MessageSlotNames.Banner,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });

        it('returns true when slotName is "EndOfArticle"', () => {
            const msgExtras: Extras = {
                slotName: 'EndOfArticle',
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });

        it('returns true with any valid slotName', () => {
            const msgExtras: Extras = {
                slotName: MessageSlotNames.Banner,
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(true);
        });

        it('returns false when slotName is empty string', () => {
            const msgExtras: Extras = {
                slotName: '',
            };
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });

        it('returns false when slotName is missing', () => {
            const msgExtras: Extras = {};
            expect(canRenderBrazeMsg(msgExtras)).toBe(false);
        });
    });
});
