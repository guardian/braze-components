import { BrazeMessageProps } from '../Epic/index';
import { canRender as epicCanRender } from '../Epic/canRender';

export const COMPONENT_NAME = 'EpicWithSpecialHeader';

export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
    const canRenderResult = epicCanRender(brazeMessageProps);
    if (canRenderResult) {
        const { authoredEpicImageUrl, authoredEpicImageAltText, authoredEpicBylineName } =
            brazeMessageProps;

        return Boolean(authoredEpicImageUrl && authoredEpicImageAltText && authoredEpicBylineName);
    }
    return canRenderResult;
};
