import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic, NewsletterSubscribeCallback } from '../NewsletterEpic';
import { BrazeClickHandler } from '../utils/tracking';
import { OphanComponentEvent } from '@guardian/types';

const newsletterId = '4156';

const IMAGE_URL =
    'https://i.guim.co.uk/img/media/568c6031be78dab6f6c28336010884f3ebd0f97c/0_0_1936_1936/1936.png?width=196&s=b8925f3e3a96a5b4f807e421b8a44906';

type BrazeMessageProps = {
    header?: string;
    frequency?: string;
    paragraph1?: string;
    paragraph2?: string;
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

export const UKNewsletterEpic: React.FC<Props> = (props: Props) => {
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
