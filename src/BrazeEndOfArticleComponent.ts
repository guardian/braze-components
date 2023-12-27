import React from 'react';

// Common newsletter imports
import type { NewsletterSubscribeCallback, FetchEmail } from './types/dcrTypes';

// Common Epic imports
import {
    buildBrazeMessageComponent,
    ComponentMapping,
    HasConsolidatedTrackClick,
    BrazeMessageProps,
} from './buildBrazeMessageComponent';
import type { BrazeClickHandler, SubmitComponentEvent } from './utils/tracking';

// Generic Epic Templates
import { COMPONENT_NAME as EPIC_NAME, Epic } from './Epic';
import {
    COMPONENT_NAME as EPIC_WITH_HEADER_IMAGE_NAME,
    EpicWithSpecialHeader,
} from './EpicWithSpecialHeader';
import {
    COMPONENT_NAME as EPICNEWSLETTER_SELFSERVE_NAME,
    EpicNewsletter_SelfServe,
} from './EpicNewsletter_SelfServe';

// Old name Newsletter Epics
import { COMPONENT_NAME as US_NEWSLETTER_EPIC_NAME, USNewsletterEpic } from './USNewsletterEpic';
import { COMPONENT_NAME as AU_NEWSLETTER_EPIC_NAME, AUNewsletterEpic } from './AUNewsletterEpic';
import { COMPONENT_NAME as UK_NEWSLETTER_EPIC_NAME, UKNewsletterEpic } from './UKNewsletterEpic';
import {
    COMPONENT_NAME as DTE_NEWSLETTER_EPIC_NAME,
    DownToEarthNewsletterEpic,
} from './DownToEarthNewsletterEpic';

// 2023 Newsletter Epics
import {
    COMPONENT_NAME as EPICNEWSLETTER_AU_AFTERNOONUPDATE_NAME,
    EpicNewsletter_AU_AfternoonUpdate,
} from './EpicNewsletter_AU_AfternoonUpdate';
import {
    COMPONENT_NAME as EPICNEWSLETTER_THEGUIDE_NAME,
    EpicNewsletter_TheGuide,
} from './EpicNewsletter_TheGuide';

export type CommonEndOfArticleComponentProps = {
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
    fetchEmail: FetchEmail;
    countryCode?: string;
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: SubmitComponentEvent;
};

const END_OF_ARTICLE_MAPPINGS: ComponentMapping<
    CommonEndOfArticleComponentProps & HasConsolidatedTrackClick
> = {
    [EPIC_NAME]: Epic,
    [EPIC_WITH_HEADER_IMAGE_NAME]: EpicWithSpecialHeader,

    // Old name Newsletter Epics
    [US_NEWSLETTER_EPIC_NAME]: USNewsletterEpic,
    [AU_NEWSLETTER_EPIC_NAME]: AUNewsletterEpic,
    [UK_NEWSLETTER_EPIC_NAME]: UKNewsletterEpic,
    [DTE_NEWSLETTER_EPIC_NAME]: DownToEarthNewsletterEpic,

    // New name Newsletter Epics
    [EPICNEWSLETTER_AU_AFTERNOONUPDATE_NAME]: EpicNewsletter_AU_AfternoonUpdate,
    [EPICNEWSLETTER_THEGUIDE_NAME]: EpicNewsletter_TheGuide,
    [EPICNEWSLETTER_SELFSERVE_NAME]: EpicNewsletter_SelfServe,
};

export const BrazeEndOfArticleComponent: React.FC<CommonEndOfArticleComponentProps> =
    buildBrazeMessageComponent<CommonEndOfArticleComponentProps>(
        'RETENTION_EPIC',
        END_OF_ARTICLE_MAPPINGS,
    );
