import React, { useState } from 'react';
import { css, SerializedStyles, ThemeProvider } from '@emotion/react';
import { Button, buttonThemeBrandAlt, Link } from '@guardian/source-react-components';
import type { TrackClick } from '../utils/tracking';
import { LoadingDots } from '../components/CtaLoadingDotsAnimation';
import type { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { InteractiveButtonStatus } from '../logic/types';

import { neutral, body } from '@guardian/source-foundations';
import { NewsletterButtonColorStyles } from '../styles/colorData';

export const defaultNewsletterCtaButtonColors: NewsletterButtonColorStyles = {
    styleNewsletterButton: '#ffffff',
    styleNewsletterButtonBackground: '#c70000',
    styleNewsletterButtonHover: '#c70000',
    styleReminderAnimation: '#707070',
};

const getButtonStyles = (styles: NewsletterButtonColorStyles) => {
    return {
        button: css`
            background-color: ${styles.styleNewsletterButtonBackground} !important;
            color: ${styles.styleNewsletterButton} !important;
            &:hover {
                background-color: ${styles.styleNewsletterButtonHover} !important;
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
        newslettersLinkPeriod: css`
            color: ${neutral[0]};
        `,
    };
};

type SignUpButtonProps = {
    buttonStyles: Record<string, SerializedStyles>;
    ctaText: string;
    onClick: () => void;
};

const SignUpButton = ({ buttonStyles, ctaText, onClick }: SignUpButtonProps) => (
    <ThemeProvider theme={buttonThemeBrandAlt}>
        <Button css={buttonStyles.button} onClick={onClick}>
            {ctaText}
        </Button>
    </ThemeProvider>
);

interface NewsletterCtaButtonProps {
    subscribeToNewsletter: NewsletterSubscribeCallback;
    newsletterId: string;
    ophanComponentId?: string;
    trackClick: TrackClick;
    colors?: NewsletterButtonColorStyles;
    reminderCta: string;
}

export const NewsletterCtaButton: React.FC<NewsletterCtaButtonProps> = (props: NewsletterCtaButtonProps) => {
    const {
        subscribeToNewsletter,
        newsletterId,
        ophanComponentId,
        trackClick,
        colors = defaultNewsletterCtaButtonColors,
        reminderCta,
    } = props;
    const styles = getButtonStyles(colors);

    const [subscribeClickStatus, setSubscribeClickStatus] =
        useState<InteractiveButtonStatus>('DEFAULT');

    const onSignUpClick = () => {
        setSubscribeClickStatus('IN_PROGRESS');

        const internalButtonId = 0;
        trackClick({
            internalButtonId,
            ophanComponentId: ophanComponentId as string,
        });

        subscribeToNewsletter(newsletterId as string)
            .then(() => setSubscribeClickStatus('SUCCESS'))
            .catch(() => {
                setSubscribeClickStatus('FAILURE');
            });
    };

    switch (subscribeClickStatus) {
        case 'DEFAULT':
            return <SignUpButton
                buttonStyles={styles}
                onClick={onSignUpClick}
                ctaText={reminderCta}
            />
        case 'FAILURE':
            return (
                <>
                    <div css={styles.errorText}>
                        There was an error signing up to the newsletter. Please try again
                    </div>
                    <SignUpButton
                        buttonStyles={styles}
                        onClick={onSignUpClick}
                        ctaText={reminderCta}
                    />
                </>
            );

        case 'IN_PROGRESS':
            return <LoadingDots styleReminderAnimation={colors.styleReminderAnimation} />

        case 'SUCCESS':
            return (
                <>
                    <div css={styles.thankYouText}>Thank you.</div>
                    <div>
                        <Link href="https://manage.theguardian.com/email-prefs" priority="primary">
                            Manage my newsletters
                        </Link>
                        <span css={styles.newslettersLinkPeriod}>.</span>
                    </div>
                </>
            );
    }
};
