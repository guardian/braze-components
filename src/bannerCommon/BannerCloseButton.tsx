import React from 'react';
import { css } from '@emotion/react';
import { Button, SvgCross, SvgRoundelDefault } from '@guardian/source-react-components';

import { OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';

import { from, space } from '@guardian/source-foundations';

const styles = {
    container: css`
        display: flex;
        margin: ${space[3]}px;
    `,
    roundelContainer: css`
        display: none;
        height: 36px;

        svg {
            height: 100%;
        }

        ${from.tablet} {
            display: block;
            margin-right: ${space[3]}px;
        }
    `,
    button: css`
        font-size: 0.001rem;
    `,
};

type BannerCloseButtonProps = {
    onCloseClick: OnCloseClick;
};

export const BannerCloseButton = (props: BannerCloseButtonProps): JSX.Element => {
    const { onCloseClick } = props;

    return (
        <div css={styles.container}>
            <div css={styles.roundelContainer}>
                <SvgRoundelDefault />
            </div>

            <Button
                onClick={(e) => onCloseClick(e, CLOSE_BUTTON_ID)}
                css={styles.button}
                icon={<SvgCross />}
                size="small"
                hideLabel
                autoFocus
                data-close-button={'close-button'}
            >
                Close marketing banner
            </Button>
        </div>
    );
};
