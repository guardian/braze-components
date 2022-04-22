type Extras = Record<string, string>;
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

export { Extras, ErrorHandler, MessageSlotNames, MessageSlotName, CardSlotNames, CardSlotName };
