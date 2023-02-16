// Banners
// --------------------------------------------
import {
    COMPONENT_NAME as APP_BANNER_NAME,
    canRender as appBannerCanRender,
} from './AppBanner/canRender';

import {
    COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
    canRender as digitialSubCanRender,
} from './DigitalSubscriberAppBanner/canRender';

import {
    COMPONENT_NAME as BANNER_WITH_LINK_NAME,
    canRender as bannerWithLinkCanRender,
} from './BannerWithLink/canRender';

import {
    COMPONENT_NAME as BANNER_NEWSLETTER_NAME,
    canRender as bannerNewsletterCanRender,
} from './BannerNewsletter/canRender';

// Default Epics
// --------------------------------------------
import { COMPONENT_NAME as EPIC_NAME, canRender as epicCanRender } from './Epic/canRender';

import {
    COMPONENT_NAME as EPIC_WITH_IMAGE_NAME,
    canRender as epicWithImageCanRender,
} from './EpicWithSpecialHeader/canRender';

// Old newsletter Epics
// --------------------------------------------
import {
    COMPONENT_NAME as NEWSLETTER_EPIC_NAME,
    canRender as newsletterEpicCanRender,
} from './NewsletterEpic/canRender';

import {
    COMPONENT_NAME as US_NEWSLETTER_EPIC_NAME,
    canRender as usNewsletterEpicCanRender,
} from './USNewsletterEpic/canRender';

import {
    COMPONENT_NAME as AU_NEWSLETTER_EPIC_NAME,
    canRender as auNewsletterEpicCanRender,
} from './AUNewsletterEpic/canRender';

import {
    COMPONENT_NAME as UK_NEWSLETTER_EPIC_NAME,
    canRender as ukNewsletterEpicCanRender,
} from './UKNewsletterEpic/canRender';

import {
    COMPONENT_NAME as DTE_NEWSLETTER_EPIC_NAME,
    canRender as dteNewsletterEpicCanRender,
} from './DownToEarthNewsletterEpic/canRender';

// New newsletter Epics
// --------------------------------------------
import {
    COMPONENT_NAME as EPICNEWSLETTER_AU_AFTERNOONUPDATE,
    canRender as EpicNewsletter_AU_AfternoonUpdate_canRender,
} from './EpicNewsletter_AU_AfternoonUpdate/canRender';

import {
    COMPONENT_NAME as EPICNEWSLETTER_THEGUIDE,
    canRender as EpicNewsletter_TheGuide_canRender,
} from './EpicNewsletter_TheGuide/canRender';

// Types, functionality, exports
// --------------------------------------------
// These are in a seperate file to enable tree shaking of the logic deciding if a Braze message can be rendered
// + This means the user won't download the Braze components bundle when the component can't be shown.

export type Extras = Record<string, string>;

const COMPONENT_CAN_RENDER_MAPPINGS: Record<
    string,
    (brazeMessageProps: Record<string, unknown>) => boolean
> = {
    [APP_BANNER_NAME]: appBannerCanRender,
    [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: digitialSubCanRender,
    [BANNER_WITH_LINK_NAME]: bannerWithLinkCanRender,
    [BANNER_NEWSLETTER_NAME]: bannerNewsletterCanRender,

    [EPIC_NAME]: epicCanRender,
    [EPIC_WITH_IMAGE_NAME]: epicWithImageCanRender,

    [NEWSLETTER_EPIC_NAME]: newsletterEpicCanRender,
    [US_NEWSLETTER_EPIC_NAME]: usNewsletterEpicCanRender,
    [AU_NEWSLETTER_EPIC_NAME]: auNewsletterEpicCanRender,
    [UK_NEWSLETTER_EPIC_NAME]: ukNewsletterEpicCanRender,
    [DTE_NEWSLETTER_EPIC_NAME]: dteNewsletterEpicCanRender,

    [EPICNEWSLETTER_AU_AFTERNOONUPDATE]: EpicNewsletter_AU_AfternoonUpdate_canRender,
    [EPICNEWSLETTER_THEGUIDE]: EpicNewsletter_TheGuide_canRender,
};

export const canRenderBrazeMsg = (msgExtras: Extras | undefined): boolean => {
    console.log('canRenderBrazeMsg #1', msgExtras);
    if (!msgExtras) {
        return false;
    }
    console.log('canRenderBrazeMsg #2', !COMPONENT_CAN_RENDER_MAPPINGS[msgExtras.componentName]);
    if (!COMPONENT_CAN_RENDER_MAPPINGS[msgExtras.componentName]) {
        return false;
    }
    console.log('canRenderBrazeMsg #3', COMPONENT_CAN_RENDER_MAPPINGS[msgExtras.componentName](msgExtras));
    return COMPONENT_CAN_RENDER_MAPPINGS[msgExtras.componentName](msgExtras);
};
