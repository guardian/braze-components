import { canRenderBrazeMsg } from './canRender';
import type { Extras } from './types';

describe('canRenderBrazeMsg', () => {
    it('returns false when msgExtras is undefined', () => {
        expect(canRenderBrazeMsg(undefined)).toBe(false);
    });

    it('returns true for a valid Epic component', () => {
        const msgExtras: Extras = {
            componentName: 'Epic',
            slotName: 'EndOfArticle',
            buttonText: 'Support Now',
            buttonUrl: 'https://support.theguardian.com',
            ophanComponentId: 'test-epic',
            paragraph1: 'Test paragraph',
        };
        expect(canRenderBrazeMsg(msgExtras)).toBe(true);
    });

    it('returns false for an unknown component name', () => {
        const msgExtras: Extras = {
            componentName: 'UnknownComponent',
            slotName: 'Banner',
        };
        expect(canRenderBrazeMsg(msgExtras)).toBe(false);
    });

    it('returns true for raw HTML message with message and slotName', () => {
        const msgExtras: Extras = {
            slotName: 'Banner',
            message: '<h1>Hello World</h1>',
        };
        expect(canRenderBrazeMsg(msgExtras)).toBe(true);
    });

    it('returns false for message without componentName and without message field', () => {
        const msgExtras: Extras = {
            slotName: 'Banner',
            // No componentName, no message
        };
        expect(canRenderBrazeMsg(msgExtras)).toBe(false);
    });

    it('returns false for message without componentName and without slotName', () => {
        const msgExtras: Extras = {
            message: '<h1>Hello World</h1>',
            // No componentName, no slotName
        };
        expect(canRenderBrazeMsg(msgExtras)).toBe(false);
    });

    it('returns true for raw HTML message with empty string message (edge case)', () => {
        const msgExtras: Extras = {
            slotName: 'Banner',
            message: '',
        };
        // Empty string is falsy, so should return false
        expect(canRenderBrazeMsg(msgExtras)).toBe(false);
    });
});
