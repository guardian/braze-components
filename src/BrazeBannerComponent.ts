import React from 'react';
import { OphanComponentEvent } from '@guardian/types';
import {
    COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
    DigitalSubscriberAppBanner,
} from './DigitalSubscriberAppBanner';
import { COMPONENT_NAME as APP_BANNER_NAME, AppBanner } from './AppBanner';
import {
    COMPONENT_NAME as SPECIAL_EDITION_BANNER_NAME,
    SpecialEditionBanner,
} from './SpecialEditionBanner';
import {
    COMPONENT_NAME as THE_GUARDIAN_IN_2020_BANNER_NAME,
    TheGuardianIn2020Banner,
} from './TheGuardianIn2020Banner';
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
    [THE_GUARDIAN_IN_2020_BANNER_NAME]: TheGuardianIn2020Banner,
};

export const BrazeBannerComponent: React.FC<CommonBannerComponentProps> =
    buildBrazeMessageComponent<CommonBannerComponentProps>(BANNER_MAPPINGS);
