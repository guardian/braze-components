import { BrazeMessageProps } from '../EpicNewsletter_UK_TheMorningBriefing';

export const COMPONENT_NAME = 'EpicNewsletter_UK_TheMorningBriefing';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, ophanComponentId } = props;

    return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
