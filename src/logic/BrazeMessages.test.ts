import * as braze from '@braze/web-sdk';
import { createNanoEvents, Emitter } from 'nanoevents';
import { BrazeArticleContext, BrazeMessages } from './BrazeMessages';
import { LocalMessageCache, hydrateMessage, MessageData } from './LocalMessageCache';

const logInAppMessageImpressionSpy = jest.fn();

const message1Json = `{"message":"","messageAlignment":"CENTER","duration":5000,"slideFrom":"BOTTOM","extras":{"heading":"Tom Epic Title 1","slotName":"EndOfArticle","step":"1","componentName":"Epic","highlightedText":"This text is important %%CURRENCY_SYMBOL%%1","buttonText":"Button","buttonUrl":"https://www.example.com","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "ophanComponentId": "Epic"},"triggerId":"NjAzNjhmNDFkZTNmMTAxMjE4YmE5Y2E0XyRfY2MmZGkmbXY9NjAzNjhmNDFkZTNmMTAxMjE4YmE5YzZiJnBpPXdmcyZ3PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM1OCZ3cD0xNjE0MjQxNTkyJnd2PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM5ZA==","clickAction":"NONE","uri":null,"openTarget":"NONE","dismissType":"SWIPE","icon":null,"imageUrl":null,"imageStyle":"TOP","iconColor":4294967295,"iconBackgroundColor":4278219733,"backgroundColor":4294967295,"textColor":4281545523,"closeButtonColor":4288387995,"animateIn":true,"animateOut":true,"header":null,"headerAlignment":"CENTER","headerTextColor":4281545523,"frameColor":3224580915,"buttons":[],"cropType":"FIT_CENTER","Rd":true,"Ma":false,"Qd":false,"X":{"qb":{}},"Ub":{"qb":{}},"Lg":false,"Uf":"WEB_HTML"}`;
const message2Json = `{"message":"","messageAlignment":"CENTER","duration":5000,"slideFrom":"BOTTOM","extras":{"heading":"Tom Epic Title 2","slotName":"EndOfArticle","step":"1","componentName":"Epic","highlightedText":"This text is important %%CURRENCY_SYMBOL%%1","buttonText":"Button","buttonUrl":"https://www.example.com","paragraph1":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "ophanComponentId": "Epic"},"triggerId":"NjAzNjhmNDFkZTNmMTAxMjE4YmE5Y2E0XyRfY2MmZGkmbXY9NjAzNjhmNDFkZTNmMTAxMjE4YmE5YzZiJnBpPXdmcyZ3PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM1OCZ3cD0xNjE0MjQxNTkyJnd2PTYwMzY4ZjQxZGUzZjEwMTIxOGJhOWM5ZA==","clickAction":"NONE","uri":null,"openTarget":"NONE","dismissType":"SWIPE","icon":null,"imageUrl":null,"imageStyle":"TOP","iconColor":4294967295,"iconBackgroundColor":4278219733,"backgroundColor":4294967295,"textColor":4281545523,"closeButtonColor":4288387995,"animateIn":true,"animateOut":true,"header":null,"headerAlignment":"CENTER","headerTextColor":4281545523,"frameColor":3224580915,"buttons":[],"cropType":"FIT_CENTER","Rd":true,"Ma":false,"Qd":false,"X":{"qb":{}},"Ub":{"qb":{}},"Lg":false,"Uf":"WEB_HTML"}`;

const bannerExtras = {
    slotName: 'Banner',
    componentName: 'BannerWithLink',
    ophanComponentId: 'banner_ophan_component_id',
    header: 'Header',
    body: 'Body',
    buttonText: 'Button',
    buttonUrl: 'http://guardian.co.uk',
    imageUrl:
        'https://i.guim.co.uk/img/media/c9ba78ef2b1a931aab5ca625ce49646e116b11b3/0_0_3200_1800/3200.png?quality=60&width=930&s=72ff133ea3e4516f5a353213e7a62e8a',
};

const epicExtras = {
    componentName: 'Epic',
    ophanComponentId: 'Epic',
    buttonText: 'Button Text',
    buttonUrl: 'https://guardian.com/uk',
    slotName: 'EndOfArticle',
    title: 'Example',
    paragraph1: 'This is paragraph 1',
};

class FakeBraze {
    emitter: Emitter;

    HtmlMessage: typeof braze.HtmlMessage;

    constructor() {
        this.emitter = createNanoEvents();
        this.HtmlMessage = braze.HtmlMessage;
    }

    subscribeToInAppMessage(fn: (message: braze.InAppMessage | braze.ControlMessage) => void) {
        this.emitter.on('inAppMessage', fn);
        return 'FAKE_SUBSCRIPTION_ID';
    }

    emit(payload: braze.InAppMessage) {
        this.emitter.emit('inAppMessage', payload);
    }

    // eslint-disable-next-line class-methods-use-this
    logInAppMessageImpression(message: braze.InAppMessage): void {
        logInAppMessageImpressionSpy(message);
    }
}

beforeEach(() => {
    logInAppMessageImpressionSpy.mockClear();
});

const buildMessage = (data: MessageData) => hydrateMessage(data, braze);

describe('BrazeMessages', () => {
    describe(`When the cache is enabled`, () => {
        beforeEach(() => {
            LocalMessageCache.clear();
        });

        describe('getMessageForBanner & getMessageForEndOfArticle', () => {
            it('returns a promise which resolves with message data for the correct slot', async () => {
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );

                const bannerPromise = brazeMessages.getMessageForBanner();
                const endOfArticlePromise = brazeMessages.getMessageForEndOfArticle();

                const bannerMessage = buildMessage({
                    ...JSON.parse(message1Json),
                    extras: bannerExtras,
                });
                fakeBraze.emit(bannerMessage);

                const endOfArticleMessage = buildMessage({
                    ...JSON.parse(message2Json),
                    extras: epicExtras,
                });
                fakeBraze.emit(endOfArticleMessage);

                const data = await Promise.all([bannerPromise, endOfArticlePromise]);
                expect(data[0].extras).toEqual(bannerMessage.extras);
                expect(data[1].extras).toEqual(endOfArticleMessage.extras);
            });

            it('returns a promise which resolves with message data for the correct slot when queried in different order', async () => {
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );

                const bannerPromise = brazeMessages.getMessageForBanner();
                const endOfArticlePromise = brazeMessages.getMessageForEndOfArticle();

                const bannerMessage = buildMessage({
                    ...JSON.parse(message1Json),
                    extras: bannerExtras,
                });
                fakeBraze.emit(bannerMessage);

                const data1 = await bannerPromise;
                expect(data1.extras).toEqual(bannerMessage.extras);

                const endOfArticleMessage = buildMessage({
                    ...JSON.parse(message2Json),
                    extras: epicExtras,
                });
                fakeBraze.emit(endOfArticleMessage);

                const data2 = await endOfArticlePromise;
                expect(data2.extras).toEqual(endOfArticleMessage.extras);
            });

            it('returns a message which is capable of logging an impression', async () => {
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );

                const bannerPromise = brazeMessages.getMessageForBanner();

                const message = buildMessage({
                    ...JSON.parse(message1Json),
                    extras: bannerExtras,
                });
                fakeBraze.emit(message);

                const bannerMessage = await bannerPromise;
                bannerMessage.logImpression();

                expect(logInAppMessageImpressionSpy).toHaveBeenCalledWith(message);
            });

            it('returns a message with an id', async () => {
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );

                const bannerPromise = brazeMessages.getMessageForBanner();

                const message = buildMessage({
                    ...JSON.parse(message1Json),
                    extras: bannerExtras,
                });
                fakeBraze.emit(message);

                const bannerMessage = await bannerPromise;

                expect(bannerMessage.id).toMatch(/\w{11,13}-\d{13}/);
            });

            it('returns a cached message if one is available', async () => {
                const cachedMessage = buildMessage(JSON.parse(message1Json));
                LocalMessageCache.push(
                    'EndOfArticle',
                    {
                        message: cachedMessage,
                        id: '1',
                    },
                    (e) => console.log(e),
                );
                const freshMessage = buildMessage(JSON.parse(message2Json));
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );
                fakeBraze.emit(freshMessage);

                const gotMessage = await brazeMessages.getMessageForEndOfArticle();

                expect(gotMessage.message).toEqual(cachedMessage);
            });

            it('logging an impression results in the message being removed from the cache', async () => {
                const cachedMessage = buildMessage(JSON.parse(message1Json));
                LocalMessageCache.push(
                    'EndOfArticle',
                    {
                        message: cachedMessage,
                        id: '1',
                    },
                    (e) => console.log(e),
                );
                const freshMessage = buildMessage(JSON.parse(message2Json));
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );
                fakeBraze.emit(freshMessage);

                const firstMessage = await brazeMessages.getMessageForEndOfArticle();
                firstMessage.logImpression();

                const anotherMessage = await brazeMessages.getMessageForEndOfArticle();
                expect(anotherMessage.message).toEqual(freshMessage);
            });

            it('returns the same cached message multiple times if an impression is not logged', async () => {
                const cachedMessage = buildMessage(JSON.parse(message1Json));
                LocalMessageCache.push(
                    'EndOfArticle',
                    {
                        message: cachedMessage,
                        id: '1',
                    },
                    (e) => console.log(e),
                );
                const freshMessage = buildMessage(JSON.parse(message2Json));
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );
                fakeBraze.emit(freshMessage);

                const firstMessage = await brazeMessages.getMessageForEndOfArticle();
                const secondMessage = await brazeMessages.getMessageForEndOfArticle();

                expect(firstMessage).toEqual(secondMessage);
            });

            it('prioritises a message with matching page context filters', async () => {
                const messageWithoutFilter = buildMessage(JSON.parse(message1Json));
                LocalMessageCache.push(
                    'EndOfArticle',
                    {
                        message: messageWithoutFilter,
                        id: '1',
                    },
                    (e) => console.log(e),
                );
                const messageWithFilter = buildMessage(JSON.parse(message1Json));
                messageWithFilter.extras.section = 'environment';
                LocalMessageCache.push(
                    'EndOfArticle',
                    {
                        message: messageWithFilter,
                        id: '2',
                    },
                    (e) => console.log(e),
                );
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );
                const articleContext: BrazeArticleContext = {
                    section: 'environment',
                };

                const gotMessage = await brazeMessages.getMessageForEndOfArticle(articleContext);

                expect(gotMessage.message).toEqual(messageWithFilter);
            });

            it('returns a message if the article section matches any of the message sections', async () => {
                const messageWithFilter = buildMessage(JSON.parse(message1Json));
                messageWithFilter.extras.section = 'science|environment|weather';
                LocalMessageCache.push(
                    'EndOfArticle',
                    {
                        message: messageWithFilter,
                        id: '1',
                    },
                    (e) => console.log(e),
                );
                const fakeBraze = new FakeBraze();
                const canRender = () => true;
                const brazeMessages = new BrazeMessages(
                    fakeBraze as unknown as typeof braze,
                    LocalMessageCache,
                    (error, identifier) => console.log(identifier, error),
                    canRender,
                );
                const articleContext: BrazeArticleContext = {
                    section: 'environment',
                };

                const gotMessage = await brazeMessages.getMessageForEndOfArticle(articleContext);

                expect(gotMessage.message).toEqual(messageWithFilter);
            });
        });
    });
});
