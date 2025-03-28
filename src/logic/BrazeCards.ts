import * as braze from '@braze/web-sdk';
import { ErrorHandler, Extras, CardSlotName, CardSlotNames } from './types';

interface BrazeCardsInterface {
    getCardsForProfileBadge: () => BrazeCard[];
}

class BrazeCard {
    id: string;

    slotName: CardSlotName;

    private card: braze.Card;

    private braze: typeof braze;

    private errorHandler: ErrorHandler;

    constructor(
        id: string,
        slotName: CardSlotName,
        card: braze.Card,
        brazeInstance: typeof braze,
        errorHandler: ErrorHandler,
    ) {
        this.id = id;
        this.slotName = slotName;
        this.card = card;
        this.braze = brazeInstance;
        this.errorHandler = errorHandler;
    }

    logImpression(): void {
        try {
            const result = this.braze.logCardImpressions([this.card], true);
            if (!result) {
                this.errorHandler(
                    new Error('Failed to log card impression event'),
                    'BrazeCard.logImpressions',
                );
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.errorHandler(error, 'BrazeCard.logImpressions');
            }
        }
    }

    logCardClick(): void {
        try {
            const result = this.braze.logCardClick(this.card, true);
            if (!result) {
                this.errorHandler(
                    new Error('Failed to log card click event'),
                    'BrazeCard.logCardClick',
                );
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.errorHandler(error, 'BrazeCard.logCardClick');
            }
        }
    }

    logCardDismissal(): void {
        try {
            const result = this.braze.logCardDismissal(this.card);
            if (!result) {
                this.errorHandler(
                    new Error('Failed to log card dismiss event'),
                    'BrazeCard.logCardDismiss',
                );
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.errorHandler(error, 'BrazeCard.logCardDismiss');
            }
        }
    }

    /**
     * Returns the card's key/value pairs.
     *
     * We know this can't be empty because there must have been at least a `slotName`
     * field present to be able to generate the card.
     */
    get extras(): Extras {
        const data = this.card.extras;
        // since empty extras is impossible, let's add this case to eliminate undefined from the type
        if (data === undefined) {
            return {};
        } else {
            return data;
        }
    }

    get expiry(): Date | undefined {
        const expiryDate = this.card.expiresAt;
        if (expiryDate === null) {
            return undefined;
        } else {
            return expiryDate;
        }
    }
}

class BrazeCards implements BrazeCardsInterface {
    braze: typeof braze;

    errorHandler: ErrorHandler;

    constructor(brazeInstance: typeof braze, errorHandler: ErrorHandler) {
        this.braze = brazeInstance;
        this.errorHandler = errorHandler;
    }

    getCardsForProfileBadge(): BrazeCard[] {
        return this.getCardsForSlot(CardSlotNames.ProfileBadge);
    }

    private getCardsForSlot(targetSlotName: CardSlotName): BrazeCard[] {
        const cachedCards = this.braze.getCachedContentCards().cards.flatMap((brazeCard) => {
            const { extras } = brazeCard;

            if (extras && extras.slotName && extras.slotName === targetSlotName) {
                if (brazeCard.id === undefined) {
                    this.errorHandler(
                        new Error('braze card had no ID'),
                        'BrazeCards.getCardsForSlot',
                    );
                    return [];
                } else {
                    return [
                        new BrazeCard(
                            brazeCard.id,
                            targetSlotName,
                            brazeCard,
                            this.braze,
                            this.errorHandler,
                        ),
                    ];
                }
            } else {
                // TODO: Consider whether this an error state, or something we're happy to ignore
                //       Will there be other content cards in users' feeds that we should ignore?
                return [];
            }
        });

        return cachedCards;
    }

    get lastUpdated(): Date | null {
        return this.braze.getCachedContentCards().lastUpdated;
    }
}

export { BrazeCard, BrazeCards, BrazeCardsInterface };
