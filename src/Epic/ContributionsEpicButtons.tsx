import React, { useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, brandAlt, space } from '@guardian/source-foundations';
import { Button, LinkButton, SvgArrowRightStraight } from '@guardian/source-react-components';

import { RemindMeConfirmation } from './RemindMeConfirmation';

const PRIMARY_BUTTON_INTERNAL_ID = 0;
const REMIND_ME_BUTTON_INTERNAL_ID = 1;

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
    border: 1px solid ${neutral[7]} !important;
    background-color: transparent !important;
    color: ${neutral[7]} !important;

    :hover {
        background-color: ${neutral[86]} !important;
    }
`;

interface PrimaryButtonProps {
    buttonText: string;
    buttonUrl: string;
    trackClick: (buttonId: number) => void;
}

const PrimaryButton = ({ buttonUrl, buttonText, trackClick }: PrimaryButtonProps) => (
    <div css={buttonMargins}>
        <ThemeProvider theme={contributionsTheme}>
            <LinkButton
                href={buttonUrl}
                icon={<SvgArrowRightStraight />}
                iconSide="right"
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

interface RemindMeButtonProps {
    remindMeButtonText: string;
    onClick: () => void;
}

const RemindMeButton = ({ remindMeButtonText, onClick }: RemindMeButtonProps) => (
    <div css={buttonMargins}>
        <ThemeProvider theme={contributionsTheme}>
            <Button onClick={() => onClick()} priority="tertiary" css={remindMeButtonOverrides}>
                {remindMeButtonText}
            </Button>
        </ThemeProvider>
    </div>
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
    trackClick: (buttonId: number) => void;
}
type SectionState = 'DEFAULT' | 'REMINDER_CONFIRMED' | 'REMINDER_CONFIRMATION_CLOSED';

export const ContributionsEpicButtons = ({
    buttonText,
    buttonUrl,
    remindMeButtonText,
    remindMeConfirmationText,
    remindMeConfirmationHeaderText,
    trackClick,
}: ContributionsEpicButtonsProps): JSX.Element => {
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
                <PrimaryButton
                    buttonText={buttonText}
                    buttonUrl={buttonUrl}
                    trackClick={trackClick}
                />

                <PaymentIcons />
            </div>
        );
    }

    return (
        <div css={buttonWrapperStyles}>
            <PrimaryButton buttonText={buttonText} buttonUrl={buttonUrl} trackClick={trackClick} />

            {remindMeButtonText && remindMeConfirmationText && (
                <RemindMeButton
                    remindMeButtonText={remindMeButtonText}
                    onClick={() => {
                        trackClick(REMIND_ME_BUTTON_INTERNAL_ID);
                        setSectionState('REMINDER_CONFIRMED');
                    }}
                />
            )}

            <PaymentIcons />
        </div>
    );
};
