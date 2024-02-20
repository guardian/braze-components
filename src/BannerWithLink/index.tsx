import React from 'react';
import { StyleableBannerWithLink } from '../StyleableBannerWithLink';
import type { TrackClick } from '../utils/tracking';
import type { FetchEmail } from '../types/dcrTypes';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    boldText?: string;
    buttonText?: string;
    buttonUrl?: string;
    imageUrl?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
    fetchEmail: FetchEmail;
};

export const BannerWithLink: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    props.fetchEmail = () => Promise.resolve(null);

    return <StyleableBannerWithLink {...props}></StyleableBannerWithLink>;
};
