import React, { useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, brandAlt, news, body, space } from '@guardian/source-foundations';
import { Button, Link } from '@guardian/source-react-components';

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
        flex-wrap: wrap;
        align-items: center;
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
    `,
    errorText: css`
        ${body.medium({ fontWeight: 'bold' })};
        color: ${neutral[0]};
        margin-bottom: 16px;
    `,
    remindMeButtonOverrides: css`
        border: 1px solid ${neutral[7]} !important;
        background-color: transparent !important;
        color: ${neutral[7]} !important;

        :hover {
            background-color: ${neutral[86]} !important;
        }
    `,
    smallPrint: css``,
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
        <Link href="https://manage.theguardian.com/email-prefs">Privacy Policy</Link>.
    </div>
);

interface ReminderCtaButtonProps {
    reminderStage: ReminderStage;
    reminderOption?: string;
    internalButtonId: number;
    ophanComponentId: string;
    trackClick: TrackClick;
    fetchEmail: FetchEmail;
}

export const ReminderCtaButton = ({
    reminderStage,
    reminderOption,
    internalButtonId,
    ophanComponentId,
    trackClick,
    fetchEmail,
}: ReminderCtaButtonProps): JSX.Element => {
    const { reminderCta, reminderPeriod, reminderLabel } = buildReminderFields();
    const [remindState, setRemindState] = useState<ReminderStatus>('DEFAULT');

    const onClick = () => {
        trackClick({ internalButtonId, ophanComponentId });

        setRemindState('IN_PROGRESS');

        fetchEmail()
            .then((email) => {
                if (email) {
                    return createReminder({
                        reminderPeriod,
                        email,
                        reminderPlatform: 'WEB',
                        reminderComponent: 'EPIC',
                        reminderStage,
                        reminderOption,
                    });
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
                <>
                    <RemindMeButton onClick={onClick} disabled={false} ctaText={reminderCta} />
                    <SmallPrint month={reminderLabel} />
                </>
            );
        case 'FAILURE':
            return (
                <>
                    <div css={styles.errorText}>
                        There was an error creating the reminder. Please try again.
                    </div>
                    <RemindMeButton onClick={onClick} disabled={false} ctaText={reminderCta} />
                    <SmallPrint month={reminderLabel} />
                </>
            );
        case 'IN_PROGRESS':
            return <LoadingDots></LoadingDots>;
        case 'SUCCESS':
            return (
                <>
                    <div css={styles.thankYouText}>Thank you! Your reminder is set.</div>
                    <div css={styles.smallPrint}>
                        You can manage your email preferences in the{' '}
                        <Link href="https://manage.theguardian.com/email-prefs" priority="primary">
                            My Account
                        </Link>{' '}
                        area, emails and marketing section.
                    </div>
                </>
            );
    }
};
