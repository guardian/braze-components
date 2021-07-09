import { BrazeMessageProps } from '../NewsletterEpic';

export const COMPONENT_NAME = 'USNewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1 } = props;

    return Boolean(header && frequency && paragraph1);
};
