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

import { COMPONENT_NAME as NEWSLETTER_EPIC_NAME, NewsletterEpic } from './NewsletterEpic';

import { COMPONENT_NAME as US_NEWSLETTER_EPIC_NAME, USNewsletterEpic } from './USNewsletterEpic';

import { COMPONENT_NAME as AU_NEWSLETTER_EPIC_NAME, AUNewsletterEpic } from './AUNewsletterEpic';

import { COMPONENT_NAME as UK_NEWSLETTER_EPIC_NAME, UKNewsletterEpic } from './UKNewsletterEpic';

import { Epic } from './Epic';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

type CommonComponentProps = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    brazeMessageProps: BrazeMessageProps;
};

type ComponentMapping = {
    [key: string]: React.FC<CommonComponentProps>;
};

const COMPONENT_MAPPINGS: ComponentMapping = {
    [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: DigitalSubscriberAppBanner,
    [APP_BANNER_NAME]: AppBanner,
    [SPECIAL_EDITION_BANNER_NAME]: SpecialEditionBanner,
    [THE_GUARDIAN_IN_2020_BANNER_NAME]: TheGuardianIn2020Banner,
    [NEWSLETTER_EPIC_NAME]: NewsletterEpic,
    [US_NEWSLETTER_EPIC_NAME]: USNewsletterEpic,
    [AU_NEWSLETTER_EPIC_NAME]: AUNewsletterEpic,
    [UK_NEWSLETTER_EPIC_NAME]: UKNewsletterEpic,
    Epic: Epic,
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
};

export const buildBrazeMessageComponent = (mappings: ComponentMapping): React.FC<Props> => {
    const BrazeMessageComponent = ({
        logButtonClickWithBraze,
        submitComponentEvent,
        componentName,
        brazeMessageProps,
    }: Props) => {
        const ComponentToRender = mappings[componentName];

        if (!ComponentToRender) {
            return null;
        }

        return (
            <ComponentToRender
                logButtonClickWithBraze={logButtonClickWithBraze}
                submitComponentEvent={submitComponentEvent}
                brazeMessageProps={brazeMessageProps}
            />
        );
    };

    return BrazeMessageComponent;
};

export const BrazeMessageComponent: React.FC<Props> = buildBrazeMessageComponent(
    COMPONENT_MAPPINGS,
);
