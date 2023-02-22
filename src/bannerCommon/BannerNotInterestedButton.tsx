import React from 'react';
import { css } from '@emotion/react';

import { OnCloseClick, CLOSE_BUTTON_ID } from '../bannerCommon/bannerActions';

import { ThemeProvider } from '@emotion/react';
import {
    Button,
    buttonThemeReaderRevenueBrandAlt,
    ButtonTheme,
} from '@guardian/source-react-components';

const styles = {
    notInterestedButton: css`
        text-decoration: none;
        text-underline-offset: inherit;

        &:hover {
            text-decoration: underline;
        }
    `,
};

type BannerNotInterestedButtonProps = {
    onCloseClick: OnCloseClick;
};

export const BannerNotInterestedButton = (props: BannerNotInterestedButtonProps): JSX.Element => {
    const { onCloseClick } = props;

    // This is to keep button colors the same as before
    // https://github.com/guardian/braze-components/pull/123
    // Probably should be removed later
    const notInterestedTheme: { button: ButtonTheme } = {
        button: {
            ...buttonThemeReaderRevenueBrandAlt.button,
            textSubdued: 'rgb(51, 51, 51)',
        },
    };

    return (
        <ThemeProvider theme={notInterestedTheme}>
            <Button
                onClick={(e) => onCloseClick(e, CLOSE_BUTTON_ID)}
                priority="subdued"
                css={styles.notInterestedButton}
            >
                {"I'm not interested"}
            </Button>
        </ThemeProvider>
    );
};
