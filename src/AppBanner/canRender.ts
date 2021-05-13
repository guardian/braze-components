import type { BrazeMessageProps } from './index';
import { isImageUrlAllowed } from '../utils/images';

export const COMPONENT_NAME = 'AppBanner';

export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
    const { header, body, cta, imageUrl } = brazeMessageProps;
    if (!header || !body || !cta || !imageUrl) {
        return false;
    }
    if (!isImageUrlAllowed(imageUrl)) {
        console.log(`Image URL ${imageUrl} is not allowed`);
        return false;
    }
    return true;
};
