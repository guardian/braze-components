import type { BrazeMessageProps } from './index';
import { isImageUrlAllowed } from '../utils/images';

/** These are in a seperate file to enable tree shaking of the logic deciding if a Braze message can be rendered
 * this means the user won't download the Braze components bundle when the component can't be shown.
 */
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
