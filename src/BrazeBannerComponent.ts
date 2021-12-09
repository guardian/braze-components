import React from 'react';
import { OphanComponentEvent } from '@guardian/libs';
import {
    COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
    DigitalSubscriberAppBanner,
} from './DigitalSubscriberAppBanner';
import { COMPONENT_NAME as APP_BANNER_NAME, AppBanner } from './AppBanner';
import {
    COMPONENT_NAME as SPECIAL_EDITION_BANNER_NAME,
    SpecialEditionBanner,
} from './SpecialEditionBanner';
import { COMPONENT_NAME as BANNER_WITH_LINK_NAME, BannerWithLink } from './BannerWithLink';
import { BrazeClickHandler } from './utils/tracking';
import { buildBrazeMessageComponent, ComponentMapping } from './buildBrazeMessageComponent';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

export type CommonBannerComponentProps = {
    componentName: string;
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: BrazeMessageProps;
};

const BANNER_MAPPINGS: ComponentMapping<CommonBannerComponentProps> = {
    [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: DigitalSubscriberAppBanner,
    [APP_BANNER_NAME]: AppBanner,
    [SPECIAL_EDITION_BANNER_NAME]: SpecialEditionBanner,
    [BANNER_WITH_LINK_NAME]: BannerWithLink,
};

export const BrazeBannerComponent: React.FC<CommonBannerComponentProps> =
    buildBrazeMessageComponent<CommonBannerComponentProps>(BANNER_MAPPINGS);
