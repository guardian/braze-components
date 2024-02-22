import React from 'react';
import { StyleableBannerWithLink } from '../StyleableBannerWithLink';
import type { TrackClick } from '../utils/tracking';

import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    ophanComponentId?: string;
    header?: string;
    body?: string;
    boldText?: string;
    highlight?: string;
    buttonText?: string;
    buttonUrl?: string;
    imageUrl?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    trackClick: TrackClick;
};

export const BannerWithLink: React.FC<Props> = (props: Props) => {
    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    // StyleableBannerWithLink uses `highlight` instead of `boldText` attribute - this check fixes the discrepency so Marketing won't have to change existing canvases
    const mutatedProps = {
        ...props,
        brazeMessageProps: {
            ...props.brazeMessageProps,
            highlight: props.brazeMessageProps.boldText,
        },
    };

    return <StyleableBannerWithLink {...mutatedProps}></StyleableBannerWithLink>;
};
