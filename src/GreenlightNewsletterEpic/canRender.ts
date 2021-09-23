import { BrazeMessageProps } from '../GreenlightNewsletterEpic';

export const COMPONENT_NAME = 'GreenlightNewsletterEpic';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, ophanComponentId } = props;

    return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
