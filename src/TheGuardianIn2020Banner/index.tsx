import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Button, buttonReaderRevenueBrandAlt, LinkButton } from '@guardian/src-button';
import { SvgCross, SvgInfo } from '@guardian/src-icons';
import { OphanComponentEvent } from '@guardian/types';

import { BrazeClickHandler } from '../utils/tracking';
import { styles as commonStyles } from '../styles/bannerCommon';
import { styles } from './styles';
import { canRender, COMPONENT_NAME } from './canRender';
export { COMPONENT_NAME };

export type BrazeMessageProps = {
    header?: string;
    body?: string;
};
import { ButtonTheme } from '@guardian/src-foundations/dist/types/themes/button';

export type Props = {
    logButtonClickWithBraze: BrazeClickHandler;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
    ophanComponentId?: string;
    brazeMessageProps: BrazeMessageProps;
};

const catchAndLogErrors = (description: string, fn: () => void): void => {
    try {
        fn();
    } catch (e) {
        console.log(`Error (${description}): `, e.message);
    }
};

const urlObject = new URL(
    'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020',
);

const urlParams = {
    INTCMP: 'gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',
};

for (const [key, value] of Object.entries(urlParams)) {
    urlObject.searchParams.set(key, value);
}

const THE_GU_IN_2020_URL = urlObject.href;

const TheGuardianIn2020Banner: React.FC<Props> = (props: Props) => {
    const {
        logButtonClickWithBraze,
        submitComponentEvent,
        ophanComponentId = COMPONENT_NAME,
        brazeMessageProps: { header, body },
    } = props;

    const [showBanner, setShowBanner] = useState(true);

    if (!canRender(props.brazeMessageProps)) {
        return null;
    }

    if (!showBanner) {
        return null;
    }

    const logToBrazeAndOphan = (internalButtonId: number): void => {
        catchAndLogErrors('ophanButtonClick', () => {
            // Braze displays button id from 1, but internal representation is numbered from 0
            // This ensures that the Button ID in Braze and Ophan will be the same
            const externalButtonId = internalButtonId + 1;
            submitComponentEvent({
                component: {
                    componentType: 'RETENTION_ENGAGEMENT_BANNER',
                    id: ophanComponentId,
                },
                action: 'CLICK',
                value: externalButtonId.toString(10),
            });
        });

        catchAndLogErrors('brazeButtonClick', () => {
            logButtonClickWithBraze(internalButtonId);
        });
    };
    const onClick = logToBrazeAndOphan;

    const onCloseClick = (
        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        internalButtonId: number,
    ): void => {
        evt.preventDefault();

        setShowBanner(false);

        logToBrazeAndOphan(internalButtonId);
    };

    // This is to keep button colors the same as before
    // https://github.com/guardian/braze-components/pull/123
    // Probably should be removed later
    const overrridenReaderRevenueTheme: { button: ButtonTheme } = {
        button: {
            ...buttonReaderRevenueBrandAlt.button,
            backgroundPrimary: 'rgb(51, 51, 51)',
            backgroundPrimaryHover: 'black',
        },
    };

    return (
        <div css={commonStyles.wrapper}>
            <div css={commonStyles.contentContainer}>
                <div css={commonStyles.topLeftComponent}>
                    <div css={commonStyles.infoIcon}>
                        <SvgInfo />
                    </div>
                    <div css={commonStyles.heading}>
                        <span css={commonStyles.smallInfoIcon}>
                            <SvgInfo />
                        </span>
                        {header}
                    </div>
                    <p css={styles.paragraph}>
                        {body}
                        <br />
                        <strong css={styles.cta}>
                            Read our look-back to see how Guardian journalism made a difference.
                        </strong>
                    </p>
                    <ThemeProvider theme={overrridenReaderRevenueTheme}>
                        <LinkButton
                            href={THE_GU_IN_2020_URL}
                            css={commonStyles.primaryButton}
                            onClick={() => onClick(0)}
                        >
                            Take a look back
                        </LinkButton>
                    </ThemeProvider>
                </div>
                <div css={commonStyles.bottomRightComponent}>
                    <div css={styles.image}>
                        <img
                            src="https://i.guim.co.uk/img/media/c9ba78ef2b1a931aab5ca625ce49646e116b11b3/0_0_3200_1800/3200.png?quality=60&width=930&s=72ff133ea3e4516f5a353213e7a62e8a"
                            alt=""
                        />
                    </div>
                    <div css={commonStyles.iconPanel}>
                        <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                            <Button
                                icon={<SvgCross />}
                                hideLabel={true}
                                css={commonStyles.closeButton}
                                priority="tertiary"
                                size="small"
                                aria-label="Close"
                                onClick={(e) => onCloseClick(e, 1)}
                                tabIndex={0}
                            >
                                {' '}
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TheGuardianIn2020Banner };
