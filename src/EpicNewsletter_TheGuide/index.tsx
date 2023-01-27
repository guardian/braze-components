import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic, NewsletterSubscribeCallback } from '../NewsletterEpic';
import type { TrackClick } from '../utils/tracking';

// Image URL updated
const IMAGE_URL =
    'https://i.guim.co.uk/img/media/ce2e59cfa2ab7db34cba24adbf20910976e55604/0_0_760_456/500.jpg?width=400&quality=75&s=d773f6af9f6967545beea87dfeae0643';

const newsletterId = '6006';

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

export const EpicNewsletter_TheGuide: React.FC<Props> = (props: Props) => {
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
