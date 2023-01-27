import { BrazeMessageProps } from '../EpicNewsletter_US_FirstThing';

export const COMPONENT_NAME = 'EpicNewsletter_US_FirstThing';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, ophanComponentId } = props;

    return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
