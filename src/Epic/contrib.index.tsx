import { css } from '@emotion/react';
import React, { useEffect } from 'react';

import { body, headline } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { HasBeenSeen, useHasBeenSeen } from './useHasBeenSeen';
import {
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
} from './placeholders';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';

export type OphanComponentEvent = {
    component: string;
    action: string;
    value?: string;
    id?: string;
    abTest?: {
        name: string;
        variant: string;
    };
};

export type EpicProps = {
    submitComponentEvent?: () => void;
    countryCode: string;
    brazeMessageProps: BrazeMessageProps;
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

type OphanComponentType = unknown;
export interface OphanTracking {
    componentType: OphanComponentType;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
}

const wrapperStyles = css`
    padding: ${space[1]}px ${space[2]}px ${space[3]}px;
    border-top: 1px solid ${palette.brandAlt[400]};
    background-color: ${palette.neutral[97]};
    * {
        ::selection {
            background: ${palette.brandAlt[400]};
        }
        ::-moz-selection {
            background: ${palette.brandAlt[400]};
        }
    }
    b {
        font-weight: bold;
    }
`;

const headingStyles = css`
    ${headline.xxsmall({ fontWeight: 'bold' })}
    margin-top: 0;
    margin-bottom: ${space[3]}px;
`;

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

const bodyStyles = css`
    margin: 0 auto ${space[2]}px;
    ${body.medium()};
    ${linkStyles}
`;

const highlightWrapperStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
    ${linkStyles}
`;

const highlightStyles = css`
    padding: 2px;
    background-color: ${palette.brandAlt[400]};
`;

type HighlightedProps = {
    highlightedText: string;
};

type BodyProps = {
    paragraphs: string[];
    highlightedText?: string;
    countryCode?: string;
};

interface EpicHeaderProps {
    text: string;
}

const EpicHeader: React.FC<EpicHeaderProps> = ({ text }: EpicHeaderProps) => {
    return <h2 css={headingStyles}>{text}</h2>;
};

const Highlighted: React.FC<HighlightedProps> = ({ highlightedText }: HighlightedProps) => {
    return (
        <strong css={highlightWrapperStyles}>
            {' '}
            <span css={highlightStyles}>{highlightedText}</span>
        </strong>
    );
};

interface EpicBodyParagraphProps {
    paragraph: string;
    highlighted: JSX.Element | null;
}

const EpicBodyParagraph: React.FC<EpicBodyParagraphProps> = ({
    paragraph,
    highlighted,
}: EpicBodyParagraphProps) => {
    return (
        <p css={bodyStyles}>
            {paragraph}
            {highlighted ? highlighted : null}
        </p>
    );
};

const EpicBody: React.FC<BodyProps> = ({ paragraphs, highlightedText }: BodyProps) => {
    return (
        <>
            {paragraphs.map((paragraph, idx) => {
                const paragraphElement = (
                    <EpicBodyParagraph
                        key={idx}
                        paragraph={paragraph}
                        highlighted={
                            highlightedText && idx === paragraphs.length - 1 ? (
                                <Highlighted highlightedText={highlightedText} />
                            ) : null
                        }
                    />
                );

                return paragraphElement;
            })}
        </>
    );
};

export const ContributionsEpic: React.FC<EpicProps> = ({
    brazeMessageProps,
    countryCode,
    submitComponentEvent,
}: EpicProps) => {
    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen) {
            // sendEpicViewEvent(tracking.referrerUrl, stage);
        }
    }, [hasBeenSeen]);

    const cleanHighlighted = brazeMessageProps.highlightedText;

    const cleanHeading = replaceNonArticleCountPlaceholders(brazeMessageProps.heading, countryCode);

    const cleanParagraphs: string[] = [];
    for (let i = 1; i < 10; i++) {
        const paragraph: string = brazeMessageProps[`paragraph${i}`];
        if (paragraph) {
            cleanParagraphs.push(paragraph);
        }
    }

    if (
        [cleanHighlighted, cleanHeading, ...cleanParagraphs].some(
            containsNonArticleCountPlaceholder,
        )
    ) {
        console.warn('braze-components Epic does not support article count');
        return null; // quick exit if something goes wrong. Ideally we'd throw and caller would catch/log but TODO that separately
    }

    return (
        <section ref={setNode} css={wrapperStyles}>
            {cleanHeading && <EpicHeader text={cleanHeading} />}

            <EpicBody paragraphs={cleanParagraphs} highlightedText={cleanHighlighted} />

            <ContributionsEpicButtons
                buttonText={brazeMessageProps.buttonText}
                buttonUrl={brazeMessageProps.buttonUrl}
                countryCode={countryCode}
                submitComponentEvent={submitComponentEvent}
            />
        </section>
    );
};
