import React from 'react';
import { css } from '@emotion/react';

import { ACKNOWLEDGE_BUTTON_ID } from '../bannerCommon/bannerActions';
import type { TrackClick } from '../utils/tracking';

import { LinkButton } from '@guardian/source-react-components';

import { space } from '@guardian/source-foundations';

const styles = {
    primaryButton: css`
        margin-right: ${space[3]}px;
    `,
};

type BannerLinkButtonProps = {
    ophanComponentId: string;
    buttonText: string;
    buttonUrl: string;
    trackClick: TrackClick;
};

export const BannerLinkButton = (props: BannerLinkButtonProps): JSX.Element => {
    const { ophanComponentId, buttonText, buttonUrl, trackClick } = props;

    return (
        <LinkButton
            href={buttonUrl}
            onClick={() =>
                trackClick({
                    ophanComponentId,
                    internalButtonId: ACKNOWLEDGE_BUTTON_ID,
                })
            }
            css={styles.primaryButton}
        >
            {buttonText}
        </LinkButton>
    );
};
