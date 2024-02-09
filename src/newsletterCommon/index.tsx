import React, { useState } from 'react';
import { css, ThemeProvider } from '@emotion/react';
import { Button, buttonThemeBrandAlt, Link } from '@guardian/source-react-components';
import type { TrackClick } from '../utils/tracking';
import { LoadingDots } from '../components/CtaLoadingDotsAnimation';
import type { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { InteractiveButtonStatus } from '../logic/types';

import { news, neutral, body } from '@guardian/source-foundations';

// Newsletter CTA button
// -------------------------------------------------------
const ctaStyles = {
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
    newslettersLinkPeriod: css`
        color: ${neutral[0]};
    `,
};

type SignUpButtonProps = { onSignUpClick: () => void };

const SignUpButton: React.FC<SignUpButtonProps> = (props: SignUpButtonProps) => {
    return (
        <ThemeProvider theme={buttonThemeBrandAlt}>
            <Button css={ctaStyles.button} onClick={props.onSignUpClick}>
                Sign up
            </Button>
        </ThemeProvider>
    );
};

type CTAProps = {
    subscribeToNewsletter: NewsletterSubscribeCallback;
    newsletterId: string;
    ophanComponentId?: string;
    trackClick: TrackClick;
};

export const CTA: React.FC<CTAProps> = (props: CTAProps) => {
    const { subscribeToNewsletter, newsletterId, ophanComponentId, trackClick } = props;

    const [subscribeClickStatus, setSubscribeClickStatus] =
        useState<InteractiveButtonStatus>('DEFAULT');

    const onSignUpClick = () => {
        setSubscribeClickStatus('IN_PROGRESS');

        const internalButtonId = 0;
        trackClick({
            internalButtonId,
            // We'll have already confirmed this is truthy in the canRender
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
            return <SignUpButton onSignUpClick={onSignUpClick} />;

        case 'FAILURE':
            return (
                <>
                    <div css={ctaStyles.errorText}>
                        There was an error signing up to the newsletter. Please try again
                    </div>
                    <SignUpButton onSignUpClick={onSignUpClick}></SignUpButton>
                </>
            );

        case 'IN_PROGRESS':
            return <LoadingDots styleReminderAnimation="#707070" />;

        case 'SUCCESS':
            return (
                <>
                    <div css={ctaStyles.thankYouText}>Thank you.</div>
                    <div>
                        <Link href="https://manage.theguardian.com/email-prefs" priority="primary">
                            Manage my newsletters
                        </Link>
                        <span css={ctaStyles.newslettersLinkPeriod}>.</span>
                    </div>
                </>
            );
    }
};
