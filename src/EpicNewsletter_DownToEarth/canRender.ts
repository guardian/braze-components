import { BrazeMessageProps } from '../EpicNewsletter_DownToEarth';

export const COMPONENT_NAME = 'EpicNewsletter_DownToEarth';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, ophanComponentId } = props;

    return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
