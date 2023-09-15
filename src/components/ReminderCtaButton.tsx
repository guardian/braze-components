import React, { useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, brandAlt, news, body, space } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';

import {
    buildReminderFields,
    createReminder,
    ReminderStage,
    ReminderStatus,
} from '../logic/reminders';

import { FetchEmail } from '../types/dcrTypes';
import { TrackClick } from '../utils/tracking';
import { LoadingDots } from './CtaLoadingDotsAnimation';

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

const styles = {
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
    button: css`
        background-color: ${news[400]};
        color: ${neutral[100]};
        &:hover {
            background-color: ${news[400]};
        }
    `,
    thankYouText: css`
        ${body.medium({ fontWeight: 'bold' })};
        color: ${neutral[0]};
        margin-top: 12px;
    `,
    errorText: css`
        color: ${neutral[0]};
        margin-top: 12px;
    `,
    remindMeButtonOverrides: css`
        background-color: transparent !important;
        color: ${neutral[7]} !important;

        :hover {
            background-color: ${neutral[86]} !important;
        }
    `,
    smallPrint: css`
        margin-top: 8px;
    `,
};

interface RemindMeButtonProps {
    disabled: boolean;
    ctaText: string;
    onClick: () => void;
}

const RemindMeButton = ({ disabled, ctaText, onClick }: RemindMeButtonProps) => (
    <div css={styles.buttonMargins}>
        <ThemeProvider theme={contributionsTheme}>
            <Button
                disabled={disabled}
                onClick={() => onClick()}
                priority="tertiary"
                css={styles.remindMeButtonOverrides}
            >
                {ctaText}
            </Button>
        </ThemeProvider>
    </div>
);

interface SmallPrintProps {
    month: string;
}

const SmallPrint = ({ month }: SmallPrintProps) => (
    <div css={styles.smallPrint}>
        We will send you a maximum of two emails in {month}. To find out what personal data we
        collect and how we use it, view our{' '}
        <a href="https://manage.theguardian.com/email-prefs">Privacy Policy</a>.
    </div>
);

interface ReminderCtaButtonProps {
    reminderStage: ReminderStage;
    reminderOption?: string;
    internalButtonId: number;
    ophanComponentId: string;
    trackClick: TrackClick;
    fetchEmail: FetchEmail;
    isCodeEnvironment: boolean;
}

export const ReminderCtaButton = ({
    reminderStage,
    reminderOption,
    internalButtonId,
    ophanComponentId,
    trackClick,
    fetchEmail,
    isCodeEnvironment,
}: ReminderCtaButtonProps): JSX.Element => {
    const { reminderCta, reminderPeriod, reminderLabel } = buildReminderFields();
    const [remindState, setRemindState] = useState<ReminderStatus>('DEFAULT');

    const onClick = () => {
        trackClick({ internalButtonId, ophanComponentId });

        setRemindState('IN_PROGRESS');

        fetchEmail()
            .then((email) => {
                if (email) {
                    return createReminder(
                        {
                            reminderPeriod,
                            email,
                            reminderPlatform: 'WEB',
                            reminderComponent: 'EPIC',
                            reminderStage,
                            reminderOption,
                        },
                        isCodeEnvironment,
                    );
                } else {
                    return Promise.reject();
                }
            })
            .then(() => setRemindState('SUCCESS'))
            .catch(() => setRemindState('FAILURE'));
    };

    switch (remindState) {
        case 'DEFAULT':
            return (
                <div css={styles.buttonWrapperStyles}>
                    <RemindMeButton onClick={onClick} disabled={false} ctaText={reminderCta} />
                    <SmallPrint month={reminderLabel} />
                </div>
            );
        case 'FAILURE':
            return (
                <div css={styles.buttonWrapperStyles}>
                    <RemindMeButton onClick={onClick} disabled={false} ctaText={reminderCta} />
                    <div css={styles.errorText}>
                        There was an error creating the reminder. Please try again.
                    </div>
                </div>
            );
        case 'IN_PROGRESS':
            return (
                <div css={styles.buttonWrapperStyles}>
                    <div css={styles.thankYouText}>
                        <LoadingDots></LoadingDots>
                    </div>
                </div>
            );

        case 'SUCCESS':
            return (
                <div css={styles.buttonWrapperStyles}>
                    <div css={styles.thankYouText}>Thank you! Your reminder is set.</div>
                </div>
            );
    }
};
