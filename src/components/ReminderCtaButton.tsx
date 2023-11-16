import React, { useState } from 'react';
import { css, SerializedStyles, ThemeProvider } from '@emotion/react';
import { body, space } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';

import {
    buildReminderFields,
    createReminder,
    ReminderStage,
    ReminderComponent,
} from '../logic/reminders';
import type { InteractiveButtonStatus, ColorValueHex } from '../logic/types';

import { FetchEmail } from '../types/dcrTypes';
import { TrackClick } from '../utils/tracking';
import { LoadingDots } from './CtaLoadingDotsAnimation';
import { contributionsTheme, getColors, ReminderButtonColorStyles } from '../styles/colorData';

const defaultButtonColors: ReminderButtonColorStyles = {
    styleReminderButton: '#121212',
    styleReminderButtonBackground: '#f6f6f6;',
    styleReminderButtonHover: '#dcdcdc',
    styleReminderAnimation: '#707070',
};

const getButtonStyles = (
    userVals: Partial<ReminderButtonColorStyles>,
    defaults: ReminderButtonColorStyles,
) => {
    const styles = getColors(userVals, defaults);
    return {
        buttonWrapperStyles: css`
            margin: 0 ${space[2]}px ${space[1]}px 0;
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
        thankYouText: css`
            ${body.medium({ fontWeight: 'bold' })};
            margin-top: ${space[3]}px;
        `,
        remindMeButtonOverrides: css`
            background-color: ${styles.styleReminderButtonBackground} !important;
            color: ${styles.styleReminderButton} !important;

            :hover {
                background-color: ${styles.styleReminderButtonHover} !important;
            }
        `,
        smallPrint: css`
            margin-top: ${space[2]}px;
            ${body.small()};
        `,
    };
};

interface RemindMeButtonProps {
    buttonStyles: Record<string, SerializedStyles>;
    ctaText: string;
    onClick: () => void;
}

const RemindMeButton = ({ buttonStyles, ctaText, onClick }: RemindMeButtonProps) => (
    <div css={buttonStyles.buttonMargins}>
        <ThemeProvider theme={contributionsTheme}>
            <LinkButton
                onClick={() => onClick()}
                priority="tertiary"
                css={buttonStyles.remindMeButtonOverrides}
            >
                {ctaText}
            </LinkButton>
        </ThemeProvider>
    </div>
);

interface ReminderCtaButtonProps {
    reminderComponent: ReminderComponent;
    reminderStage: ReminderStage;
    reminderOption?: string;
    ophanComponentId: string;
    trackClick: TrackClick;
    fetchEmail: FetchEmail;
    userStyles: Partial<ReminderButtonColorStyles>;
    isBanner?: boolean;
}

export const ReminderCtaButton = ({
    reminderComponent,
    reminderStage,
    reminderOption,
    ophanComponentId,
    trackClick,
    fetchEmail,
    userStyles = {},
    isBanner,
}: ReminderCtaButtonProps): JSX.Element => {
    const { reminderCta, reminderPeriod, reminderLabel } = buildReminderFields();
    const [remindState, setRemindState] = useState<InteractiveButtonStatus>('DEFAULT');
    const internalButtonId = 1;
    const styles = getButtonStyles(userStyles, defaultButtonColors);

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
                    <RemindMeButton buttonStyles={styles} onClick={onClick} ctaText={reminderCta} />
                    {!isBanner && (
                        <div css={styles.smallPrint}>
                            We will send you a maximum of two emails in {reminderLabel}. To find out
                            what personal data we collect and how we use it, view our{' '}
                            <a href="https://manage.theguardian.com/email-prefs">Privacy Policy</a>.
                        </div>
                    )}
                </div>
            );
        case 'FAILURE':
            return (
                <div css={styles.buttonWrapperStyles}>
                    <RemindMeButton buttonStyles={styles} onClick={onClick} ctaText={reminderCta} />
                    <div css={styles.smallPrint}>
                        There was an error creating the reminder. Please try again.
                    </div>
                </div>
            );
        case 'IN_PROGRESS':
            return (
                <div css={styles.buttonWrapperStyles}>
                    <div css={styles.thankYouText}>
                        <LoadingDots
                            styleReminderAnimation={
                                userStyles.styleReminderAnimation as ColorValueHex
                            }
                        />
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
