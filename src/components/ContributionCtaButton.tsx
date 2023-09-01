import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, brandAlt, space } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';

import { PaymentIcons } from './PaymentIcons';
import { TrackClick } from '../utils/tracking';

const buttonWrapperStyles = css`
    margin: ${space[4]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

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

interface ContributionCtaButtonProps {
    buttonText: string;
    buttonUrl: string;
    hidePaymentIcons: string;
    internalButtonId: number;
    ophanComponentId: string;
    trackClick: TrackClick;
}

export const ContributionCtaButton = ({
    buttonUrl,
    buttonText,
    hidePaymentIcons,
    internalButtonId,
    ophanComponentId,
    trackClick,
}: ContributionCtaButtonProps) => {
    const showPaymentIcons = hidePaymentIcons !== 'true';
    const onClick = () => trackClick({ internalButtonId, ophanComponentId });
    return (
        <div css={buttonWrapperStyles}>
            <div css={buttonMargins}>
                <ThemeProvider theme={contributionsTheme}>
                    <LinkButton
                        href={buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        priority={'primary'}
                        onClick={onClick}
                    >
                        {buttonText}
                    </LinkButton>
                </ThemeProvider>
            </div>
            {showPaymentIcons && <PaymentIcons />}
        </div>
    );
};
