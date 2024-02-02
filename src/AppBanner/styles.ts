import { css } from '@emotion/react';
import { brand, space, from, neutral, until } from '@guardian/source-foundations';

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

    primaryButton: css`
        margin-right: ${space[3]}px;
        color: ${neutral[100]};
        background-color: ${brand[400]};
        &:hover {
            background-color: ${brand[300]};
        }
    `,
};

// export const defaultPrimaryCtaButtonColors: PrimaryButtonColorStyles = {
//     styleButton: '#ffffff',    neutral[100]
//     styleButtonBackground: '#052962', brand[400]
//     styleButtonHover: '#234b8a', brand[300]
// };
