import React, { useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { brandAlt, neutral, space } from '@guardian/source-foundations';
import { Button, LinkButton, SvgArrowRightStraight } from '@guardian/source-react-components';
import { PaymentIcons } from './PaymentIcons';

import { ReminderCtaConfirmation } from './ReminderCtaConfirmation';
import {
    buildReminderFields,
    createReminder,
    ReminderStage,
    ReminderStatus,
} from '../logic/reminders';

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
    :not([disabled]) {
        border: 1px solid ${neutral[7]} !important;
        background-color: transparent !important;
        color: ${neutral[7]} !important;
        :hover {
            background-color: ${neutral[86]} !important;
        }
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
    disabled: boolean;
    remindMeButtonText: string;
    onClick: () => void;
}

const RemindMeButton = ({ disabled, remindMeButtonText, onClick }: RemindMeButtonProps) => (
    <div css={buttonMargins}>
        <ThemeProvider theme={contributionsTheme}>
            <Button
                disabled={disabled}
                onClick={() => onClick()}
                priority="tertiary"
                css={remindMeButtonOverrides}
            >
                {remindMeButtonText}
            </Button>
        </ThemeProvider>
    </div>
);

interface ContributionButtonWithReminderProps {
    buttonText: string;
    buttonUrl: string;
    reminderStage?: ReminderStage;
    reminderOption?: string;
    trackClick: (buttonId: number) => void;
    hidePaymentIcons?: string;
}

export const ContributionButtonWithReminder = ({
    buttonText,
    buttonUrl,
    reminderStage,
    reminderOption,
    trackClick,
    hidePaymentIcons,
}: ContributionButtonWithReminderProps): JSX.Element => {
    const { reminderCta, reminderPeriod, reminderLabel } = buildReminderFields();
    const [reminderStatus, setReminderStatus] = useState<ReminderStatus>(ReminderStatus.Editing);
    const [reminderConfirmationOpen, setReminderConfirmationOpen] = useState(false);
    const showPaymentIcons = hidePaymentIcons !== 'true';

    if (reminderConfirmationOpen) {
        // Show instead of the ctas
        return (
            <ReminderCtaConfirmation
                success={reminderStatus === ReminderStatus.Completed}
                label={reminderLabel}
                onClose={() => setReminderConfirmationOpen(false)}
            />
        );
    }

    return (
        <div css={buttonWrapperStyles}>
            <PrimaryButton buttonText={buttonText} buttonUrl={buttonUrl} trackClick={trackClick} />

            {reminderStage && !reminderConfirmationOpen && (
                <RemindMeButton
                    disabled={reminderStatus !== ReminderStatus.Editing}
                    remindMeButtonText={reminderCta}
                    onClick={() => {
                        trackClick(REMIND_ME_BUTTON_INTERNAL_ID);

                        setReminderStatus(ReminderStatus.Submitting);

                        createReminder({
                            reminderPeriod,
                            email: 'TODO',
                            reminderPlatform: 'WEB',
                            reminderComponent: 'EPIC',
                            reminderStage,
                            reminderOption,
                        })
                            .then(() => setReminderStatus(ReminderStatus.Completed))
                            .catch(() => setReminderStatus(ReminderStatus.Error))
                            .finally(() => setReminderConfirmationOpen(true));
                    }}
                />
            )}

            {showPaymentIcons && <PaymentIcons />}
        </div>
    );
};
