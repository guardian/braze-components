import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';

export const styles = {
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
