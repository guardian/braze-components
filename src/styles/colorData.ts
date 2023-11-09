import { brandAlt, neutral } from '@guardian/source-foundations';
import type { Extras, ColorValueHex } from '../logic/types';

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

export interface ReminderButtonColorStyles extends LoadingDotsColorStyles {
    styleReminderButton: ColorValueHex;
    styleReminderButtonBackground: ColorValueHex;
    styleReminderButtonHover: ColorValueHex;
}

export interface BannerColorStyles {
    styleBackground: ColorValueHex;
    styleHeader: ColorValueHex;
    styleBody: ColorValueHex;
    styleHighlight: ColorValueHex;
    styleHighlightBackground: ColorValueHex;
    styleButton: ColorValueHex;
    styleButtonBackground: ColorValueHex;
    styleButtonHover: ColorValueHex;
    styleClose: ColorValueHex;
    styleCloseBackground: ColorValueHex;
    styleCloseHover: ColorValueHex;
}

export interface StyleableBannerColorStyles extends ReminderButtonColorStyles, BannerColorStyles {}

// This will become an interface once we build a more generic newsletter epic with limited styling around the newsletter 1-click signup button
export type EpicColorStyles = ReminderButtonColorStyles;

interface AllAvailableColorStyles
    extends LoadingDotsColorStyles,
        ReminderButtonColorStyles,
        BannerColorStyles,
        EpicColorStyles {}

const colorStringStyles = [
    'styleBackground',
    'styleHeader',
    'styleBody',
    'styleHighlight',
    'styleHighlightBackground',
    'styleButton',
    'styleButtonBackground',
    'styleButtonHover',
    'styleReminderButton',
    'styleReminderButtonBackground',
    'styleReminderButtonHover',
    'styleReminderAnimation',
    'styleClose',
    'styleCloseBackground',
    'styleCloseHover',
];

type ColorStylesType = keyof AllAvailableColorStyles;

export function getColors(userVals: Extras, defaults: Partial<AllAvailableColorStyles>) {
    const style: Partial<AllAvailableColorStyles> = Object.assign({}, defaults);
    const defKeys: ColorStylesType[] = Object.keys(defaults) as ColorStylesType[];
    const regex = new RegExp(/^#([A-Fa-f0-9]{6})$/);

    defKeys.forEach((key) => {
        const userVal = userVals[key];

        // If user val is undefined, or an empty string, use default val
        if (userVal == null || !userVal.length) {
            return;
        }

        // Protect against CSS injection
        const item = userVal.split(';')[0].trim();

        // Protect against null or empty user strings
        if (item == null || !item.length) {
            return;
        }

        // Check for legitimate CSS color string values
        // - we only support `#abcdef` color format
        if (colorStringStyles.includes(key) && regex.test(item)) {
            style[key] = item as ColorValueHex;
        }
    });

    return style;
}
