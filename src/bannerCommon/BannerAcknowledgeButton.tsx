import React from 'react';
import { css } from '@emotion/react';

import { OnCloseClick, ACKNOWLEDGE_BUTTON_ID } from '../bannerCommon/bannerActions';

import { ThemeProvider } from '@emotion/react';
import {
    Button,
    buttonThemeReaderRevenueBrandAlt,
    ButtonTheme,
} from '@guardian/source-react-components';

import { space } from '@guardian/source-foundations';

const styles = {
    primaryButton: css`
        margin-right: ${space[3]}px;
    `,
};

type BannerAcknowledgeButtonProps = {
    buttonText: string;
    onCloseClick: OnCloseClick;
};

export const BannerAcknowledgeButton = (props: BannerAcknowledgeButtonProps): JSX.Element => {
    const { buttonText, onCloseClick } = props;

    // This is to keep button colors the same as before
    // https://github.com/guardian/braze-components/pull/123
    // Probably should be removed later
    const overrridenReaderRevenueTheme: { button: ButtonTheme } = {
        button: {
            ...buttonThemeReaderRevenueBrandAlt.button,
            backgroundPrimary: 'rgb(51, 51, 51)',
            backgroundPrimaryHover: 'black',
        },
    };

    return (
        <ThemeProvider theme={overrridenReaderRevenueTheme}>
            <Button
                onClick={(e) => onCloseClick(e, ACKNOWLEDGE_BUTTON_ID)}
                css={styles.primaryButton}
            >
                {buttonText}
            </Button>
        </ThemeProvider>
    );
};
