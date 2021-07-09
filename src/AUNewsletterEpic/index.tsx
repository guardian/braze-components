import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic, BrazeMessageProps } from '../NewsletterEpic';
import { BrazeClickHandler } from '../utils/tracking';
import { OphanComponentEvent } from '@guardian/types';

const IMAGE_URL =
    'https://i.guim.co.uk/img/media/9f9f9c06ed5a323b13be816d5c160728c81d1bf9/0_0_784_784/784.png?width=196&s=4c4d5ff2c20821a6e6ff4d25f8ebcc16';

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
};

export const AUNewsletterEpic: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    return (
        <NewsletterEpic
            {...props}
            brazeMessageProps={{ ...props.brazeMessageProps, imageUrl: IMAGE_URL }}
        ></NewsletterEpic>
    );
};

export { COMPONENT_NAME };
