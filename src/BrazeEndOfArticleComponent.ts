import React from 'react';

import {
    COMPONENT_NAME as NEWSLETTER_EPIC_NAME,
    NewsletterEpic,
    NewsletterSubscribeCallback,
} from './NewsletterEpic';

import { COMPONENT_NAME as US_NEWSLETTER_EPIC_NAME, USNewsletterEpic } from './USNewsletterEpic';

import { COMPONENT_NAME as AU_NEWSLETTER_EPIC_NAME, AUNewsletterEpic } from './AUNewsletterEpic';

import { COMPONENT_NAME as UK_NEWSLETTER_EPIC_NAME, UKNewsletterEpic } from './UKNewsletterEpic';

import { COMPONENT_NAME as EPIC_NAME, Epic } from './Epic';
import { buildBrazeMessageComponent, ComponentMapping } from './buildBrazeMessageComponent';

type BrazeMessageProps = {
    [key: string]: string | undefined;
};

export type CommonEndOfArticleComponentProps = {
    componentName: string;
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
    countryCode?: string;
};

const END_OF_ARTICLE_MAPPINGS: ComponentMapping<CommonEndOfArticleComponentProps> = {
    [NEWSLETTER_EPIC_NAME]: NewsletterEpic,
    [US_NEWSLETTER_EPIC_NAME]: USNewsletterEpic,
    [AU_NEWSLETTER_EPIC_NAME]: AUNewsletterEpic,
    [UK_NEWSLETTER_EPIC_NAME]: UKNewsletterEpic,
    [EPIC_NAME]: Epic,
};

export const BrazeEndOfArticleComponent: React.FC<CommonEndOfArticleComponentProps> = buildBrazeMessageComponent<
    CommonEndOfArticleComponentProps
>(END_OF_ARTICLE_MAPPINGS);