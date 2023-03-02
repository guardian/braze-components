import { css } from '@emotion/react';
import { neutral, space, from, until, body, headline } from '@guardian/source-foundations';

const imgHeight = '280';
const bannerColor = '#ebe8e8';
const bodyColor = '#666';

export const styles = {
    wrapper: css`
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: ${bannerColor};
        color: ${neutral[20]};

        html {
            box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }
    `,

    contentContainer: css`
        align-items: stretch;
        display: flex;
        flex-direction: column;
        position: relative;
        margin: 0 auto;
        width: 100%;
        max-width: 740px;

        ${from.desktop} {
            max-width: 980px;
            flex-direction: row;
            min-height: ${imgHeight}px;
        }

        ${from.leftCol} {
            max-width: 1140px;
        }

        ${from.wide} {
            max-width: 1300px;
        }
    `,

    topLeftComponent: css`
        width: 93%;
        padding: ${space[4]}px;
        min-height: ${imgHeight}px;
        ${from.desktop} {
            width: 60%;
        }
    `,

    bottomRightComponent: css`
        display: flex;
        justify-content: center;
        width: 100%;
        max-height: 100%;

        ${from.desktop} {
            align-self: flex-end;
            padding-right: ${space[4]}px;
            max-width: 45%;
            justify-content: flex-end;
        }

        ${from.leftCol} {
            padding-right: 0;
            justify-content: space-between;
        }

        ${from.wide} {
            max-width: 48%;
        }
    `,

    heading: css`
        ${headline.small({ fontWeight: 'bold' })};
        margin: 0;
        max-width: 100%;

        ${from.mobileLandscape} {
            ${headline.small({ fontWeight: 'bold' })};
        }

        ${from.tablet} {
            max-width: 100%;
        }
    `,

    paragraph: css`
        ${body.medium()}
        line-height: 135%;
        margin: ${space[5]}px 0 ${space[5]}px;
        max-width: 100%;
        color: ${bodyColor};

        ${from.phablet} {
            max-width: 90%;
        }

        ${from.tablet} {
            max-width: 100%;
        }

        ${from.desktop} {
            font-size: 20px;
            margin: ${space[3]}px 0 ${space[4]}px;
            max-width: 42rem;
        }

        ${from.leftCol} {
            max-width: 37rem;
        }

        ${from.wide} {
            max-width: 42rem;
        }
    `,

    cta: css`
        font-weight: 700;
        margin-top: ${space[5]}px;
        margin-right: ${space[3]}px;
        display: inline-block;
        color: ${neutral[20]};
    `,

    smallRightSpacer: css`
        margin-right: ${space[3]}px;
    `,

    primaryButton: css`
        margin-right: ${space[3]}px;
    `,

    iconPanel: css`
        ${from.desktop} {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            height: 100%;
            padding: ${space[4]}px 0;
            margin-left: ${space[4]}px;
        }
    `,

    closeButton: css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        position: absolute;
        top: 15px;
        right: 10px;
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
    centeredBottomRightComponent: css`
        display: flex;
        justify-content: center;
        width: 100%;
        max-height: 100%;

        ${from.desktop} {
            padding-right: ${space[4]}px;
            max-width: 45%;
        }

        ${from.leftCol} {
            padding-right: 0;
        }

        ${from.wide} {
            max-width: 48%;
        }
    `,

    centeredImage: css`
        max-width: 100%;
        max-height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
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
};
