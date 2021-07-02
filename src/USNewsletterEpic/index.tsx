import { css, ThemeProvider } from '@emotion/react';
import React from 'react';
import { brand } from '@guardian/src-foundations';
import { Button, buttonBrandAlt } from '@guardian/src-button';
import { styles as commonStyles } from '../styles/bannerCommon';
import { COMPONENT_NAME } from './canRender';
import { body, textSans } from '@guardian/src-foundations/typography';
import { canRender } from './canRender';
import { OphanComponentEvent } from '@guardian/types';
import { BrazeClickHandler } from '../utils/tracking';

const IMAGE_URL =
    'https://i.guim.co.uk/img/media/d0944e021b1cc7426f515fecc8034f12b7862041/0_0_784_784/784.png?width=196&s=fbdead3f454e1ceeeab260ffde71100a';

const styles = {
    epicContainer: css`
        margin: 8px;
        padding: 4px 8px 12px;
        border-top: 1px solid #ffe500;
        background-color: #f6f6f6;
        display: flex;
        flex-direction: row;
        max-width: 620px;
    `,
    leftSection: css`
        width: 200px;
    `,
    rightSection: css`
        flex: 1;
        display: flex;
        flex-direction: column;
    `,
    frequencySection: css`
        padding: 4px;
    `,
    frequencyClock: css`
        position: relative;
        top: 2px;
        margin-right: 4px;
    `,
    frequencyText: css`
        color: #333333;
        ${textSans.medium()}
        margin-left: 4px;
    `,
    button: css`
        ${body.medium()}
        background-color: #C70000;
        color: #ffffff;
        max-width: 100px;
    `,
};

export type BrazeMessageProps = {
    header?: string;
};

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
};

export const USNewsletterEpic: React.FC<Props> = (props: Props) => {
    const {
        // logButtonClickWithBraze,
        // submitComponentEvent,
        // ophanComponentId = COMPONENT_NAME,
        brazeMessageProps: { header },
    } = props;

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    return (
        <ThemeProvider theme={brand}>
            <section css={styles.epicContainer}>
                <div css={styles.leftSection}>
                    <img src={IMAGE_URL}></img>
                </div>
                <div css={styles.rightSection}>
                    <span css={commonStyles.heading}>{header}</span>
                    <div css={styles.frequencySection}>
                        <span css={styles.frequencyClock}>{clockSVG}</span>
                        <span css={styles.frequencyText}>Daily</span>
                    </div>
                    <p css={commonStyles.paragraph}>
                        Start your day with a global perspective on America. Get the Guardian’s top
                        stories and must reads in one hit – every weekday.
                    </p>
                    <p css={commonStyles.paragraph}>
                        We thought you should know this newsletter may contain information about
                        Guardian products and services.
                    </p>
                    <ThemeProvider theme={buttonBrandAlt}>
                        <Button css={styles.button}>Sign up</Button>
                    </ThemeProvider>
                </div>
            </section>
        </ThemeProvider>
    );
};

const clockSVG = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" fill="#E5E5E5" />
        <g clipPath="url(#clip0)">
            <rect width="1440" height="2342" transform="translate(-510 -1706)" fill="white" />
            <rect width="620" height="283" transform="translate(-180 -46)" fill="#F6F6F6" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.71183 0.208008C11.9866 0.208008 15.4666 3.7096 15.4666 8.01094C15.4666 12.3123 11.9866 15.7923 7.71183 15.7923C3.43702 15.7923 0 12.3123 0 8.01094C0 3.7096 3.43702 0.208008 7.71183 0.208008ZM7.19628 1.63458L6.65924 8.27033L7.73331 9.17815L13.1896 8.72424V7.66511L8.72146 7.40573L8.24886 1.63458H7.19628Z"
                fill="#999999"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="1440" height="2342" fill="white" transform="translate(-510 -1706)" />
            </clipPath>
        </defs>
    </svg>
);

export { COMPONENT_NAME };
