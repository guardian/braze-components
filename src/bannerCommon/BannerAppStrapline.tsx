import React from 'react';
import { css } from '@emotion/react';

import { AppStore } from '../assets/app-store';
import { PlayStore } from '../assets/play-store';
import { space, neutral, body, from } from '@guardian/source-foundations';

const styles = {
    container: css`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
    `,
    cta: css`
        ${body.medium()}
        font-weight: 700;
        display: inline-block;
        color: ${neutral[20]};
        margin-right: ${space[2]}px;

        ${from.desktop} {
            font-size: 20px;
        }
    `,
    storeIcon: css`
        display: inline-block;

        svg {
            height: 30px;
            width: auto;
            max-width: 110px;
            padding-right: ${space[2]}px;
        }
    `,
};

type BannerAppStraplineProps = {
    cta?: string;
};

export const BannerAppStrapline = (props: BannerAppStraplineProps): JSX.Element => {
    const { cta } = props;

    return (
        <div css={styles.container}>
            <div css={styles.cta}>{cta}</div>
            <div css={styles.storeIcon}>
                <AppStore />
                <PlayStore />
            </div>
        </div>
    );
};
