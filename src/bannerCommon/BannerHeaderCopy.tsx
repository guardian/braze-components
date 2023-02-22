import React from 'react';
import { css } from '@emotion/react';
import { headline, space } from '@guardian/source-foundations';

import { NewsletterFrequency } from '../newsletterCommon/sharedComponents';

const styles = {
    container: css`
        max-width: 80%;
        display: flex;
        flex-direction: column;
    `,
    header: css`
        ${headline.small({ fontWeight: 'bold' })};
        margin: ${space[3]}px;
        margin-left: 0;
    `,
    frequency: css`
        margin-top: -${space[2]}px;
        padding-bottom: ${space[2]}px;
    `,
};

type BannerHeaderCopyProps = {
    header?: string;
    frequency?: string;
};

export const BannerHeaderCopy = (props: BannerHeaderCopyProps): JSX.Element => {
    const { header, frequency } = props;

    return (
        <div css={styles.container}>
            <div css={styles.header}>{header ? header : ' '}</div>
            {frequency && (
                <div css={styles.frequency}>
                    <NewsletterFrequency frequency={frequency} />
                </div>
            )}
        </div>
    );
};
