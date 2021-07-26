import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic, NewsletterSubscribeCallback } from '../NewsletterEpic';
import { BrazeClickHandler } from '../utils/tracking';
import { OphanComponentEvent } from '@guardian/types';

const IMAGE_URL =
    'https://i.guim.co.uk/img/media/9f9f9c06ed5a323b13be816d5c160728c81d1bf9/0_0_784_784/784.png?width=196&s=4c4d5ff2c20821a6e6ff4d25f8ebcc16';

const newsletterId = '4148';

export type BrazeMessageProps = {
    header?: string;
    frequency?: string;
    paragraph1?: string;
    paragraph2?: string;
    ophanComponentId?: string;
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

export const AUNewsletterEpic: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    return (
        <NewsletterEpic
            {...props}
            brazeMessageProps={{ ...props.brazeMessageProps, imageUrl: IMAGE_URL, newsletterId }}
        ></NewsletterEpic>
    );
};

export { COMPONENT_NAME };
