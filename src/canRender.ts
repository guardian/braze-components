import {
    COMPONENT_NAME as APP_BANNER_NAME,
    canRender as appBannerCanRender,
} from './AppBanner/canRender';
import {
    COMPONENT_NAME as DIGITAL_SUBSCRIBER_APP_BANNER_NAME,
    canRender as digitialSubCanRender,
} from './DigitalSubscriberAppBanner/canRender';
import {
    COMPONENT_NAME as SPECIAL_EDITION_BANNER_NAME,
    canRender as specialEdCanRender,
} from './SpecialEditionBanner/canRender';
import { COMPONENT_NAME as EPIC_NAME, canRender as epicCanRender } from './Epic/canRender';
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
    COMPONENT_NAME as EPIC_WITH_IMAGE_NAME,
    canRender as epicWithImageCanRender,
} from './EpicWithSpecialHeader/canRender';

import {
    COMPONENT_NAME as DTE_NEWSLETTER_EPIC_NAME,
    canRender as dteNewsletterEpicCanRender,
} from './DownToEarthNewsletterEpic/canRender';

import {
    COMPONENT_NAME as BANNER_WITH_LINK_NAME,
    canRender as bannerWithLinkCanRender,
} from './BannerWithLink/canRender';

/** These are in a seperate file to enable tree shaking of the logic deciding if a Braze message can be rendered
 * this means the user won't download the Braze components bundle when the component can't be shown.
 */

export type Extras = Record<string, string>;

const COMPONENT_CAN_RENDER_MAPPINGS: Record<
    string,
    (brazeMessageProps: Record<string, unknown>) => boolean
> = {
    [APP_BANNER_NAME]: appBannerCanRender,
    [DIGITAL_SUBSCRIBER_APP_BANNER_NAME]: digitialSubCanRender,
    [SPECIAL_EDITION_BANNER_NAME]: specialEdCanRender,
    [EPIC_NAME]: epicCanRender,
    [NEWSLETTER_EPIC_NAME]: newsletterEpicCanRender,
    [US_NEWSLETTER_EPIC_NAME]: usNewsletterEpicCanRender,
    [AU_NEWSLETTER_EPIC_NAME]: auNewsletterEpicCanRender,
    [UK_NEWSLETTER_EPIC_NAME]: ukNewsletterEpicCanRender,
    [EPIC_WITH_IMAGE_NAME]: epicWithImageCanRender,
    [DTE_NEWSLETTER_EPIC_NAME]: dteNewsletterEpicCanRender,
    [BANNER_WITH_LINK_NAME]: bannerWithLinkCanRender,
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
