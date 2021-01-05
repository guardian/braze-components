import { css } from '@emotion/core';
import { palette, space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq/cjs';

export const styles = {
    secondaryButton: css`
        color: ${palette.neutral[20]};
    `,

    image: css`
        max-width: 100%;
        max-height: 260px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-top: -20px;

        img {
            max-width: 100%;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        ${until.desktop} {
            display: none;
        }

        ${from.wide} {
            margin-right: 100px;
        }
    `,

    storeIcon: css`
        height: 10px;
        display: inline-block;
        vertical-align: -37.5%;

        svg {
            height: 30px;
            width: auto;
            max-width: 110px;
            margin-top: ${space[2]}px;
            padding-right: ${space[2]}px;
        }
    `,
};
