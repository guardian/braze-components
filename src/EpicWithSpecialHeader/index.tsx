import React from 'react';
import { css } from '@emotion/react';
import { from, breakpoints } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { body, headline } from '@guardian/src-foundations/typography';

import { Epic } from '../Epic';
import type { EpicProps } from '../Epic';

export { COMPONENT_NAME } from './canRender';

const HEADER_IMAGE_URL =
    'https://i.guim.co.uk/img/media/cecfef4098a2a8c1e302e3f67b979f11ee529bb6/0_0_470_471/master/470.png?width=300&quality=45&s=d654e72595c07e2095777863f4901863';

const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const headerStyles = {
    picture: css``,
    rightContainer: css`
        flex: 1;
    `,
    image: css`
        height: auto;
        width: 100%;
        object-fit: cover;
    `,
    container: css`
        display: none;

        ${from.tablet} {
            display: flex;
            align-items: center;
            padding: ${space[1]}px ${space[1]}px 0;
        }
    `,
    leftContainer: css`
        flex: 3;
        margin-right: ${space[4]}px;
    `,
    text: css`
        ${headline.large({ fontWeight: 'bold' })};
        line-height: 1.35;
    `,
    imageCaptionContainer: css``,
    imageCaption: css`
        ${body.medium()}
        margin: 0;
    `,
    imageCaptionBold: css`
        ${body.medium({ fontWeight: 'bold' })}
    `,
    imageCaptionItalic: css`
        ${body.medium({ fontStyle: 'italic' })}
    `,
};

// We use a picture element here with an empty image for < tablet so that we
// don't load an image unnecessarily when we're not going to render it (which would be
// the case with an img tag)
const HeaderSection: React.FC = () => (
    <div css={headerStyles.container}>
        <div css={headerStyles.leftContainer}>
            <span css={headerStyles.text}>You&#8217;re powering open, independent journalism</span>
        </div>
        <div css={headerStyles.rightContainer}>
            <picture css={headerStyles.picture}>
                <source srcSet={emptyImage} media={`(max-width: ${breakpoints.tablet - 1}px)`} />
                <source srcSet={HEADER_IMAGE_URL} media={`(min-width: ${breakpoints.tablet}px)`} />
                <img css={headerStyles.image} src={HEADER_IMAGE_URL} alt="" />
            </picture>

            <div css={headerStyles.imageCaptionContainer}>
                <p css={[headerStyles.imageCaption, headerStyles.imageCaptionBold]}>
                    Mark Rice-Oxley
                </p>
                <p css={[headerStyles.imageCaption, headerStyles.imageCaptionItalic]}>
                    Executive Editor,
                </p>
                <p css={headerStyles.imageCaption}>Reader Revenues</p>
            </div>
        </div>
    </div>
);

export const EpicWithSpecialHeader: React.FC<EpicProps> = (props: EpicProps) => (
    <Epic {...props} headerSection={<HeaderSection />} />
);