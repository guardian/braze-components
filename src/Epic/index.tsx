import { css, ThemeProvider } from '@emotion/react';
import React from 'react';
import {
    brand,
    news,
    brandAlt,
    space,
    textEgyptian17,
    textEgyptianBold17,
    headlineBold20,
} from '@guardian/source/foundations';
import { PrimaryCtaButton } from '../components/PrimaryCtaButton';
import { ReminderCtaButton } from '../components/ReminderCtaButton';
import { COMPONENT_NAME, canRender, parseParagraphs } from './canRender';
export { COMPONENT_NAME };
import { replaceNonArticleCountPlaceholders } from './placeholders';
import { TrackClick } from '../utils/tracking';
import { FetchEmail } from '../types/dcrTypes';
import { ReminderStage } from '../logic/reminders';
import { ReminderButtonColorStyles, PrimaryButtonColorStyles } from '../styles/colorData';
import { HeaderSection } from './HeaderSection';

// Custom styles for <a> tags in the Epic content
const linkStyles = css`
    a {
        color: ${news[400]};
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`;

const styles = {
    epicWrapper: css`
        max-width: 620px;
    `,
    epicContainer: css`
        padding: ${space[1]}px ${space[2]}px ${space[3]}px;
        border-top: 1px solid #ffe500;
        background-color: #f6f6f6;
        display: flex;
        flex-direction: column;
        ${textEgyptian17};
        line-height: 1.4;

        b,
        strong {
            font-weight: bold;
        }
    `,
    paragraph: css`
        margin-top: 0;
        margin-bottom: ${space[2]}px;
        ${linkStyles}
    `,
    heading: css`
        ${headlineBold20};
        margin-top: 0;
        margin-bottom: ${space[3]}px;
    `,
    highlightText: css`
        ${textEgyptianBold17};
        ${linkStyles}
        padding: 2px;
        background-color: ${brandAlt[400]};
    `,
    buttonWrapperStyles: css`
        margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    `,
};

const defaultReminderCtaColors: ReminderButtonColorStyles = {
    styleReminderButton: '#121212',
    styleReminderButtonBackground: '#ededed',
    styleReminderButtonHover: '#dcdcdc',
    styleReminderAnimation: '#707070',
};

const defaultPrimaryCtaColors: PrimaryButtonColorStyles = {
    styleButton: '#121212',
    styleButtonBackground: '#ffe500',
    styleButtonHover: '#ffd213',
};

export type BrazeMessageProps = {
    buttonText?: string;
    buttonUrl?: string;
    heading?: string;
    highlightedText?: string;
    ophanComponentId?: string;
    paragraph1?: string;
    paragraph2?: string;
    paragraph3?: string;
    paragraph4?: string;
    paragraph5?: string;
    paragraph6?: string;
    paragraph7?: string;
    paragraph8?: string;
    paragraph9?: string;
    reminderStage?: ReminderStage;
    reminderOption?: string;
    showPrivacyText?: string;
    hidePaymentIcons?: string;
    authoredEpicHeader?: string;
    authoredEpicImageUrl?: string;
    authoredEpicImageAltText?: string;
    authoredEpicBylineName?: string;
    authoredEpicBylineCopy1?: string;
    authoredEpicBylineCopy2?: string;
};

export type EpicProps = {
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
    countryCode?: string;
    trackClick: TrackClick;
    fetchEmail: FetchEmail;
};

export const Epic: React.FC<EpicProps> = (props: EpicProps) => {
    const {
        brazeMessageProps: {
            heading,
            buttonText,
            buttonUrl,
            highlightedText,
            reminderStage,
            reminderOption,
            ophanComponentId,
            hidePaymentIcons,
            authoredEpicHeader,
            authoredEpicImageUrl,
            authoredEpicImageAltText,
            authoredEpicBylineName,
            authoredEpicBylineCopy1,
            authoredEpicBylineCopy2,
            showPrivacyText = 'true',
        },
        countryCode,
        trackClick,
        fetchEmail,
    } = props;

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    const paragraphs = parseParagraphs(props.brazeMessageProps).map((paragraph) =>
        replaceNonArticleCountPlaceholders(paragraph, countryCode),
    );

    const highlightTextClean = replaceNonArticleCountPlaceholders(highlightedText, countryCode);

    const showPrivacyTextBoolean = showPrivacyText === 'true';

    return (
        <ThemeProvider theme={brand}>
            <div css={styles.epicWrapper}>
                <section css={styles.epicContainer}>
                    {authoredEpicImageUrl != null &&
                        authoredEpicImageAltText != null &&
                        authoredEpicBylineName != null && (
                            <HeaderSection
                                authoredEpicImageUrl={authoredEpicImageUrl}
                                authoredEpicImageAltText={authoredEpicImageAltText}
                                authoredEpicHeader={authoredEpicHeader}
                                authoredEpicBylineName={authoredEpicBylineName}
                                authoredEpicBylineCopy1={authoredEpicBylineCopy1}
                                authoredEpicBylineCopy2={authoredEpicBylineCopy2}
                            />
                        )}

                    <div css={styles.heading}>{heading}</div>
                    {paragraphs.map((text, index) => (
                        <p key={'paragraph' + index} css={styles.paragraph}>
                            <span dangerouslySetInnerHTML={{ __html: text }} />
                            {highlightTextClean.length > 0 && index === paragraphs.length - 1 ? (
                                <span
                                    css={styles.highlightText}
                                    dangerouslySetInnerHTML={{ __html: highlightTextClean }}
                                />
                            ) : null}
                        </p>
                    ))}
                    {/* buttonText and buttonUrl will have been checked for not undefined in canRenderEpic */}
                    <div css={styles.buttonWrapperStyles}>
                        <PrimaryCtaButton
                            buttonText={buttonText as string}
                            buttonUrl={buttonUrl as string}
                            showPaymentIcons={hidePaymentIcons !== 'true'}
                            ophanComponentId={ophanComponentId as string}
                            colors={defaultPrimaryCtaColors}
                            trackClick={trackClick}
                        />
                        {reminderStage && (
                            <ReminderCtaButton
                                reminderComponent="EPIC"
                                reminderStage={reminderStage}
                                reminderOption={reminderOption}
                                ophanComponentId={ophanComponentId as string}
                                trackClick={trackClick}
                                fetchEmail={fetchEmail}
                                colors={defaultReminderCtaColors}
                                showPrivacyText={showPrivacyTextBoolean}
                            />
                        )}
                    </div>
                </section>
            </div>
        </ThemeProvider>
    );
};
