import React from 'react';

import { styles } from '../bannerCommon/bannerStyles';

type BannerImageBlockProps = {
    imageUrl?: string;
    imageAccessibilityText?: string;
};

export const BannerImageBlock = (props: BannerImageBlockProps): JSX.Element => {
    const { imageUrl, imageAccessibilityText } = props;

    const text = imageAccessibilityText ?? 'Image showing a marketing message packshot';

    return (
        <div css={styles.imageContainer}>
            <img src={imageUrl} alt={text} />
        </div>
    );
};
