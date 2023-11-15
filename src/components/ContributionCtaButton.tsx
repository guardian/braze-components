import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';

import { PaymentIcons } from './PaymentIcons';
import { TrackClick } from '../utils/tracking';
import { contributionsTheme, getColors, ContributionButtonColorStyles } from '../styles/colorData';

const defaultButtonColors: ContributionButtonColorStyles = {
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
};

const getButtonStyles = (
    userVals: Partial<ContributionButtonColorStyles>,
    defaults: ContributionButtonColorStyles,
) => {
    const styles = getColors(userVals, defaults);
    return {
        buttonWrapperStyles: css`
            margin: ${space[4]}px ${space[2]}px ${space[1]}px 0;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            max-width: 50%;
        `,
        buttonMargins: css`
            margin: ${space[1]}px ${space[2]}px ${space[1]}px 0;
        `,
        contributionButtonOverrides: css`
            background-color: ${styles.styleButtonBackground} !important;
            color: ${styles.styleButton} !important;

            :hover {
                background-color: ${styles.styleButtonHover} !important;
            }
        `,
    };
};

interface ContributionCtaButtonProps {
    buttonText: string;
    buttonUrl: string;
    showPaymentIcons: boolean;
    ophanComponentId: string;
    trackClick: TrackClick;
    userStyles: Partial<ContributionButtonColorStyles>;
}

export const ContributionCtaButton = ({
    buttonUrl,
    buttonText,
    showPaymentIcons,
    ophanComponentId,
    trackClick,
    userStyles = {},
}: ContributionCtaButtonProps) => {
    const internalButtonId = 0;

    const styles = getButtonStyles(userStyles, defaultButtonColors);

    const onClick = () => trackClick({ internalButtonId, ophanComponentId });

    return (
        <div css={styles.buttonWrapperStyles}>
            <div css={styles.buttonMargins}>
                <ThemeProvider theme={contributionsTheme}>
                    <LinkButton
                        href={buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        priority={'primary'}
                        css={styles.contributionButtonOverrides}
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
