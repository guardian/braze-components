import React from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, brandAlt, space } from '@guardian/source-foundations';
import { Button, LinkButton, SvgArrowRightStraight } from '@guardian/source-react-components';

const buttonWrapperStyles = css`
    margin: ${space[4]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &.hidden {
        display: none;
    }
`;

const paymentImageStyles = css`
    display: inline-block;
    width: auto;
    height: 25px;
    margin: ${space[1]}px 0;
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

const remindMeButtonOverrides = css`
    :hover {
        background-color: ${neutral[86]};
    }
`;
interface ContributionsEpicButtonsProps {
    buttonText: string;
    buttonUrl: string;
    remindMeButtonText?: string;
    remindMeConfirmationText?: string;
}

export const ContributionsEpicButtons = ({
    buttonText,
    buttonUrl,
    remindMeButtonText,
    remindMeConfirmationText,
}: ContributionsEpicButtonsProps): JSX.Element | null => {
    const shouldShowRemindMeButton = Boolean(remindMeButtonText && remindMeConfirmationText);

    return (
        <div css={buttonWrapperStyles}>
            <div css={buttonMargins}>
                <ThemeProvider theme={contributionsTheme}>
                    <LinkButton
                        href={buttonUrl}
                        icon={<SvgArrowRightStraight />}
                        iconSide="right"
                        target="_blank"
                        rel="noopener noreferrer"
                        priority={'primary'}
                    >
                        {buttonText}
                    </LinkButton>
                </ThemeProvider>
            </div>

            {shouldShowRemindMeButton && (
                <ThemeProvider theme={contributionsTheme}>
                    <Button
                        onClick={() => console.log('remind me button clicked')}
                        priority="tertiary"
                        css={remindMeButtonOverrides}
                    >
                        {remindMeButtonText}
                    </Button>
                </ThemeProvider>
            )}

            <img
                width={422}
                height={60}
                src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                css={paymentImageStyles}
            />
        </div>
    );
};
