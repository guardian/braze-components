import React from 'react';
import { AppBanner } from '../AppBanner';
import type { TrackClick } from '../utils/tracking';
import { COMPONENT_NAME } from './canRender';
import { BrazeBannerMessageProps } from '../bannerCommon/bannerActions';

export { COMPONENT_NAME };

type Props = {
    brazeMessageProps: BrazeBannerMessageProps;
    trackClick: TrackClick;
};

const cta = 'Search for "Guardian live news"';
const imageUrl =
    'https://i.guim.co.uk/img/media/de6813b4dd9b9805a2d14dd6af14ae2b48e2e19e/0_0_930_520/930.png?width=930&quality=60&s=a7d81978655765847246c8d4d0cd0e7f';
const imageAccessibilityText = 'Guardian live news digital subscriber packshot image';

export const DigitalSubscriberAppBanner: React.FC<Props> = ({
    brazeMessageProps: { ophanComponentId = COMPONENT_NAME, header, body },
    trackClick,
}: Props) => (
    <AppBanner
        brazeMessageProps={{
            ophanComponentId,
            header,
            body,
            cta,
            imageUrl,
            imageAccessibilityText,
        }}
        trackClick={trackClick}
    />
);
