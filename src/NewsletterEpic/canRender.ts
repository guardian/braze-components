import { BrazeMessageProps } from './index';

export const COMPONENT_NAME = 'NewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, imageUrl } = props;

    return Boolean(header && frequency && paragraph1 && imageUrl);
};
