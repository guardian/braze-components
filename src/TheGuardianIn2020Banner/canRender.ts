import type { BrazeMessageProps } from './index';

/** These are in a seperate file to enable tree shaking of the logic deciding if a Braze message can be rendered
 * this means the user won't download the Braze components bundle when the component can't be shown.
 */
export const COMPONENT_NAME = 'TheGuardianIn2020Banner';

export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
    const { header, body } = brazeMessageProps;
    return Boolean(header && body);
};
