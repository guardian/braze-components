import React, { useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { neutral, brandAlt, news, body, space } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';

import {
    buildReminderFields,
    createReminder,
    ReminderComponent,
    ReminderStage,
    ReminderStatus,
} from '../logic/reminders';

import { FetchEmail } from '../types/dcrTypes';
import { TrackClick } from '../utils/tracking';
import { buildLoadingDots } from './CtaLoadingDotsAnimation';

// Custom theme for Button/LinkButton
const buttonStyles = {
    textPrimary: neutral[7], //#121212
    backgroundPrimary: brandAlt[400], //#ffe500
    backgroundPrimaryHover: brandAlt[300], //#ffd900
    textSecondary: neutral[7], //#121212
    backgroundSecondary: neutral[93], //#ededed
    backgroundSecondaryHover: neutral[86], //#dcdcdc
    borderSecondary: neutral[86], //#dcdcdc
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
        background-color: ${news[400]}; /* #c70000 */
        color: ${neutral[100]}; /* #ffffff */
        &:hover {
            background-color: ${news[400]}; /* #c70000 */
        }
    `,
    thankYouText: css`
        ${body.medium({ fontWeight: 'bold' })};
        color: ${neutral[0]}; /* #000000 */
        margin-top: 12px;
    `,
    errorText: css`
        color: ${neutral[0]}; /* #000000 */
        margin-top: 12px;
    `,
    remindMeButtonOverrides: css`
        background-color: transparent !important;
        color: ${neutral[7]} !important; /* #121212 */

        :hover {
            background-color: ${neutral[86]} !important; /* #dcdcdc */
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
    reminderComponent: ReminderComponent;
    reminderStage: ReminderStage;
    reminderOption?: string;
    internalButtonId: number;
    ophanComponentId: string;
    trackClick: TrackClick;
    fetchEmail: FetchEmail;
}

export const ReminderCtaButton = ({
    reminderComponent,
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
                        reminderComponent,
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
                        {buildLoadingDots()}
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
