import React, { useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, brandAlt, space } from '@guardian/source-foundations';
import { Button, LinkButton, SvgArrowRightStraight } from '@guardian/source-react-components';

import { RemindMeConfirmation } from './RemindMeConfirmation';

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

const PaymentIcons = () => (
    <img
        width={422}
        height={60}
        src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
        alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
        css={paymentImageStyles}
    />
);

interface ContributionsEpicButtonsProps {
    buttonText: string;
    buttonUrl: string;
    remindMeButtonText?: string;
    remindMeConfirmationText?: string;
    remindMeConfirmationHeaderText?: string;
}
type SectionState = 'DEFAULT' | 'REMINDER_CONFIRMED' | 'REMINDER_CONFIRMATION_CLOSED';

export const ContributionsEpicButtons = ({
    buttonText,
    buttonUrl,
    remindMeButtonText,
    remindMeConfirmationText,
    remindMeConfirmationHeaderText,
}: ContributionsEpicButtonsProps): JSX.Element | null => {
    const [sectionState, setSectionState] = useState<SectionState>('DEFAULT');

    if (sectionState === 'REMINDER_CONFIRMED') {
        return (
            <RemindMeConfirmation
                remindMeConfirmationText={remindMeConfirmationText as string}
                remindMeConfirmationHeaderText={remindMeConfirmationHeaderText as string}
                onClose={() => setSectionState('REMINDER_CONFIRMATION_CLOSED')}
            />
        );
    }

    if (sectionState === 'REMINDER_CONFIRMATION_CLOSED') {
        return (
            <div css={buttonWrapperStyles}>
                <PrimaryButton buttonText={buttonText} buttonUrl={buttonUrl} />

                <PaymentIcons />
            </div>
        );
    }

    return (
        <div css={buttonWrapperStyles}>
            <PrimaryButton buttonText={buttonText} buttonUrl={buttonUrl} />

            {remindMeButtonText && remindMeConfirmationText && (
                <RemindMeButton
                    remindMeButtonText={remindMeButtonText}
                    onClick={() => setSectionState('REMINDER_CONFIRMED')}
                />
            )}

            <PaymentIcons />
        </div>
    );
};
