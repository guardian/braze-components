import { css, Interpolation, ThemeProvider } from '@emotion/react';
import React, { useState, ReactElement } from 'react';
import { brand, palette, space } from '@guardian/src-foundations';
import { Button, buttonBrandAlt } from '@guardian/src-button';
import { COMPONENT_NAME } from './canRender';
import { body, headline, textSans } from '@guardian/src-foundations/typography';
import { canRender } from './canRender';
import { from, until } from '@guardian/src-foundations/mq';
import { LoadingDots } from './LoadingDots';
import { Theme } from '@guardian/types';

// Once https://github.com/guardian/source/pull/843 is merged and in a
// @guardian/src-icons release we'll be able to bump the version on this project
// and replace this with:
// import { SvgClock } from '@guardian/src-icons'
export const SvgClock = (): ReactElement => {
    return (
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 15c0 6.075-4.925 11-11 11S4 21.075 4 15 8.925 4 15 4s11 4.925 11 11zm-9.8-.35L15.475 6H14.5l-.75 9.375 1.275 1.275L22 16v-1l-5.8-.35z"
            />
        </svg>
    );
};

const styles = {
    epicContainer: css`
        padding: 4px 8px 12px;
        border-top: 1px solid ${palette.news[400]};
        background-color: ${palette.neutral[97]};
        display: flex;
        flex-direction: row;
        max-width: 620px;
    `,
    rightSection: css`
        padding-left: 12px;
    `,
    frequencySection: css`
        padding: 4px;
    `,
    frequencyClock: css`
        position: relative;
        top: 2px;
        margin-right: 4px;

        svg {
            fill: #999999;
            height: 16px;
            width: 16px;
        }
    `,
    frequencyText: css`
        color: ${palette.neutral[20]};
        ${textSans.medium()}
        margin-left: 4px;
    `,
    image: css`
        width: 196px;

        ${until.desktop} {
            width: 96px;
        }
    `,
    heading: css`
        ${headline.small({ fontWeight: 'bold' })};
        margin: 0;
        max-width: 100%;

        ${from.mobileLandscape} {
            ${headline.small({ fontWeight: 'bold' })};
        }

        ${from.tablet} {
            max-width: 100%;
        }
    `,
    paragraph: css`
        ${body.medium()}
        line-height: 135%;
        margin: ${space[5]}px 0 ${space[5]}px;
        max-width: 100%;
        color: ${palette.neutral[0]};

        ${from.phablet} {
            max-width: 90%;
        }

        ${from.tablet} {
            max-width: 100%;
        }

        ${from.desktop} {
            margin: ${space[3]}px 0 ${space[4]}px;
            max-width: 42rem;
        }

        ${from.leftCol} {
            max-width: 37rem;
        }

        ${from.wide} {
            max-width: 42rem;
        }
    `,
};

export type NewsletterSubscribeCallback = (id: string) => Promise<void>;

export type BrazeMessageProps = {
    header?: string;
    frequency?: string;
    paragraph1?: string;
    paragraph2?: string;
    imageUrl?: string;
    newsletterId?: string;
    ophanComponentId?: string;
    headingColor?: string;
};

export type Props = {
    brazeMessageProps: BrazeMessageProps;
    subscribeToNewsletter: NewsletterSubscribeCallback;
};

type CTAProps = {
    subscribeToNewsletter: NewsletterSubscribeCallback;
    newsletterId: string;
};

type SubscribeClickStatus = 'DEFAULT' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';

const ctaStyles = {
    button: css`
        background-color: ${palette.news[400]};
        color: ${palette.neutral[100]};
        &:hover {
            background-color: ${palette.news[400]};
        }
    `,
    thankYouText: css`
        ${body.medium({ fontWeight: 'bold' })};
        color: ${palette.neutral[0]};
    `,
    errorText: css`
        ${body.medium({ fontWeight: 'bold' })};
        color: ${palette.neutral[0]};
        margin-bottom: 16px;
    `,
    newslettersLink: css`
        ${body.medium()}
        border-bottom: 1px solid ${palette.neutral[60]};
        color: ${palette.news[400]};
        padding-bottom: 2px;
        text-decoration: none;
    `,
    newslettersLinkPeriod: css`
        color: ${palette.neutral[0]};
    `,
};

type SignUpButtonProps = { onSignUpClick: () => void };

const SignUpButton: React.FC<SignUpButtonProps> = (props: SignUpButtonProps) => {
    return (
        <ThemeProvider theme={buttonBrandAlt}>
            <Button css={ctaStyles.button} onClick={props.onSignUpClick}>
                Sign up
            </Button>
        </ThemeProvider>
    );
};

const CTA: React.FC<CTAProps> = (props: CTAProps) => {
    const { subscribeToNewsletter, newsletterId } = props;

    const [subscribeClickStatus, setSubscribeClickStatus] =
        useState<SubscribeClickStatus>('DEFAULT');

    const onSignUpClick = () => {
        setSubscribeClickStatus('IN_PROGRESS');

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

export const NewsletterEpic: React.FC<Props> = (props: Props) => {
    const {
        brazeMessageProps: { header, frequency, paragraph1, paragraph2, imageUrl, newsletterId },
        subscribeToNewsletter,
    } = props;

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    return (
        <ThemeProvider theme={brand}>
            <section css={styles.epicContainer}>
                <div>
                    <img css={styles.image} src={imageUrl}></img>
                </div>
                <div css={styles.rightSection}>
                    <span
                        css={styles.heading}
                        style={{ color: props.brazeMessageProps.headingColor }}
                    >
                        {header}
                    </span>
                    <div css={styles.frequencySection}>
                        <span css={styles.frequencyClock}>
                            <SvgClock />
                        </span>
                        <span css={styles.frequencyText}>{frequency}</span>
                    </div>
                    <p css={styles.paragraph}>{paragraph1}</p>
                    {paragraph2 ? <p css={styles.paragraph}>{paragraph2}</p> : null}
                    <CTA
                        subscribeToNewsletter={subscribeToNewsletter}
                        newsletterId={newsletterId as string}
                    />
                </div>
            </section>
        </ThemeProvider>
    );
};

export { COMPONENT_NAME };
