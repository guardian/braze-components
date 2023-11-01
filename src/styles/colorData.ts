import { brandAlt, neutral } from '@guardian/source-foundations';

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

export interface BannerStyleData {
    styleBackground: string;
    styleHeader: string;
    styleBody: string;
    styleHighlight: string;
    styleHighlightBackground: string;
    styleButton: string;
    styleButtonBackground: string;
    styleButtonHover: string;
    styleReminderButton: string;
    styleReminderButtonBackground: string;
    styleReminderButtonHover: string;
    styleReminderAnimation: string;
    styleClose: string;
    styleCloseBackground: string;
    styleCloseHover: string;
}

export interface EpicStyleData {
    styleReminderButton: string;
    styleReminderButtonBackground: string;
    styleReminderButtonHover: string;
    styleReminderAnimation: string;
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

export type BannerStyles = keyof BannerStyleData;
export type EpicStyles = keyof EpicStyleData;
