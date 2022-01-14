import { css } from '@emotion/react';
import { from, until, space } from '@guardian/source-foundations';

export const styles = {
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
    paragraph: css`
        font-size: 16px;

        ${from.desktop} {
            font-size: 16px;
            margin: ${space[3]}px 0 ${space[4]}px;
            max-width: 42rem;
        }

        ${from.leftCol} {
            font-size: 20px;
            max-width: 37rem;
        }
    `,
    cta: css`
        margin-top: ${space[3]}px;
    `,
};
