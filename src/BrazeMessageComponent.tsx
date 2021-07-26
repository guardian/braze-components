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

import {
    COMPONENT_NAME as NEWSLETTER_EPIC_NAME,
    NewsletterEpic,
    NewsletterSubscribeCallback,
} from './NewsletterEpic';

import { COMPONENT_NAME as US_NEWSLETTER_EPIC_NAME, USNewsletterEpic } from './USNewsletterEpic';

import { COMPONENT_NAME as AU_NEWSLETTER_EPIC_NAME, AUNewsletterEpic } from './AUNewsletterEpic';

import { COMPONENT_NAME as UK_NEWSLETTER_EPIC_NAME, UKNewsletterEpic } from './UKNewsletterEpic';

import { COMPONENT_NAME as EPIC_NAME, Epic } from './Epic';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

export type CommonBannerComponentProps = {
    componentName: string;
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: BrazeMessageProps;
};

export type CommonEndOfArticleComponentProps = {
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
    countryCode?: string;
};

type ComponentMapping<A> = {
    [key: string]: React.FC<A>;
};

const BANNER_MAPPINGS: ComponentMapping<CommonBannerComponentProps> = {
    [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: DigitalSubscriberAppBanner,
    [APP_BANNER_NAME]: AppBanner,
    [SPECIAL_EDITION_BANNER_NAME]: SpecialEditionBanner,
    [THE_GUARDIAN_IN_2020_BANNER_NAME]: TheGuardianIn2020Banner,
};

const END_OF_ARTICLE_MAPPINGS: ComponentMapping<CommonEndOfArticleComponentProps> = {
    [NEWSLETTER_EPIC_NAME]: NewsletterEpic,
    [US_NEWSLETTER_EPIC_NAME]: USNewsletterEpic,
    [AU_NEWSLETTER_EPIC_NAME]: AUNewsletterEpic,
    [UK_NEWSLETTER_EPIC_NAME]: UKNewsletterEpic,
    [EPIC_NAME]: Epic,
};

interface HasComponentName {
    componentName: string;
}

export function buildBrazeMessageComponent<A extends HasComponentName>(
    mappings: ComponentMapping<A>,
): React.FC<A> {
    const BrazeMessageComponent = (props: A) => {
        const ComponentToRender = mappings[props.componentName];

        if (!ComponentToRender) {
            return null;
        }

        return <ComponentToRender {...props} />;
    };

    return BrazeMessageComponent;
}

export const BrazeBannerComponent: React.FC<CommonBannerComponentProps> = buildBrazeMessageComponent<
    CommonBannerComponentProps
>(BANNER_MAPPINGS);

export const BrazeEndOfArticleComponent: React.FC<CommonEndOfArticleComponentProps> = buildBrazeMessageComponent<
    CommonEndOfArticleComponentProps
>(END_OF_ARTICLE_MAPPINGS);
