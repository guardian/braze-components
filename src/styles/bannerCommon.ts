import { css } from '@emotion/react';
import type { Extras } from '../logic/types';
import { space, from, body, headline } from '@guardian/source-foundations';

const imgHeight = '280';

export interface StyleData {
    styleBackground: string;
    styleHeader: string;
    styleBody: string;
    styleHighlight: string;
    styleHighlightBackground: string;
    styleButton: string;
    styleButtonBackground: string;
    styleButtonHover: string;
    styleClose: string;
    styleCloseBackground: string;
    styleCloseHover: string;
}

const colorStringStyles = [
    'styleBackground',
    'styleHeader',
    'styleBody',
    'styleHighlight',
    'styleHighlightBackground',
    'styleButton',
    'styleButtonBackground',
    'styleButtonHover',
    'styleClose',
    'styleCloseBackground',
    'styleCloseHover',
];

type Styles = keyof StyleData;

export const selfServeStyles = (userVals: Extras, defaults: StyleData) => {
    const style: StyleData = Object.assign({}, defaults);
    const defKeys: Styles[] = Object.keys(defaults) as Styles[];
    const regex = new RegExp(/^#([A-Fa-f0-9]{6})$/);

    defKeys.forEach((key) => {
        const userVal = userVals[key];

        // If user val is undefined, or an empty string, use default val
        if (userVal == null || !userVal.length) {
            return;
        }

        // Protect against CSS injection
        const item = userVal.split(';')[0].trim();

        // Protect against null or empty user strings
        if (item == null || !item.length) {
            return;
        }

        // Check for legitimate CSS color string values
        // - we only support `#abcdef` color format
        if (colorStringStyles.includes(key) && regex.test(item)) {
            style[key] = item;
        }
    });

    return {
        wrapper: css`
            box-sizing: border-box;
            width: 100%;
            background-color: ${style.styleBackground};
            display: flex;
            justify-content: center;
        `,
        contentContainer: css`
            display: flex;
            flex-direction: column;
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
        leftPanel: css`
            width: 93%;
            padding: ${space[4]}px;
            min-height: ${imgHeight}px;

            ${from.desktop} {
                width: 60%;
            }
        `,
        heading: css`
            ${headline.small({ fontWeight: 'bold' })};
            margin: 0;
            max-width: 85%;
            color: ${style.styleHeader};

            ${from.desktop} {
                max-width: 100%;
            }
        `,
        paragraph: css`
            ${body.medium()}
            line-height: 135%;
            margin-top: ${space[5]}px;
            max-width: 100%;
            color: ${style.styleBody};

            ${from.desktop} {
                font-size: 20px;
                margin-top: ${space[3]}px;
            }
        `,
        secondParagraph: css`
            ${from.desktop} {
                font-size: 18px;
            }
        `,
        highlightContainer: css`
            ${body.medium()}
            margin-top: ${space[5]}px;
            max-width: 100%;

            ${from.desktop} {
                font-size: 20px;
                margin-top: ${space[3]}px;
            }
        `,
        highlight: css`
            font-weight: 700;
            color: ${style.styleHighlight};
            background-color: ${style.styleHighlightBackground};
        `,
        smallRightSpacer: css`
            margin-right: ${space[3]}px;
        `,
        primaryButtonWrapper: css`
            margin: ${space[4]}px ${space[2]}px ${space[1]}px 0;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        `,
        primaryButton: css`
            margin-right: ${space[3]}px;
            color: ${style.styleButton};
            background-color: ${style.styleButtonBackground};
            &:hover {
                background-color: ${style.styleButtonHover};
            }
        `,
        rightPanel: css`
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: ${space[4]}px;
            width: 40%;
            display: none;

            ${from.desktop} {
                display: flex;
            }
        `,
        rightPanelBaseAligned: css`
            justify-content: flex-end;
        `,
        image: css`
            width: 100%;
            object-fit: contain;
        `,
        imageIsSquare: css`
            width: 50%;
        `,
        closeButton: css`
            padding: 0;
            position: absolute;
            top: ${space[4]}px;
            right: ${space[4]}px;
            border: 1px solid ${style.styleClose};
            background-color: ${style.styleCloseBackground};

            &:hover {
                background-color: ${style.styleCloseHover};
            }

            & svg {
                fill: ${style.styleClose};
            }
        `,
    };
};
