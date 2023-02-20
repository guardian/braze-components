import React from 'react';

// Common newsletter imports
import { NewsletterSubscribeCallback } from './newsletterCommon/sharedComponents';

// Common Banner imports
import {
    buildBrazeMessageComponent,
    ComponentMapping,
    HasConsolidatedTrackClick,
    BrazeMessageProps,
} from './buildBrazeMessageComponent';
import type { BrazeClickHandler, SubmitComponentEvent } from './utils/tracking';

// Current Banner components
import {
    COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
    DigitalSubscriberAppBanner,
} from './DigitalSubscriberAppBanner';
import { COMPONENT_NAME as APP_BANNER_NAME, AppBanner } from './AppBanner';
import { COMPONENT_NAME as BANNER_WITH_LINK_NAME, BannerWithLink } from './BannerWithLink';
import { COMPONENT_NAME as BANNER_NEWSLETTER_NAME, BannerNewsletter } from './BannerNewsletter';

export type CommonBannerComponentProps = {
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: SubmitComponentEvent;
};

const BANNER_MAPPINGS: ComponentMapping<CommonBannerComponentProps & HasConsolidatedTrackClick> = {
    [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: DigitalSubscriberAppBanner,
    [APP_BANNER_NAME]: AppBanner,
    [BANNER_WITH_LINK_NAME]: BannerWithLink,
    [BANNER_NEWSLETTER_NAME]: BannerNewsletter,
};

export const BrazeBannerComponent: React.FC<CommonBannerComponentProps> =
    buildBrazeMessageComponent<CommonBannerComponentProps>(
        'RETENTION_ENGAGEMENT_BANNER',
        BANNER_MAPPINGS,
    );
