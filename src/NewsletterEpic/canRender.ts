import { BrazeMessageProps } from './index';

export const COMPONENT_NAME = 'NewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, imageUrl, newsletterId } = props;

    // TODO: validate the image URL as in AppBanner?
    return Boolean(header && frequency && paragraph1 && imageUrl && newsletterId);
};
