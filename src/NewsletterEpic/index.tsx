import { css, ThemeProvider } from '@emotion/react';
import React, { useState, ReactElement } from 'react';
import { brand, palette } from '@guardian/src-foundations';
import { Button, buttonBrandAlt } from '@guardian/src-button';
import { styles as commonStyles } from '../styles/bannerCommon';
import { COMPONENT_NAME } from './canRender';
import { body, textSans } from '@guardian/src-foundations/typography';
import { canRender } from './canRender';
import { OphanComponentEvent } from '@guardian/types';
import { BrazeClickHandler } from '../utils/tracking';
import { until } from '@guardian/src-foundations/mq';

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
        color: #333333;
        ${textSans.medium()}
        margin-left: 4px;
    `,
    image: css`
        width: 196px;

        ${until.desktop} {
            width: 96px;
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
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
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
        ${body.medium({ fontWeight: 'bold' })}
        color: ${palette.neutral[0]}
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
const CTA: React.FC<CTAProps> = (props: CTAProps) => {
    const { subscribeToNewsletter, newsletterId } = props;

    const [subscribeClickStatus, setSubscribeClickStatus] = useState<SubscribeClickStatus>(
        'DEFAULT',
    );

    switch (subscribeClickStatus) {
        case 'DEFAULT':
        case 'FAILURE':
            return (
                <ThemeProvider theme={buttonBrandAlt}>
                    <Button
                        css={ctaStyles.button}
                        onClick={() => {
                            setSubscribeClickStatus('IN_PROGRESS');

                            subscribeToNewsletter(newsletterId as string)
                                .then(() => setSubscribeClickStatus('SUCCESS'))
                                .catch(() => setSubscribeClickStatus('FAILURE'));
                        }}
                    >
                        Sign up
                    </Button>
                </ThemeProvider>
            );
        case 'IN_PROGRESS':
            return (
                <ThemeProvider theme={buttonBrandAlt}>
                    <Button css={ctaStyles.button} disabled={true}>
                        Loading...
                    </Button>
                </ThemeProvider>
            );
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
                    <span css={commonStyles.heading}>{header}</span>
                    <div css={styles.frequencySection}>
                        <span css={styles.frequencyClock}>
                            <SvgClock />
                        </span>
                        <span css={styles.frequencyText}>{frequency}</span>
                    </div>
                    <p css={commonStyles.paragraph}>{paragraph1}</p>
                    {paragraph2 ? <p css={commonStyles.paragraph}>{paragraph2}</p> : null}
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
