import { brandAlt, neutral } from '@guardian/source-foundations';
import type { Extras, ColorValueHex } from '../logic/types';
import { stringIsColorValueHex } from '../logic/types';

const buttonStyles = {
    textPrimary: neutral[7],
    backgroundPrimary: brandAlt[400],
    backgroundPrimaryHover: brandAlt[300],
    textSecondary: neutral[7],
    backgroundSecondary: neutral[93],
    backgroundSecondaryHover: neutral[86],
    borderSecondary: neutral[86],
};

export const contributionsTheme = {
    button: buttonStyles,
    link: buttonStyles,
};

export interface LoadingDotsColorStyles {
    styleReminderAnimation: ColorValueHex;
}

export interface NewsletterFrequencyColorStyles {
    styleClockColor: ColorValueHex;
    styleFrequencyText: ColorValueHex;
}

export interface PrimaryButtonColorStyles {
    styleButton: ColorValueHex;
    styleButtonBackground: ColorValueHex;
    styleButtonHover: ColorValueHex;
}

export interface ReminderButtonColorStyles extends LoadingDotsColorStyles {
    styleReminderButton: ColorValueHex;
    styleReminderButtonBackground: ColorValueHex;
    styleReminderButtonHover: ColorValueHex;
}

export interface NewsletterButtonColorStyles extends LoadingDotsColorStyles {
    styleNewsletterButton: ColorValueHex;
    styleNewsletterButtonBackground: ColorValueHex;
    styleNewsletterButtonHover: ColorValueHex;
}

export interface BannerWithLinkCopyColorStyles {
    styleBackground: ColorValueHex;
    styleHeader: ColorValueHex;
    styleBody: ColorValueHex;
    styleHighlight: ColorValueHex;
    styleHighlightBackground: ColorValueHex;
    styleClose: ColorValueHex;
    styleCloseBackground: ColorValueHex;
    styleCloseHover: ColorValueHex;
}

export interface BannerNewsletterCopyColorStyles {
    styleBackground: ColorValueHex;
    styleHeader: ColorValueHex;
    styleBody: ColorValueHex;
    styleHighlight: ColorValueHex;
    styleHighlightBackground: ColorValueHex;
    styleClose: ColorValueHex;
    styleCloseBackground: ColorValueHex;
    styleCloseHover: ColorValueHex;
}

export interface BannerWithLinkColorStyles
    extends BannerWithLinkCopyColorStyles,
        PrimaryButtonColorStyles {}

export interface StyleableBannerWithLinkColorStyles
    extends ReminderButtonColorStyles,
        PrimaryButtonColorStyles,
        BannerWithLinkCopyColorStyles {}

export interface BannerNewsletterColorStyles
    extends NewsletterFrequencyColorStyles,
        BannerNewsletterCopyColorStyles,
        NewsletterButtonColorStyles {}

export interface StyleableBannerNewsletterColorStyles
    extends NewsletterFrequencyColorStyles,
        BannerNewsletterCopyColorStyles,
        NewsletterButtonColorStyles {}

// This will become an interface once we build a more generic newsletter epic with limited styling around the newsletter 1-click signup button
export type EpicColorStyles = ReminderButtonColorStyles;

interface AllAvailableColorStyles
    extends LoadingDotsColorStyles,
        NewsletterFrequencyColorStyles,
        NewsletterButtonColorStyles,
        ReminderButtonColorStyles,
        PrimaryButtonColorStyles,
        BannerWithLinkColorStyles,
        EpicColorStyles {}

type ColorStylesType = keyof AllAvailableColorStyles;

export function getColors<T extends Partial<Record<ColorStylesType, ColorValueHex>>>(
    userVals: Extras,
    defaults: T,
): T {
    const style: T = Object.assign({}, defaults);
    const defKeys = Object.keys(defaults) as ColorStylesType[];

    defKeys.forEach((key) => {
        const userVal = userVals[key];

        // If user val is undefined, or an empty string, use default val
        if (userVal == null || !userVal.length) {
            return;
        }

        // Protect against CSS injection
        const item = userVal.split(';')[0].trim();

        // Protect against null or empty user strings
        if (!item) {
            return;
        }

        // Check for legitimate CSS color string values
        // - we only support `#abcdef` color format
        if (stringIsColorValueHex(item)) {
            style[key] = item;
        }
    });

    return style;
}
