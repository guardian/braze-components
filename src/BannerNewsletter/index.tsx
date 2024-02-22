import React from 'react';
import { StyleableBannerNewsletter } from '../StyleableBannerNewsletter';
import type { TrackClick } from '../utils/tracking';
import { NewsletterSubscribeCallback } from '../types/dcrTypes';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    newsletterId?: string;
    frequency?: string;
    header?: string;
    body?: string;
    boldText?: string;
    secondParagraph?: string;
    imageUrl?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

export const BannerNewsletter: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    return <StyleableBannerNewsletter {...props}></StyleableBannerNewsletter>;
};
