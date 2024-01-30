import React from 'react';
import { css } from '@emotion/react';
import { SvgClock } from '@guardian/source-react-components';
import { neutral, textSans } from '@guardian/source-foundations';

// Newsletter Frequency Block
// -------------------------------------------------------
const frequencyStyles = {
    container: css`
        padding: 4px;
    `,
    clock: css`
        position: relative;
        top: 2px;
        margin-right: 4px;
        svg {
            fill: #999999;
            height: 16px;
            width: 16px;
        }
    `,
    text: css`
        color: ${neutral[20]};
        ${textSans.medium()}
        margin-left: 4px;
    `,
};

type NewsletterFrequencyBlockProps = {
    frequency?: string;
};

export const NewsletterFrequencyBlock: React.FC<NewsletterFrequencyBlockProps> = (
    props: NewsletterFrequencyBlockProps,
) => {
    const { frequency } = props;

    if (!frequency) {
        return null;
    }

    return (
        <div css={frequencyStyles.container}>
            <span css={frequencyStyles.clock}>
                <SvgClock />
            </span>
            <span css={frequencyStyles.text}>{frequency}</span>
        </div>
    );
};
