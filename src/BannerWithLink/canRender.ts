import { isImageUrlAllowed } from '../utils/images';
import type { BrazeBannerMessageProps } from '../bannerCommon/bannerActions';

/** These are in a seperate file to enable tree shaking of the logic deciding if a Braze message can be rendered
 * this means the user won't download the Braze components bundle when the component can't be shown.
 */
export const COMPONENT_NAME = 'BannerWithLink';

export const canRender = (brazeMessageProps: BrazeBannerMessageProps): boolean => {
    const {
        ophanComponentId,
        header,
        body,
        buttonText,
        buttonUrl,
        imageUrl,
        imageAccessibilityText,
    } = brazeMessageProps;

    if (imageUrl && !isImageUrlAllowed(imageUrl)) {
        console.log(`Image URL ${imageUrl} is not allowed`);
        return false;
    }

    return Boolean(
        ophanComponentId &&
            header &&
            body &&
            buttonText &&
            buttonUrl &&
            imageUrl &&
            imageAccessibilityText,
    );
};
