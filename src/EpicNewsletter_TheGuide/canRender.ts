import { BrazeMessageProps } from '../EpicNewsletter_TheGuide';

export const COMPONENT_NAME = 'EpicNewsletter_TheGuide';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, ophanComponentId } = props;

    return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
