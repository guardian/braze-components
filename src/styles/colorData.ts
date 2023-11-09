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

export interface ColorStylesData {
    styleBackground?: ColorValueHex;
    styleHeader?: ColorValueHex;
    styleBody?: ColorValueHex;
    styleHighlight?: ColorValueHex;
    styleHighlightBackground?: ColorValueHex;
    styleButton?: ColorValueHex;
    styleButtonBackground?: ColorValueHex;
    styleButtonHover?: ColorValueHex;
    styleReminderButton?: ColorValueHex;
    styleReminderButtonBackground?: ColorValueHex;
    styleReminderButtonHover?: ColorValueHex;
    styleReminderAnimation?: ColorValueHex;
    styleClose?: ColorValueHex;
    styleCloseBackground?: ColorValueHex;
    styleCloseHover?: ColorValueHex;
}

export interface ReminderButtonColorStyles {
    styleReminderButton: ColorValueHex;
    styleReminderButtonBackground: ColorValueHex;
    styleReminderButtonHover: ColorValueHex;
}

export interface BannerColorStyles extends ReminderButtonColorStyles {
    styleBackground: ColorValueHex;
    styleHeader: ColorValueHex;
    styleBody: ColorValueHex;
    styleHighlight: ColorValueHex;
    styleHighlightBackground: ColorValueHex;
    styleButton: ColorValueHex;
    styleButtonBackground: ColorValueHex;
    styleButtonHover: ColorValueHex;
    styleReminderAnimation: ColorValueHex;
    styleClose: ColorValueHex;
    styleCloseBackground: ColorValueHex;
    styleCloseHover: ColorValueHex;
}

export const colorStringStyles = [
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

type ColorStyles = keyof ColorStylesData;

export function getColors(userVals: Extras, defaults: ColorStylesData) {
    const style: ColorStylesData = Object.assign({}, defaults);
    const defKeys: ColorStyles[] = Object.keys(defaults) as ColorStyles[];
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
