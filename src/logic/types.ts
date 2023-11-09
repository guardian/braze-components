type ColorValueHex = `#${string}`;

type Extras = Record<string, ColorValueHex | string>;
type ErrorHandler = (error: Error, identifier: string) => void;

// slots that support one-shot messages (using Braze's in-app messages)
enum MessageSlotNames {
    Banner = 'Banner',
    EndOfArticle = 'EndOfArticle',
}
type MessageSlotName = keyof typeof MessageSlotNames;

// slots that support persistent notifications (using Braze content cards)
enum CardSlotNames {
    ProfileBadge = 'ProfileBadge', // example slot for now
}
type CardSlotName = keyof typeof CardSlotNames;

type InteractiveButtonStatus = 'DEFAULT' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';

export {
    ColorValueHex,
    Extras,
    ErrorHandler,
    MessageSlotNames,
    MessageSlotName,
    CardSlotNames,
    CardSlotName,
    InteractiveButtonStatus,
};
