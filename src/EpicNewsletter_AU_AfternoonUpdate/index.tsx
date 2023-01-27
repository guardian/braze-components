import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic, NewsletterSubscribeCallback } from '../NewsletterEpic';
import type { TrackClick } from '../utils/tracking';

// Image URL updated
const IMAGE_URL =
    'https://i.guim.co.uk/img/media/50b02d4e4a32def95d8d26cc852549e6bd83f037/0_0_1850_1111/1000.jpg?width=400&quality=75&s=c2639a3865949c6215d79389f38a4a9e';

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
