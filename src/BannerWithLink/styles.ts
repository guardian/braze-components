import { css } from '@emotion/react';
import { from, until, space, neutral } from '@guardian/source-foundations';
import { ButtonTheme, buttonThemeReaderRevenueBrandAlt } from '@guardian/source-react-components';

const backgroundColor = '#f79e1b';
const buttonColor = '#007abc';

export const styles = {
    wrapper: css`
        background-color: ${backgroundColor};
    `,
    image: css`
        max-width: 100%;
        max-height: 300px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin-top: ${space[2]}px;

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
        color: ${neutral[0]};

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
        color: ${neutral[0]};
        margin-top: ${space[3]}px;
    `,
    closeButton: css`
        &:hover {
            background-color: transparent;
        }
    `,
    infoIcon: css`
        svg {
            fill: ${neutral[0]};
            background: transparent;
        }
    `,
    heading: css`
        color: ${neutral[0]};
    `,
    bottomRightComponent: css`
        ${from.desktop} {
            padding-right: 0;
            max-width: 45%;
        }

        ${from.wide} {
            max-width: 48%;
        }
    `,
};

// Use this theme but override the colours to match the moment colours
export const overridenReaderRevenueTheme: { button: ButtonTheme } = {
    button: {
        ...buttonThemeReaderRevenueBrandAlt.button,
        backgroundPrimary: buttonColor,
        backgroundPrimaryHover: buttonColor,
    },
};
