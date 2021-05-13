import type { BrazeMessageProps } from './index';
export const COMPONENT_NAME = 'DigitalSubscriberAppBanner';

export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
    const { header, body } = brazeMessageProps;
    if (!header || !body) {
        return false;
    }
    return true;
};
