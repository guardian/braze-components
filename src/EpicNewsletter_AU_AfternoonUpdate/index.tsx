import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic } from '../NewsletterEpic';
import { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { TrackClick } from '../utils/tracking';

// Image URL updated
const IMAGE_URL =
    'https://i.guim.co.uk/img/media/898c5401ab51b983dc4b2508aaaf0735e6bda0e2/0_0_2000_2000/2000.png?width=400&quality=75&s=9191ec413d946058f37caced7edd0b90';

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
