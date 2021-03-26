import { BrazeMessagesInterface, BrazeMessage } from './BrazeMessages';

export class NullBrazeMessages implements BrazeMessagesInterface {
    getMessageForBanner(): Promise<BrazeMessage> {
        return Promise.reject(new Error('No banner message'));
    }

    getMessageForEndOfArticle(): Promise<BrazeMessage> {
        return Promise.reject(new Error('No end of article message'));
    }
}
