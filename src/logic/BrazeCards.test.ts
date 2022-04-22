import fc from 'fast-check';
import appboy from '@braze/web-sdk-core';
import { BrazeCard, BrazeCards } from './BrazeCards';
import { CardSlotName, Extras } from './types';

function errorHandler(error: Error, identifier: string): void {
    console.log(identifier, error);
}

afterEach(() => jest.clearAllMocks());

describe('braze content cards', () => {
    describe('BrazeCards', () => {
        describe('getCardsForProfileBadge', () => {
            it('returns empty array if there are no content cards for this user', () => {
                jest.spyOn(appboy, 'getCachedContentCards').mockImplementation(() => {
                    return new appboy.ContentCards([], new Date());
                });
                const brazeCards = new BrazeCards(appboy, errorHandler);

                const result = brazeCards.getCardsForProfileBadge();

                expect(result).toEqual([]);
            });

            it("returns BrazeCard instances for each of the profile badge cards in the user's cached card feed", () => {
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

            it("uses Braze's card ID", () => {
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

            it('uses the extras record that Braze provides', () => {
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

            it('does not return cards that are missing slotName in their extras (so they cannot be handled by us)', () => {
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
                            // a card with no extras at all
                            new appboy.ControlCard(
                                'card-id-no-extras',
                                false,
                                new Date(),
                                new Date(new Date().getTime() + 86400),
                                undefined,
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

        it("The last updated date comes from the appboy instance's last updated date", () => {
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
        it('logImpression calls the appboy sdk method', () => {
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
            expect(mockErrorHandler).not.toHaveBeenCalled();
        });

        it('logImpression fails if the appboy sdk method fails (returns false)', () => {
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

        it('logCardClick calls the appboy sdk method', () => {
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

        it('logCardClick fails if the appboy sdk method fails (returns false)', () => {
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

        it('logCardDismissal calls the appboy sdk method', () => {
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

        it('logCardDismissal fails if the appboy sdk method fails (returns false)', () => {
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
