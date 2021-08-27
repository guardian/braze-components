import { css, ThemeProvider } from '@emotion/react';
import React from 'react';
import { brand, palette, space } from '@guardian/src-foundations';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { body, headline } from '@guardian/src-foundations/typography';
import { COMPONENT_NAME, canRender, parseParagraphs } from './canRender';
export { COMPONENT_NAME };
import { replaceNonArticleCountPlaceholders } from './placeholders';
import { from, breakpoints } from '@guardian/src-foundations/mq';

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
    `,
    epicContainer: css`
        padding: ${space[1]}px ${space[2]}px ${space[3]}px;
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

const imageStyles = {
    picture: css`
        width: 100%;
        height: 100%;
        display: flex;
    `,
    container: css`
        display: none;

        ${from.tablet} {
            display: block;
            margin: -${space[1]}px -${space[2]}px ${space[1]}px;
        }
    `,
    image: css`
        height: auto;
        width: 100%;
        object-fit: cover;
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
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
    countryCode?: string;
    headerImageUrl?: string;
};

type HeaderImageProps = {
    imageUrl?: string;
};

const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

// We use a picture element here with an empty image for < tablet so that we
// don't load an image unnecessarily when we're not going to render it (which would be
// the case with an img tag)
const HeaderImage: React.FC<HeaderImageProps> = ({ imageUrl }: HeaderImageProps) => {
    if (imageUrl) {
        return (
            <div css={imageStyles.container}>
                <picture css={imageStyles.picture}>
                    <source
                        srcSet={emptyImage}
                        media={`(max-width: ${breakpoints.tablet - 1}px)`}
                    />
                    <source srcSet={imageUrl} media={`(min-width: ${breakpoints.tablet}px)`} />
                    <img css={imageStyles.image} src={imageUrl} alt="" />
                </picture>
            </div>
        );
    }

    return null;
};

export const Epic: React.FC<EpicProps> = (props: EpicProps) => {
    const {
        brazeMessageProps: { heading, buttonText, buttonUrl, highlightedText },
        countryCode,
        headerImageUrl,
    } = props;

    if (!canRender(props.brazeMessageProps)) {
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
                    <HeaderImage imageUrl={headerImageUrl} />

                    <span css={styles.heading}>{heading}</span>
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
                    <ContributionsEpicButtons
                        buttonText={buttonText as string}
                        buttonUrl={buttonUrl as string}
                    ></ContributionsEpicButtons>
                </section>
            </div>
        </ThemeProvider>
    );
};
