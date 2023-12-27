import React from 'react';
import { canRender, COMPONENT_NAME } from './canRender';
import { NewsletterEpic } from '../NewsletterEpic';
import { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { TrackClick } from '../utils/tracking';

// Image URL updated
export type BrazeMessageProps = {
    imageUrl?: string;
    newsletterId?: string;
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

export const EpicNewsletter_SelfServe: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    return <NewsletterEpic {...props}></NewsletterEpic>;
};

export { COMPONENT_NAME };
