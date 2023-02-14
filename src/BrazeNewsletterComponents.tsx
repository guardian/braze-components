import { css, ThemeProvider, keyframes } from '@emotion/react';
import React, { useState } from 'react';
import { Button, buttonThemeBrandAlt } from '@guardian/source-react-components';
import type { TrackClick } from './utils/tracking';

import {
    news,
    neutral,
    body,
} from '@guardian/source-foundations';

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
    newslettersLink: css`
        ${body.medium()}
        border-bottom: 1px solid ${neutral[60]};
        color: ${news[400]};
        padding-bottom: 2px;
        text-decoration: none;
    `,
    newslettersLinkPeriod: css`
        color: ${neutral[0]};
    `,
};

export type NewsletterSubscribeCallback = (id: string) => Promise<void>;

type SubscribeClickStatus = 'DEFAULT' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';

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
        useState<SubscribeClickStatus>('DEFAULT');

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
            return <LoadingDots></LoadingDots>;
        case 'SUCCESS':
            return (
                <>
                    <div css={ctaStyles.thankYouText}>Thank you.</div>
                    <div>
                        <a
                            href="https://www.theguardian.com/email-newsletters"
                            css={ctaStyles.newslettersLink}
                        >
                            View all newsletters<span css={ctaStyles.newslettersLinkPeriod}>.</span>
                        </a>
                    </div>
                </>
            );
    }
};

// Newsletter CTA dots animation
// -------------------------------------------------------
const loadingAnimKeyframes = keyframes`
    0% {
        transform: scale(1);
        filter: brightness(1);
    }
    15% {
        transform: scale(1.333);
        filter: brightness(0.7);
    }
    30% {
        transform: scale(1);
        filter: brightness(1);
    }
`;

const loadingAnimCss = css`
    circle {
        animation: ${loadingAnimKeyframes} 1.5s ease infinite;
    }

    #dot_1 {
        animation-delay: 0ms;
        transform-origin: 3px 3.5px;
    }

    #dot_2 {
        animation-delay: 400ms;
        transform-origin: 17.4px 3.5px;
    }

    #dot_3 {
        animation-delay: 800ms;
        transform-origin: 31.7px 3.5px;
    }
`;

const LoadingDots = (): React.ReactElement => {
    return (
        <svg
            width="50"
            height="17"
            viewBox="-5 -5 45 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            css={loadingAnimCss}
        >
            <g id="Dots step 1">
                <g id="Group 660">
                    <circle
                        id="dot_1"
                        opacity="0.5"
                        cx="3.0152"
                        cy="3.56641"
                        r="3"
                        fill="#707070"
                    />
                    <circle
                        id="dot_2"
                        opacity="0.5"
                        cx="17.3748"
                        cy="3.56641"
                        r="3"
                        fill="#707070"
                    />
                    <circle
                        id="dot_3"
                        opacity="0.5"
                        cx="31.7348"
                        cy="3.56641"
                        r="3"
                        fill="#707070"
                    />
                </g>
            </g>
        </svg>
    );
};
