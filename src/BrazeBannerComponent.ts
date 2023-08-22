import React from 'react';

// Common newsletter imports
import { NewsletterSubscribeCallback, FetchEmail } from './types/dcrTypes';

// Common Banner imports
import {
    buildBrazeMessageComponent,
    ComponentMapping,
    HasConsolidatedTrackClick,
    BrazeMessageProps,
} from './buildBrazeMessageComponent';
import type { BrazeClickHandler, SubmitComponentEvent } from './utils/tracking';

// Current Banner components
import { COMPONENT_NAME as APP_BANNER_NAME, AppBanner } from './AppBanner';
import { COMPONENT_NAME as BANNER_WITH_LINK_NAME, BannerWithLink } from './BannerWithLink';
import {
    COMPONENT_NAME as STYLEABLE_BANNER_WITH_LINK_NAME,
    StyleableBannerWithLink,
} from './StyleableBannerWithLink';
import { COMPONENT_NAME as BANNER_NEWSLETTER_NAME, BannerNewsletter } from './BannerNewsletter';

export type CommonBannerComponentProps = {
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
    fetchEmail: FetchEmail;
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: SubmitComponentEvent;
};

const BANNER_MAPPINGS: ComponentMapping<CommonBannerComponentProps & HasConsolidatedTrackClick> = {
    [APP_BANNER_NAME]: AppBanner,
    [BANNER_WITH_LINK_NAME]: BannerWithLink,
    [STYLEABLE_BANNER_WITH_LINK_NAME]: StyleableBannerWithLink,
    [BANNER_NEWSLETTER_NAME]: BannerNewsletter,
};

export const BrazeBannerComponent: React.FC<CommonBannerComponentProps> =
    buildBrazeMessageComponent<CommonBannerComponentProps>(
        'RETENTION_ENGAGEMENT_BANNER',
        BANNER_MAPPINGS,
    );
