import fc from 'fast-check';
import appboy from '@braze/web-sdk-core';
import { BrazeCard, BrazeCards } from './BrazeCards';
import { CardSlotName, Extras } from './types';

function errorHandler(error: Error, identifier: string): void {
    console.log(identifier, error);
}

describe('braze content cards', () => {
    describe('BrazeCards', () => {
        describe('getCardsForProfileBadge', () => {
            test('returns empty array if there are no content cards for this user', () => {
                jest.spyOn(appboy, 'getCachedContentCards').mockImplementation(() => {
                    return new appboy.ContentCards([], new Date());
                });
                const brazeCards = new BrazeCards(appboy, errorHandler);
                const result = brazeCards.getCardsForProfileBadge();
                expect(result).toEqual([]);
            });

            test("returns BrazeCard instances for each of the profile badge cards in the user's cached card feed", () => {
                jest.spyOn(appboy, 'getCachedContentCards').mockImplementation(() => {
                    return new appboy.ContentCards(
                        [
                            testCard('ProfileBadge', 'card-id-1', { field1: 'value-1' }),
                            testCard('ProfileBadge', 'card-id-2', { field1: 'another-value' }),
                            testCard('ProfileBadge', 'card-id-3', { field2: 'yet-another-value' }),
                        ],
                        new Date(),
                    );
                });
                const brazeCards = new BrazeCards(appboy, errorHandler);
                const result = brazeCards.getCardsForProfileBadge();
                const cardIds = result.map((card) => card.id);
                expect(cardIds).toEqual(['card-id-1', 'card-id-2', 'card-id-3']);
            });

            test("uses Braze's card ID", () => {
                fc.assert(
                    fc.property(fc.string(), (id) => {
                        jest.spyOn(appboy, 'getCachedContentCards').mockImplementation(() => {
                            return new appboy.ContentCards(
                                [testCard('ProfileBadge', id, {})],
                                new Date(),
                            );
                        });
                        const brazeCards = new BrazeCards(appboy, errorHandler);
                        const result = brazeCards.getCardsForProfileBadge();
                        expect(result[0].id).toEqual(id);
                    }),
                );
            });

            test('uses the extras record that Braze provides', () => {
                const extrasGen = fc.dictionary(fc.string(), fc.string());
                fc.assert(
                    fc.property(extrasGen, (dict) => {
                        const extras = { ...dict, slotName: 'ProfileBadge' };
                        jest.spyOn(appboy, 'getCachedContentCards').mockImplementation(() => {
                            return new appboy.ContentCards(
                                [testCard('ProfileBadge', 'card-id', dict)],
                                new Date(),
                            );
                        });
                        const brazeCards = new BrazeCards(appboy, errorHandler);
                        const result = brazeCards.getCardsForProfileBadge();
                        expect(result[0].extras).toEqual(extras);
                    }),
                );
            });

            test('returns no control cards if the cached feed contains only unsupported cards', () => {
                // cards with no extras or missing the slotName, so they cannot be handled by this library
                jest.spyOn(appboy, 'getCachedContentCards').mockImplementation(() => {
                    return new appboy.ContentCards(
                        [
                            // a card for an unsupported slot
                            testCard('AnotherSlotName', 'card-id-another-slot', {}),
                            // a card that does not contain a slotname
                            new appboy.ControlCard(
                                'card-id-no-slotname',
                                false,
                                new Date(),
                                new Date(new Date().getTime() + 86400),
                                { extraField: 'field-value' },
                                false,
                            ),
                        ],
                        new Date(),
                    );
                });
                const brazeCards = new BrazeCards(appboy, errorHandler);
                const result = brazeCards.getCardsForProfileBadge();
                expect(result).toEqual([]);
            });
        });

        test("The last updated date comes from the appboy instance's last updated date", () => {
            fc.assert(
                fc.property(fc.date(), (date) => {
                    jest.spyOn(appboy, 'getCachedContentCards').mockImplementation(() => {
                        return new appboy.ContentCards([], date);
                    });
                    const brazeCards = new BrazeCards(appboy, errorHandler);
                    expect(brazeCards.lastUpdated).toEqual(date);
                }),
            );
        });
    });

    describe('BrazeCard', () => {
        test('logImpression calls the appboy sdk method', () => {
            const mockAppboyFn = jest.fn();
            const mockErrorHandler = jest.fn();
            const appboyCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(appboy, 'logCardImpressions').mockImplementation((cards) => {
                mockAppboyFn(cards);
                return true;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                appboyCard,
                appboy,
                mockErrorHandler,
            );

            brazeCard.logImpression();

            expect(mockAppboyFn).toHaveBeenCalledWith([appboyCard]);
            expect(mockErrorHandler).toHaveBeenCalledTimes(0);
        });

        test('logImpression fails if the appboy sdk method fails (returns false)', () => {
            const mockErrorHandler = jest.fn();
            const appboyCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(appboy, 'logCardImpressions').mockImplementation(() => {
                return false;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                appboyCard,
                appboy,
                mockErrorHandler,
            );

            brazeCard.logImpression();

            expect(mockErrorHandler).toHaveBeenCalled();
        });

        test('logCardClick calls the appboy sdk method', () => {
            const mockAppboyFn = jest.fn();
            const mockErrorHandler = jest.fn();
            const appboyCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(appboy, 'logCardClick').mockImplementation((card) => {
                mockAppboyFn(card);
                return true;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                appboyCard,
                appboy,
                mockErrorHandler,
            );

            brazeCard.logCardClick();

            expect(mockAppboyFn).toHaveBeenCalledWith(appboyCard);
            expect(mockErrorHandler).toHaveBeenCalledTimes(0);
        });

        test('logCardClick fails if the appboy sdk method fails (returns false)', () => {
            const mockErrorHandler = jest.fn();
            const appboyCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(appboy, 'logCardClick').mockImplementation(() => {
                return false;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                appboyCard,
                appboy,
                mockErrorHandler,
            );

            brazeCard.logCardClick();

            expect(mockErrorHandler).toHaveBeenCalled();
        });

        test('logCardDismissal calls the appboy sdk method', () => {
            const mockAppboyFn = jest.fn();
            const mockErrorHandler = jest.fn();
            const appboyCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(appboy, 'logCardDismissal').mockImplementation((card) => {
                mockAppboyFn(card);
                return true;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                appboyCard,
                appboy,
                mockErrorHandler,
            );

            brazeCard.logCardDismissal();

            expect(mockAppboyFn).toHaveBeenCalledWith(appboyCard);
            expect(mockErrorHandler).toHaveBeenCalledTimes(0);
        });

        test('logCardDismissal fails if the appboy sdk method fails (returns false)', () => {
            const mockErrorHandler = jest.fn();
            const appboyCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(appboy, 'logCardDismissal').mockImplementation(() => {
                return false;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                appboyCard,
                appboy,
                mockErrorHandler,
            );

            brazeCard.logCardDismissal();

            expect(mockErrorHandler).toHaveBeenCalled();
        });
    });
});

function testCard(slotName: CardSlotName | string, id: string, extras: Extras): appboy.ControlCard {
    return new appboy.ControlCard(
        id,
        false,
        new Date(),
        new Date(new Date().getTime() + 86400),
        { ...extras, slotName: slotName },
        false,
    );
}
