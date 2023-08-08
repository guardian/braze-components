import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { brandAlt, neutral, space } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';

const buttonMargins = css`
    margin: ${space[1]}px ${space[2]}px ${space[1]}px 0;
`;

// Custom theme for Button/LinkButton
// See also `tertiaryButtonOverrides` below.
const buttonStyles = {
    textPrimary: neutral[7],
    backgroundPrimary: brandAlt[400],
    backgroundPrimaryHover: brandAlt[300],
    textSecondary: neutral[7],
    backgroundSecondary: neutral[93],
    backgroundSecondaryHover: neutral[86],
    borderSecondary: neutral[86],
};

const contributionsTheme = {
    button: buttonStyles,
    link: buttonStyles,
};

interface PrimaryCtaButtonProps {
    buttonText: string;
    buttonUrl: string;
    trackClick: (buttonId: number) => void;
}

const PRIMARY_BUTTON_INTERNAL_ID = 0;

export const PrimaryCtaButton = ({ buttonUrl, buttonText, trackClick }: PrimaryCtaButtonProps) => (
    <div css={buttonMargins}>
        <ThemeProvider theme={contributionsTheme}>
            <LinkButton
                href={buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                priority={'primary'}
                onClick={() => trackClick(PRIMARY_BUTTON_INTERNAL_ID)}
            >
                {buttonText}
            </LinkButton>
        </ThemeProvider>
    </div>
);

