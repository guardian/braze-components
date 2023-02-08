import React, { Fragment, ReactElement } from 'react';
import { styled } from '@storybook/theming';
import { Icons, IconButton } from '@storybook/components';
import { knobsData } from '../../src/utils/knobsData';
import { getPreviewUrl } from '../utils';

const IconButtonWithLabel = styled(IconButton)(() => ({
    display: 'inline-flex',
    alignItems: 'center',
}));

const IconButtonLabel = styled.div<{}>(({ theme }) => ({
    fontSize: theme.typography.size.s2 - 1,
    marginLeft: 10,
}));

function constructPreviewUrl() {
    let baseUrl = getPreviewUrl();

    const theKnobs = knobsData.get();

    let fullUrl = baseUrl + '#force-braze-message=' + encodeURIComponent(JSON.stringify(theKnobs));
    window.open(fullUrl);
}

export const GuPreview = (): ReactElement => {
    return (
        <>
            <IconButtonWithLabel
                key="gupreview"
                title="Preview on the Guardian site"
                onClick={constructPreviewUrl}
            >
                <Icons icon="browser" />
            </IconButtonWithLabel>
        </>
    );
};
