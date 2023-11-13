import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';

import { PaymentIcons } from './PaymentIcons';
import { TrackClick } from '../utils/tracking';
import { contributionsTheme } from '../styles/colorData';

const buttonWrapperStyles = css`
    margin: ${space[4]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
`;

const buttonMargins = css`
    margin: ${space[1]}px ${space[2]}px ${space[1]}px 0;
`;

interface ContributionCtaButtonProps {
    buttonText: string;
    buttonUrl: string;
    hidePaymentIcons: string;
    ophanComponentId: string;
    trackClick: TrackClick;
}

export const ContributionCtaButton = ({
    buttonUrl,
    buttonText,
    hidePaymentIcons,
    ophanComponentId,
    trackClick,
}: ContributionCtaButtonProps) => {
    const showPaymentIcons = hidePaymentIcons !== 'true';
    const internalButtonId = 0;

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
