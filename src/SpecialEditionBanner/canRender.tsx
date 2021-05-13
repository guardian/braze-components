export const COMPONENT_NAME = 'SpecialEditionBanner';
import type { BrazeMessageProps } from './index';

export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
    const { header, body } = brazeMessageProps;
    if (!header || !body) {
        return false;
    }
    return true;
};
