import fc from 'fast-check';
import * as braze from '@braze/web-sdk';
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
                jest.spyOn(braze, 'getCachedContentCards').mockImplementation(() => {
                    return new braze.ContentCards([], new Date());
                });
                const brazeCards = new BrazeCards(braze, errorHandler);

                const result = brazeCards.getCardsForProfileBadge();

                expect(result).toEqual([]);
            });

            it("returns BrazeCard instances for each of the profile badge cards in the user's cached card feed", () => {
                jest.spyOn(braze, 'getCachedContentCards').mockImplementation(() => {
                    return new braze.ContentCards(
                        [
                            testCard('ProfileBadge', 'card-id-1', { field1: 'value-1' }),
                            testCard('ProfileBadge', 'card-id-2', { field1: 'another-value' }),
                            testCard('ProfileBadge', 'card-id-3', { field2: 'yet-another-value' }),
                        ],
                        new Date(),
                    );
                });
                const brazeCards = new BrazeCards(braze, errorHandler);

                const result = brazeCards.getCardsForProfileBadge();

                const cardIds = result.map((card) => card.id);
                expect(cardIds).toEqual(['card-id-1', 'card-id-2', 'card-id-3']);
            });

            it("uses Braze's card ID", () => {
                fc.assert(
                    fc.property(fc.string(), (id) => {
                        jest.spyOn(braze, 'getCachedContentCards').mockImplementation(() => {
                            return new braze.ContentCards(
                                [testCard('ProfileBadge', id, {})],
                                new Date(),
                            );
                        });
                        const brazeCards = new BrazeCards(braze, errorHandler);

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
                        jest.spyOn(braze, 'getCachedContentCards').mockImplementation(() => {
                            return new braze.ContentCards(
                                [testCard('ProfileBadge', 'card-id', dict)],
                                new Date(),
                            );
                        });
                        const brazeCards = new BrazeCards(braze, errorHandler);

                        const result = brazeCards.getCardsForProfileBadge();

                        expect(result[0].extras).toEqual(extras);
                    }),
                );
            });

            it('does not return cards that are missing slotName in their extras (so they cannot be handled by us)', () => {
                jest.spyOn(braze, 'getCachedContentCards').mockImplementation(() => {
                    return new braze.ContentCards(
                        [
                            // a card for an unsupported slot
                            testCard('AnotherSlotName', 'card-id-another-slot', {}),
                            // a card that does not contain a slotname
                            new braze.ControlCard(
                                'card-id-no-slotname',
                                false,
                                new Date(),
                                new Date(new Date().getTime() + 86400),
                                { extraField: 'field-value' },
                                false,
                            ),
                            // a card with no extras at all
                            new braze.ControlCard(
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
                const brazeCards = new BrazeCards(braze, errorHandler);

                const result = brazeCards.getCardsForProfileBadge();

                expect(result).toEqual([]);
            });
        });

        it("The last updated date comes from the braze instance's last updated date", () => {
            fc.assert(
                fc.property(fc.date(), (date) => {
                    jest.spyOn(braze, 'getCachedContentCards').mockImplementation(() => {
                        return new braze.ContentCards([], date);
                    });

                    const brazeCards = new BrazeCards(braze, errorHandler);

                    expect(brazeCards.lastUpdated).toEqual(date);
                }),
            );
        });
    });

    describe('BrazeCard', () => {
        it('logImpression calls the braze sdk method', () => {
            const mockbrazeFn = jest.fn();
            const mockErrorHandler = jest.fn();
            const controlCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(braze, 'logCardImpressions').mockImplementation((cards) => {
                mockbrazeFn(cards);
                return true;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                controlCard,
                braze,
                mockErrorHandler,
            );

            brazeCard.logImpression();

            expect(mockbrazeFn).toHaveBeenCalledWith([controlCard]);
            expect(mockErrorHandler).not.toHaveBeenCalled();
        });

        it('logImpression fails if the braze sdk method fails (returns false)', () => {
            const mockErrorHandler = jest.fn();
            const controlCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(braze, 'logCardImpressions').mockImplementation(() => {
                return false;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                controlCard,
                braze,
                mockErrorHandler,
            );

            brazeCard.logImpression();

            expect(mockErrorHandler).toHaveBeenCalled();
        });

        it('logCardClick calls the braze sdk method', () => {
            const mockbrazeFn = jest.fn();
            const mockErrorHandler = jest.fn();
            const controlCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(braze, 'logCardClick').mockImplementation((card) => {
                mockbrazeFn(card);
                return true;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                controlCard,
                braze,
                mockErrorHandler,
            );

            brazeCard.logCardClick();

            expect(mockbrazeFn).toHaveBeenCalledWith(controlCard);
            expect(mockErrorHandler).toHaveBeenCalledTimes(0);
        });

        it('logCardClick fails if the braze sdk method fails (returns false)', () => {
            const mockErrorHandler = jest.fn();
            const controlCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(braze, 'logCardClick').mockImplementation(() => {
                return false;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                controlCard,
                braze,
                mockErrorHandler,
            );

            brazeCard.logCardClick();

            expect(mockErrorHandler).toHaveBeenCalled();
        });

        it('logCardDismissal calls the braze sdk method', () => {
            const mockbrazeFn = jest.fn();
            const mockErrorHandler = jest.fn();
            const controlCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(braze, 'logCardDismissal').mockImplementation((card) => {
                mockbrazeFn(card);
                return true;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                controlCard,
                braze,
                mockErrorHandler,
            );

            brazeCard.logCardDismissal();

            expect(mockbrazeFn).toHaveBeenCalledWith(controlCard);
            expect(mockErrorHandler).toHaveBeenCalledTimes(0);
        });

        it('logCardDismissal fails if the braze sdk method fails (returns false)', () => {
            const mockErrorHandler = jest.fn();
            const controlCard = testCard('ProfileBadge', 'card-id', {});
            jest.spyOn(braze, 'logCardDismissal').mockImplementation(() => {
                return false;
            });
            const brazeCard = new BrazeCard(
                'card-id',
                'ProfileBadge',
                controlCard,
                braze,
                mockErrorHandler,
            );

            brazeCard.logCardDismissal();

            expect(mockErrorHandler).toHaveBeenCalled();
        });
    });
});

function testCard(slotName: CardSlotName | string, id: string, extras: Extras): braze.ControlCard {
    return new braze.ControlCard(
        id,
        false,
        new Date(),
        new Date(new Date().getTime() + 86400),
        { ...extras, slotName: slotName },
        false,
    );
}
