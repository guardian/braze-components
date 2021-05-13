import type { BrazeMessageProps } from './index';

export const COMPONENT_NAME = 'TheGuardianIn2020Banner';

export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
    const { header, body } = brazeMessageProps;
    return Boolean(header && body);
};
