import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic } from '../NewsletterEpic';
import { NewsletterSubscribeCallback } from '../newsletterCommon/sharedComponents';
import type { TrackClick } from '../utils/tracking';

// Image URL updated
const IMAGE_URL =
    'https://i.guim.co.uk/img/media/1abda073e6d4069ca058a190830a723d7b5a6f2a/0_0_200_200/200.png?width=200&quality=75&s=9ae7230c7e040a6c0b3e4248ac70c068';

// Need a newsletterId for this newsletter
const newsletterId = '6023';

export type BrazeMessageProps = {
    header?: string;
    frequency?: string;
    paragraph1?: string;
    paragraph2?: string;
    ophanComponentId?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
    trackClick: TrackClick;
};

export const EpicNewsletter_AU_AfternoonUpdate: React.FC<Props> = (props: Props) => {
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
