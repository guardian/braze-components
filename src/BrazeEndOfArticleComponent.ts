import React from 'react';

// Common newsletter imports
import { NewsletterSubscribeCallback } from './newsletterCommon';

// Common Epic imports
import {
    buildBrazeMessageComponent,
    ComponentMapping,
    HasConsolidatedTrackClick,
} from './buildBrazeMessageComponent';
import type { BrazeClickHandler, SubmitComponentEvent } from './utils/tracking';

// Why are we mapping this component?
// Isn't it the blueprint on top of which other newsletter epics get built?
import { COMPONENT_NAME as NEWSLETTER_EPIC_NAME, NewsletterEpic } from './NewsletterEpic';

// Generic Epic Templates
import { COMPONENT_NAME as EPIC_NAME, Epic } from './Epic';
import {
    COMPONENT_NAME as EPIC_WITH_HEADER_IMAGE_NAME,
    EpicWithSpecialHeader,
} from './EpicWithSpecialHeader';

// Old name Newsletter Epics
import { COMPONENT_NAME as US_NEWSLETTER_EPIC_NAME, USNewsletterEpic } from './USNewsletterEpic';
import { COMPONENT_NAME as AU_NEWSLETTER_EPIC_NAME, AUNewsletterEpic } from './AUNewsletterEpic';
import { COMPONENT_NAME as UK_NEWSLETTER_EPIC_NAME, UKNewsletterEpic } from './UKNewsletterEpic';
import {
    COMPONENT_NAME as DTE_NEWSLETTER_EPIC_NAME,
    DownToEarthNewsletterEpic,
} from './DownToEarthNewsletterEpic';

// New name Newsletter Epics
import {
    COMPONENT_NAME as EPICNEWSLETTER_AU_AFTERNOONUPDATE_NAME,
    EpicNewsletter_AU_AfternoonUpdate,
} from './EpicNewsletter_AU_AfternoonUpdate';
import {
    COMPONENT_NAME as EPICNEWSLETTER_THEGUIDE_NAME,
    EpicNewsletter_TheGuide,
} from './EpicNewsletter_TheGuide';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

export type CommonEndOfArticleComponentProps = {
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
    countryCode?: string;
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: SubmitComponentEvent;
};

const END_OF_ARTICLE_MAPPINGS: ComponentMapping<
    CommonEndOfArticleComponentProps & HasConsolidatedTrackClick
> = {
    [EPIC_NAME]: Epic,
    [EPIC_WITH_HEADER_IMAGE_NAME]: EpicWithSpecialHeader,

    [NEWSLETTER_EPIC_NAME]: NewsletterEpic,

    // Old name Newsletter Epics
    [US_NEWSLETTER_EPIC_NAME]: USNewsletterEpic,
    [AU_NEWSLETTER_EPIC_NAME]: AUNewsletterEpic,
    [UK_NEWSLETTER_EPIC_NAME]: UKNewsletterEpic,
    [DTE_NEWSLETTER_EPIC_NAME]: DownToEarthNewsletterEpic,

    // New name Newsletter Epics
    [EPICNEWSLETTER_AU_AFTERNOONUPDATE_NAME]: EpicNewsletter_AU_AfternoonUpdate,
    [EPICNEWSLETTER_THEGUIDE_NAME]: EpicNewsletter_TheGuide,
};

export const BrazeEndOfArticleComponent: React.FC<CommonEndOfArticleComponentProps> =
    buildBrazeMessageComponent<CommonEndOfArticleComponentProps>(
        'RETENTION_EPIC',
        END_OF_ARTICLE_MAPPINGS,
    );
