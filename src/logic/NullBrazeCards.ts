import { BrazeCardsInterface, BrazeCard } from './BrazeCards';

class NullBrazeCards implements BrazeCardsInterface {
    getCardsForProfileBadge(): BrazeCard[] {
        return [];
    }
}

export { NullBrazeCards };
