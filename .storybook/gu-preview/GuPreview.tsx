/* eslint-disable no-fallthrough */
import React, { Fragment, ReactElement } from 'react';

import { styled } from '@storybook/theming';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';
import { registry } from '../../src/utils/registerKnobs';

const IconButtonWithLabel = styled(IconButton)(() => ({
    display: 'inline-flex',
    alignItems: 'center',
}));

const IconButtonLabel = styled.div<{}>(({ theme }) => ({
    fontSize: theme.typography.size.s2 - 1,
    marginLeft: 10,
}));

// const allowedNames = [
//     "componentName",
//     "header",
//     "body"
// ]

function constructPreviewUrl() {
    let baseUrl =
        'https://www.theguardian.com/sport/2019/jul/28/tour-de-france-key-moments-egan-bernal-yellow-jersey?dcr=false&';

    const theKnobs = registry.getKnobs();
    console.log('gupreview getKnobs', theKnobs);
    // let urlParamsObject = {};
    // let textareaList = document.getElementsByTagName("textarea");

    // for(let i = 0; i < textareaList.length; i++){
    //     let knob = textareaList[i];
    //     let name = knob.id;
    //     let value = knob.textContent

    //     if (allowedNames.includes(name)){
    //         urlParamsObject[name] = value;
    //     }
    // }

    let fullUrl = baseUrl + 'force-braze-message=' + encodeURIComponent(JSON.stringify(theKnobs));
    window.open(fullUrl);
}

export const GuPreview = (): ReactElement => {
    return (
        <Fragment>
            <IconButtonWithLabel
                key="gupreview"
                title="Preview on the Guardian site"
                onClick={constructPreviewUrl}
            >
                <Icons icon="browser" />
            </IconButtonWithLabel>
        </Fragment>
    );
};
