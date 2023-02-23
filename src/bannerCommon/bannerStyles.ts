import { css } from '@emotion/react';
import { neutral, space, from } from '@guardian/source-foundations';

const bannerColor = '#ebe8e8';
const defaultWidth = 740;
const desktopWidth = 980;
const leftColWidth = 1140;
const wideWidth = 1300;
const imageRatio = 0.45;

export const styles = {
    breakpoints: css`
        max-width: ${defaultWidth}px;

        ${from.desktop} {
            max-width: ${desktopWidth}px;
        }

        ${from.leftCol} {
            max-width: ${leftColWidth}px;
        }

        ${from.wide} {
            max-width: ${wideWidth}px;
        }
    `,
    wrapper: css`
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: ${bannerColor};
        color: ${neutral[20]};
        padding: ${space[4]}px;
        padding-bottom: 0;

        html {
            box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }
    `,

    topBar: css`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: sticky;
        top: 0;
        background-color: ${bannerColor};
        z-index: 1;

        ${from.desktop} {
            min-height: 0;
        }
    `,

    contentContainer: css`
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        align-items: stretch;
        position: relative;
        margin: 0 auto;
        width: 100%;

        ${from.desktop} {
            flex-direction: row;
        }
    `,

    ctaBar: css`
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: ${space[4]}px;
    `,

    // For this styling to work, the image needs to be roughly square!
    // Currently have `min-height: 250px;` to make sure image glues to bottom - bigger, squarer images should solve this
    // The default (< desktop) container hides the image - may change in future
    imageContainer: css`
        min-width: 100%;
        max-width: 100%;
        display: none;
        flex-direction: row;
        justify-content: center;
        padding-left: ${space[4]}px;

        ${from.desktop} {
            height: 100%;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            min-width: ${desktopWidth * imageRatio}px;
            max-width: ${desktopWidth * imageRatio}px;
        }

        ${from.leftCol} {
            min-width: ${leftColWidth * imageRatio}px;
            max-width: ${leftColWidth * imageRatio}px;
        }

        ${from.wide} {
            min-width: ${wideWidth * imageRatio}px;
            max-width: ${wideWidth * imageRatio}px;
        }

        img {
            width: 50%;
            min-width: 300px;
            margin-top: ${space[4]}px;

            ${from.desktop} {
                width: 100%;
                margin-top: 0;
            }
        }
    `,
    hiddenCloseButton: css`
        position: absolute;
        top: -1000px;
    `,
};
