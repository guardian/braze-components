export type ColorValueHex = `#${string}`;

const colorValueHexRegex = new RegExp(/^#([A-Fa-f0-9]{6})$/);

export const stringIsColorValueHex = (x: string): x is ColorValueHex => {
    return colorValueHexRegex.test(x);
};

export type Extras = Record<string, ColorValueHex | string>;
export type ErrorHandler = (error: Error, identifier: string) => void;

// slots that support one-shot messages (using Braze's in-app messages)
export enum MessageSlotNames {
    Banner = 'Banner',
    EndOfArticle = 'EndOfArticle',
}
export type MessageSlotName = keyof typeof MessageSlotNames;

// slots that support persistent notifications (using Braze content cards)
export enum CardSlotNames {
    ProfileBadge = 'ProfileBadge', // example slot for now
}
export type CardSlotName = keyof typeof CardSlotNames;

export type InteractiveButtonStatus = 'DEFAULT' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';
