import React, { useEffect, useState } from 'react';
import * as emotion from '@emotion/react';
import * as emotionCore from '@emotion/core';
import * as emotionTheming from 'emotion-theming';
import { css } from '@emotion/core';

const componentUrl = `https://contributions.code.dev-guardianapis.com/epic.js`;
const epicWrapper = css`
    box-sizing: border-box;
    width: 100%;
    max-width: 620px;
    margin: 10px;
`;

declare global {
    interface Window {
        guardian: Record<string, unknown>;
    }
}

export type EpicProps = {
    variant: Variant;
    tracking: Tracking;
    // numArticles: number;
};

export type Variant = {
    // name: string;
    heading: string;
    paragraphs: Array<string>;
    highlightedText: string;
    cta: {
        text: string;
        baseUrl: string;
    };
};

type Tracking = {
    // ophanPageId: string;
    // platformId: string;
    // clientName: string;
    // referrerUrl: string;
};

export const Epic: React.FC<EpicProps> = (props) => {
    const [EpicInner, setEpicInner] = useState<React.FC<EpicProps>>();
    useEffect(() => {
        window.guardian = {};
        window.guardian.automat = {
            react: React,
            preact: React,
            emotionCore,
            emotionTheming,
            emotion,
        };
        import(/*webpackIgnore: true*/ componentUrl)
            .then((epicModule: { ContributionsEpic: React.FC<EpicProps> }) => {
                setEpicInner(() => epicModule.ContributionsEpic);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(`epic - error is: ${error}`));
    }, []);

    if (EpicInner) {
        return (
            <div css={epicWrapper}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <EpicInner {...props} />
            </div>
        );
    }

    return null;
};
