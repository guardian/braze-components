import { isImageUrlAllowed } from '../utils/images';
import { BrazeMessageProps } from '../EpicNewsletter_SelfServe';

export const COMPONENT_NAME = 'EpicNewsletter_SelfServe';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, imageUrl, ophanComponentId, newsletterId } = props;

    if (imageUrl && !isImageUrlAllowed(imageUrl)) {
        console.log(`Image URL ${imageUrl} is not allowed`);
        return false;
    }
    return Boolean(header && frequency && paragraph1 && newsletterId && ophanComponentId);
};
