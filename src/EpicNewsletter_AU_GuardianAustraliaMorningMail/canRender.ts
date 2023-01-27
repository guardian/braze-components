import { BrazeMessageProps } from '../EpicNewsletter_AU_GuardianAustraliaMorningMail';

export const COMPONENT_NAME = 'EpicNewsletter_AU_GuardianAustraliaMorningMail';

export const canRender = (props: BrazeMessageProps): boolean => {
    const { header, frequency, paragraph1, ophanComponentId } = props;

    return Boolean(header && frequency && paragraph1 && ophanComponentId);
};
