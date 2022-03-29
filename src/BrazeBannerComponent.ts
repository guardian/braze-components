import React from 'react';
import {
    COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
    DigitalSubscriberAppBanner,
} from './DigitalSubscriberAppBanner';
import { COMPONENT_NAME as APP_BANNER_NAME, AppBanner } from './AppBanner';
import { COMPONENT_NAME as BANNER_WITH_LINK_NAME, BannerWithLink } from './BannerWithLink';
import type { BrazeClickHandler, SubmitComponentEvent } from './utils/tracking';
import {
    buildBrazeMessageComponent,
    ComponentMapping,
    HasConsolidatedTrackClick,
} from './buildBrazeMessageComponent';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

export type CommonBannerComponentProps = {
    componentName: string;
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: SubmitComponentEvent;
    brazeMessageProps: BrazeMessageProps;
};

const BANNER_MAPPINGS: ComponentMapping<CommonBannerComponentProps & HasConsolidatedTrackClick> = {
    [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: DigitalSubscriberAppBanner,
    [APP_BANNER_NAME]: AppBanner,
    [BANNER_WITH_LINK_NAME]: BannerWithLink,
};

export const BrazeBannerComponent: React.FC<CommonBannerComponentProps> =
    buildBrazeMessageComponent<CommonBannerComponentProps>(
        'RETENTION_ENGAGEMENT_BANNER',
        BANNER_MAPPINGS,
    );
