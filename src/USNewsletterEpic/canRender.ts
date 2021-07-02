import { BrazeMessageProps } from './index';

export const COMPONENT_NAME = 'USNewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency } = props;

    return Boolean(header && frequency);
};
