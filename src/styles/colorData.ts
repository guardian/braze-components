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

export interface BannerFrameColorStyles {
    styleBackground: ColorValueHex;
}

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

export interface CloseButtonColorStyles {
    styleClose: ColorValueHex;
    styleCloseBackground: ColorValueHex;
    styleCloseHover: ColorValueHex;
}

export interface BannerWithLinkBaseColorStyles extends BannerFrameColorStyles {
    styleHeader: ColorValueHex;
    styleBody: ColorValueHex;
    styleHighlight: ColorValueHex;
    styleHighlightBackground: ColorValueHex;
}

export interface BannerNewsletterBaseColorStyles extends BannerFrameColorStyles {
    styleHeader: ColorValueHex;
    styleBody: ColorValueHex;
    styleSecondParagraph: ColorValueHex;
    styleHighlight: ColorValueHex;
    styleHighlightBackground: ColorValueHex;
}

interface AllAvailableColorStyles
    extends BannerFrameColorStyles,
        BannerWithLinkBaseColorStyles,
        BannerNewsletterBaseColorStyles,
        NewsletterFrequencyColorStyles,
        PrimaryButtonColorStyles,
        NewsletterButtonColorStyles,
        ReminderButtonColorStyles,
        LoadingDotsColorStyles,
        CloseButtonColorStyles {}

export interface BannerWithLinkColorStyles
    extends BannerWithLinkBaseColorStyles,
        PrimaryButtonColorStyles,
        CloseButtonColorStyles {}

export interface StyleableBannerWithLinkColorStyles
    extends BannerWithLinkBaseColorStyles,
        PrimaryButtonColorStyles,
        ReminderButtonColorStyles,
        CloseButtonColorStyles {}

export interface BannerNewsletterColorStyles
    extends BannerNewsletterBaseColorStyles,
        NewsletterFrequencyColorStyles,
        NewsletterButtonColorStyles,
        CloseButtonColorStyles {}

export interface StyleableBannerNewsletterColorStyles
    extends BannerNewsletterBaseColorStyles,
        NewsletterFrequencyColorStyles,
        NewsletterButtonColorStyles,
        CloseButtonColorStyles {}

// This will become an interface once we build a more generic newsletter epic with limited styling around the newsletter 1-click signup button
export type EpicColorStyles = ReminderButtonColorStyles;

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
