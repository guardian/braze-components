import { css, ThemeProvider } from '@emotion/react';
import React, { ReactElement } from 'react';
import { brand } from '@guardian/src-foundations';
import { Button, buttonBrandAlt } from '@guardian/src-button';
import { styles as commonStyles } from '../styles/bannerCommon';
import { COMPONENT_NAME } from './canRender';
import { textSans } from '@guardian/src-foundations/typography';
import { canRender } from './canRender';
import { OphanComponentEvent } from '@guardian/types';
import { BrazeClickHandler } from '../utils/tracking';
import { until } from '@guardian/src-foundations/mq';

// Once https://github.com/guardian/source/pull/843 is merged and in a
// @guardian/src-icons release we'll be able to bump the version on this project
// and replace this with:
// import { SvgClock } from '@guardian/src-icons'
export const SvgClock = (): ReactElement => {
    return (
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 15c0 6.075-4.925 11-11 11S4 21.075 4 15 8.925 4 15 4s11 4.925 11 11zm-9.8-.35L15.475 6H14.5l-.75 9.375 1.275 1.275L22 16v-1l-5.8-.35z"
            />
        </svg>
    );
};

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
        padding-left: 12px;
    `,
    frequencySection: css`
        padding: 4px;
    `,
    frequencyClock: css`
        position: relative;
        top: 2px;
        margin-right: 4px;

        svg {
            fill: #999999;
            height: 16px;
            width: 16px;
        }
    `,
    frequencyText: css`
        color: #333333;
        ${textSans.medium()}
        margin-left: 4px;
    `,
    button: css`
        background-color: #c70000;
        color: #ffffff;
    `,
    image: css`
        width: 196px;

        ${until.desktop} {
            width: 96px;
        }
    `,
};

export type BrazeMessageProps = {
    header?: string;
    frequency?: string;
    paragraph1?: string;
    paragraph2?: string;
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
        brazeMessageProps: { header, frequency, paragraph1, paragraph2 },
    } = props;

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    return (
        <ThemeProvider theme={brand}>
            <section css={styles.epicContainer}>
                <div css={styles.leftSection}>
                    <img css={styles.image} src={IMAGE_URL}></img>
                </div>
                <div css={styles.rightSection}>
                    <span css={commonStyles.heading}>{header}</span>
                    <div css={styles.frequencySection}>
                        <span css={styles.frequencyClock}>
                            <SvgClock />
                        </span>
                        <span css={styles.frequencyText}>{frequency}</span>
                    </div>
                    <p css={commonStyles.paragraph}>{paragraph1}</p>
                    {paragraph2 ? <p css={commonStyles.paragraph}>{paragraph2}</p> : null}
                    <ThemeProvider theme={buttonBrandAlt}>
                        <Button css={styles.button}>Sign up</Button>
                    </ThemeProvider>
                </div>
            </section>
        </ThemeProvider>
    );
};

export { COMPONENT_NAME };
