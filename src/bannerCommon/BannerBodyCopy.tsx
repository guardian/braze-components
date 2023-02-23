import React from 'react';
import { css } from '@emotion/react';
import { from, body } from '@guardian/source-foundations';

const styles = {
    container: css``,
    body: css`
        ${body.medium()}
        line-height: 135%;
        color: #666;

        ${from.desktop} {
            font-size: 20px;
        }
    `,
    boldText: css`
        font-weight: bold;
    `,
};

type BannerBodyCopyProps = {
    body?: string;
    boldText?: string;
    secondParagraph?: string;
};

export const BannerBodyCopy = (props: BannerBodyCopyProps): JSX.Element => {
    const { body, boldText, secondParagraph } = props;

    return (
        <div css={styles.container}>
            <p css={styles.body}>
                {body}
                {boldText && <span css={styles.boldText}> {boldText}</span>}
            </p>
            {secondParagraph && <p css={styles.body}>{secondParagraph}</p>}
        </div>
    );
};
