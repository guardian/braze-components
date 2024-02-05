import type { Extras } from './types';

// Banners
// --------------------------------------------
import {
    COMPONENT_NAME as APP_BANNER_NAME,
    canRender as appBannerCanRender,
} from '../AppBanner/canRender';

import {
    COMPONENT_NAME as BANNER_WITH_LINK_NAME,
    canRender as bannerWithLinkCanRender,
} from '../BannerWithLink/canRender';

import {
    COMPONENT_NAME as STYLEABLE_BANNER_WITH_LINK_NAME,
    canRender as styleableBannerWithLinkCanRender,
} from '../StyleableBannerWithLink/canRender';

import {
    COMPONENT_NAME as BANNER_NEWSLETTER_NAME,
    canRender as bannerNewsletterCanRender,
} from '../BannerNewsletter/canRender';

import {
    COMPONENT_NAME as STYLEABLE_BANNER_NEWSLETTER_NAME,
    canRender as styleableBannerNewsletterCanRender,
} from './StyleableBannerNewsletter/canRender';

// Default Epics
// --------------------------------------------
import { COMPONENT_NAME as EPIC_NAME, canRender as epicCanRender } from '../Epic/canRender';

import {
    COMPONENT_NAME as EPIC_WITH_IMAGE_NAME,
    canRender as epicWithImageCanRender,
} from '../EpicWithSpecialHeader/canRender';

// Old newsletter Epics
// --------------------------------------------
import {
    COMPONENT_NAME as US_NEWSLETTER_EPIC_NAME,
    canRender as usNewsletterEpicCanRender,
} from '../USNewsletterEpic/canRender';

import {
    COMPONENT_NAME as AU_NEWSLETTER_EPIC_NAME,
    canRender as auNewsletterEpicCanRender,
} from '../AUNewsletterEpic/canRender';

import {
    COMPONENT_NAME as UK_NEWSLETTER_EPIC_NAME,
    canRender as ukNewsletterEpicCanRender,
} from '../UKNewsletterEpic/canRender';

import {
    COMPONENT_NAME as DTE_NEWSLETTER_EPIC_NAME,
    canRender as dteNewsletterEpicCanRender,
} from '../DownToEarthNewsletterEpic/canRender';

// 2023 newsletter Epics
// --------------------------------------------
import {
    COMPONENT_NAME as EPICNEWSLETTER_AU_AFTERNOONUPDATE,
    canRender as EpicNewsletter_AU_AfternoonUpdate_canRender,
} from '../EpicNewsletter_AU_AfternoonUpdate/canRender';

import {
    COMPONENT_NAME as EPICNEWSLETTER_THEGUIDE,
    canRender as EpicNewsletter_TheGuide_canRender,
} from '../EpicNewsletter_TheGuide/canRender';

import {
    COMPONENT_NAME as NEWSLETTEREPIC_NAME,
    canRender as NewsletterEpic_canRender,
} from '../NewsletterEpic/canRender';

// Types, functionality, exports
// --------------------------------------------
// These are in a seperate file to enable tree shaking of the logic deciding if a Braze message can be rendered
// + This means the user won't download the Braze components bundle when the component can't be shown.

const COMPONENT_CAN_RENDER_MAPPINGS: Record<
    string,
    (brazeMessageProps: Record<string, unknown>) => boolean
> = {
    [APP_BANNER_NAME]: appBannerCanRender,
    [BANNER_WITH_LINK_NAME]: bannerWithLinkCanRender,
    [STYLEABLE_BANNER_WITH_LINK_NAME]: styleableBannerWithLinkCanRender,
    [BANNER_NEWSLETTER_NAME]: bannerNewsletterCanRender,
    [STYLEABLE_BANNER_NEWSLETTER_NAME]: styleableBannerNewsletterCanRender,

    [EPIC_NAME]: epicCanRender,
    [EPIC_WITH_IMAGE_NAME]: epicWithImageCanRender,

    [US_NEWSLETTER_EPIC_NAME]: usNewsletterEpicCanRender,
    [AU_NEWSLETTER_EPIC_NAME]: auNewsletterEpicCanRender,
    [UK_NEWSLETTER_EPIC_NAME]: ukNewsletterEpicCanRender,
    [DTE_NEWSLETTER_EPIC_NAME]: dteNewsletterEpicCanRender,

    [EPICNEWSLETTER_AU_AFTERNOONUPDATE]: EpicNewsletter_AU_AfternoonUpdate_canRender,
    [EPICNEWSLETTER_THEGUIDE]: EpicNewsletter_TheGuide_canRender,

    [NEWSLETTEREPIC_NAME]: NewsletterEpic_canRender,
};

export const canRenderBrazeMsg = (msgExtras: Extras | undefined): boolean => {
    if (!msgExtras) {
        return false;
    }
    if (!COMPONENT_CAN_RENDER_MAPPINGS[msgExtras.componentName]) {
        return false;
    }
    return COMPONENT_CAN_RENDER_MAPPINGS[msgExtras.componentName](msgExtras);
};
