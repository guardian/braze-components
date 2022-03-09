import React, { useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, brandAlt, space, body, headline } from '@guardian/source-foundations';
import { Button, LinkButton, SvgArrowRightStraight } from '@guardian/source-react-components';
import { Lines } from '@guardian/source-react-components-development-kitchen';

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

interface PrimaryButtonProps {
    buttonText: string;
    buttonUrl: string;
}

const PrimaryButton = ({ buttonUrl, buttonText }: PrimaryButtonProps) => (
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
);

interface RemindMeButtonProps {
    remindMeButtonText: string;
    onClick: () => void;
}

const RemindMeButton = ({ remindMeButtonText, onClick }: RemindMeButtonProps) => (
    <ThemeProvider theme={contributionsTheme}>
        <Button onClick={() => onClick()} priority="tertiary" css={remindMeButtonOverrides}>
            {remindMeButtonText}
        </Button>
    </ThemeProvider>
);

interface ContributionsEpicButtonsProps {
    buttonText: string;
    buttonUrl: string;
    remindMeButtonText?: string;
    remindMeConfirmationText?: string;
    remindMeConfirmationHeaderText?: string;
}
const successTextStyles = css`
    ${body.medium()};
    margin: 0;
`;

const successHeadingStyles = css`
    ${headline.xxsmall({ fontWeight: 'bold' })};
    margin: ${space[2]}px 0;
`;

export const ContributionsEpicButtons = ({
    buttonText,
    buttonUrl,
    remindMeButtonText,
    remindMeConfirmationText,
    remindMeConfirmationHeaderText,
}: ContributionsEpicButtonsProps): JSX.Element | null => {
    const [showRemindMeConfirmation, setShowRemindMeConfirmation] = useState<boolean>(false);

    if (showRemindMeConfirmation) {
        return (
            <>
                <Lines />
                {remindMeConfirmationHeaderText && (
                    <h4 css={successHeadingStyles}>{remindMeConfirmationHeaderText}</h4>
                )}
                <p css={successTextStyles}>{remindMeConfirmationText}</p>
            </>
        );
    }

    return (
        <div css={buttonWrapperStyles}>
            <PrimaryButton buttonText={buttonText} buttonUrl={buttonUrl} />

            {remindMeButtonText && remindMeConfirmationText && (
                <RemindMeButton
                    remindMeButtonText={remindMeButtonText}
                    onClick={() => setShowRemindMeConfirmation(true)}
                />
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
