import React from 'react';
import { styles } from '../bannerCommon/bannerStyles';

import { OnCloseClick } from '../bannerCommon/bannerActions';
import { BannerCloseButton } from '../bannerCommon/BannerCloseButton';
import { BannerHeaderCopy } from '../bannerCommon/BannerHeaderCopy';

type BannerStickyTopBarProps = {
    onCloseClick: OnCloseClick;
    header?: string;
    frequency?: string;
};

export const BannerStickyTopBar = (props: BannerStickyTopBarProps): JSX.Element => {
    const { header, onCloseClick, frequency } = props;

    return (
        <div css={[styles.breakpoints, styles.topBar]}>
            <BannerHeaderCopy header={header} frequency={frequency} />
            <BannerCloseButton onCloseClick={onCloseClick} />
        </div>
    );
};
