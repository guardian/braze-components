import React from 'react';
import { css } from '@emotion/react';
import { SvgClock } from '@guardian/source/react-components';
import { textSans17 } from '@guardian/source/foundations';

import type { NewsletterFrequencyColorStyles } from '../styles/colorData';

type NewsletterFrequencyBlockProps = {
    frequency?: string;
    colors?: NewsletterFrequencyColorStyles;
};

export const NewsletterFrequencyBlock: React.FC<NewsletterFrequencyBlockProps> = (
    props: NewsletterFrequencyBlockProps,
) => {
    const { frequency, colors = defaultNewsletterFrequencyColors } = props;

    if (!frequency) {
        return null;
    }

    const styles = getFrequencyStyles(colors);

    return (
        <div css={styles.container}>
            <span css={styles.clock}>
                <SvgClock />
            </span>
            <span css={styles.text}>{frequency}</span>
        </div>
    );
};

export const defaultNewsletterFrequencyColors: NewsletterFrequencyColorStyles = {
    styleClockColor: '#999999',
    styleFrequencyText: '#333333',
};

const getFrequencyStyles = (styles: NewsletterFrequencyColorStyles) => {
    return {
        container: css`
            padding: 4px;
        `,
        clock: css`
            position: relative;
            top: 2px;
            margin-right: 4px;
            svg {
                fill: ${styles.styleClockColor};
                height: 16px;
                width: 16px;
            }
        `,
        text: css`
            color: ${styles.styleFrequencyText};
            ${textSans17};
            margin-left: 4px;
        `,
    };
};
