import { isImageUrlAllowed } from '../utils/images';
import type { BrazeMessageProps } from './index';

/** These are in a seperate file to enable tree shaking of the logic deciding if a Braze message can be rendered
 * this means the user won't download the Braze components bundle when the component can't be shown.
 */
export const COMPONENT_NAME = 'StyleableBannerNewsletter';

export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
    const { header, body, imageUrl, ophanComponentId, newsletterId, frequency } = brazeMessageProps;
    if (imageUrl && !isImageUrlAllowed(imageUrl)) {
        console.log(`Image URL ${imageUrl} is not allowed`);
        return false;
    }
    return Boolean(header && body && imageUrl && ophanComponentId && newsletterId && frequency);
};
