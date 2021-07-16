import { css, ThemeProvider } from '@emotion/react';
import React from 'react';
import { brand, palette, space } from '@guardian/src-foundations';
import { OphanComponentEvent } from '@guardian/types';
import { BrazeClickHandler } from '../utils/tracking';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { body, headline } from '@guardian/src-foundations/typography';
import { replaceNonArticleCountPlaceholders } from './placeholders';
import { canRenderEpic, parseParagraphs } from './canRender';

// Custom styles for <a> tags in the Epic content
const linkStyles = css`
    a {
        color: ${palette.news[400]};
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`;

const styles = {
    epicWrapper: css`
        max-width: 620px;
        margin: 10px;
    `,
    epicContainer: css`
        padding: 4px 8px 12px;
        border-top: 1px solid #ffe500;
        background-color: #f6f6f6;
        display: flex;
        flex-direction: column;
    `,
    paragraph: css`
        margin: 0 auto ${space[2]}px;
        ${body.medium()}
        ${linkStyles}
    `,
    heading: css`
        ${headline.xxsmall({ fontWeight: 'bold' })}
        margin-top: 0;
        margin-bottom: ${space[3]}px;
    `,
    highlightText: css`
        ${body.medium({ fontWeight: 'bold' })}
        ${linkStyles}
        padding: 2px;
        background-color: ${palette.brandAlt[400]};
    `,
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
};

export type EpicProps = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
    countryCode?: string;
};

export const Epic: React.FC<EpicProps> = (props: EpicProps) => {
    const {
        // logButtonClickWithBraze,
        // submitComponentEvent,
        // ophanComponentId = COMPONENT_NAME,
        brazeMessageProps: { heading, buttonText, buttonUrl, highlightedText },
        countryCode,
    } = props;

    if (!canRenderEpic(props.brazeMessageProps)) {
        return null;
    }

    const paragraphs = parseParagraphs(props.brazeMessageProps).map((paragraph) =>
        replaceNonArticleCountPlaceholders(paragraph, countryCode),
    );

    const highlightTextClean = replaceNonArticleCountPlaceholders(highlightedText, countryCode);

    return (
        <ThemeProvider theme={brand}>
            <div css={styles.epicWrapper}>
                <section css={styles.epicContainer}>
                    <span css={styles.heading}>{heading}</span>
                    {paragraphs.map((text, index) => (
                        <p key={'paragraph' + index} css={styles.paragraph}>
                            {text}
                            {index === paragraphs.length - 1 ? (
                                <span css={styles.highlightText}>{highlightTextClean}</span>
                            ) : null}
                        </p>
                    ))}
                    {/* buttonText and buttonUrl will have been checked for not undefined in canRenderEpic */}
                    <ContributionsEpicButtons
                        buttonText={buttonText as string}
                        buttonUrl={buttonUrl as string}
                    ></ContributionsEpicButtons>
                </section>
            </div>
        </ThemeProvider>
    );
};