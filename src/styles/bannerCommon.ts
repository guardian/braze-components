import { css } from '@emotion/react';
import {neutral, space, from, until, body, headline, brandAlt} from '@guardian/source-foundations';

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

    secondParagraph: css`
        ${from.desktop} {
            font-size: 18px;
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
    reminderContainer: css`
        position: relative;
        margin-top: ${space[2]}px;

        ${from.tablet} {
            margin-top: 0;
        }
    `,
    reminderLine: css`
        border-top: 1px solid black;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;

        ${from.leftCol} {
            left: calc(50% - 550px + 1120px * 0.14285714285714285 - 20px + 10px + 1px);
        }

        ${from.wide} {
            left: calc(50% - 630px + 1280px * 0.1875 - 20px + 10px);
        }

        &:before {
            content: '';
            display: block;
            position: absolute;
            left: 90px;
            bottom: 100%;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-bottom-color: black;

            ${from.tablet} {
                left: calc(50% + 210px);
            }

            ${from.desktop} {
                left: calc(50% + 253px);
            }

            ${from.leftCol} {
                left: 732px;
            }

            ${from.wide} {
                left: 733px;
            }
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            left: 91px;
            bottom: 100%;
            width: 0;
            height: 0;
            border: 9px solid transparent;
            border-bottom-color: ${brandAlt[400]};

            ${from.tablet} {
                left: calc(50% + 211px);
            }

            ${from.desktop} {
                left: calc(50% + 254px);
            }

            ${from.leftCol} {
                left: 733px;
            }

            ${from.wide} {
                left: 734px;
            }
        }
    `,
};
