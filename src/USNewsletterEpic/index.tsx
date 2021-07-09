import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic, BrazeMessageProps } from '../NewsletterEpic';
import { BrazeClickHandler } from '../utils/tracking';
import { OphanComponentEvent } from '@guardian/types';

const IMAGE_URL =
    'https://i.guim.co.uk/img/media/d0944e021b1cc7426f515fecc8034f12b7862041/0_0_784_784/784.png?width=196&s=fbdead3f454e1ceeeab260ffde71100a';

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
};

export const USNewsletterEpic: React.FC<Props> = (props: Props) => {
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
