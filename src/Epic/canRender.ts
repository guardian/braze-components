import { BrazeMessageProps } from './index.stories';

/** These are in a seperate file to enable tree shaking of the logic deciding if a Braze message can be rendered
 * this means the user won't download the Braze components bundle when the component can't be shown.
 */
export const canRenderEpic = (brazeMessageProps: BrazeMessageProps): boolean => {
    const { buttonText, buttonUrl, ophanComponentId } = brazeMessageProps;
    return Boolean(buttonText && buttonUrl && ophanComponentId);
};
