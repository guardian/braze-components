import React, { ReactElement } from 'react';

import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, ophanComponentIdArgType } from '../storybookCommon/argTypes';
import { grid, withGrid } from '../../.storybook/grid/withGrid';

import { BrazeBannerComponent } from '../BrazeBannerComponent';
import type { BrazeBannerMessageProps } from '../bannerCommon/bannerActions';

export default {
    component: 'BannerWithLink',
    title: 'Banner/BannerWithLink',
    decorators: [withGrid],
    parameters: {
        grid: {
            disable: false,
        },
    },
    argTypes: {
        ...coreArgTypes,
        ...ophanComponentIdArgType,
        header: {
            name: 'header',
            type: { name: 'string', required: true },
            description: 'Header text',
        },
        body: {
            name: 'body',
            type: { name: 'string', required: true },
            description: 'Body text',
        },
        boldText: {
            name: 'boldText',
            type: { name: 'string', required: false },
            description: 'Bold text',
        },
        buttonText: {
            name: 'buttonText',
            type: { name: 'string', required: true },
            description: 'Button text',
        },
        buttonUrl: {
            name: 'buttonUrl',
            type: { name: 'string', required: true },
        },
        imageUrl: {
            name: 'imageUrl (use Grid image picker)',
            type: { name: 'string', required: true },
            control: null,
            description:
                'i.guim.co.uk URL for the banner image. Use the Grid image picker to select this.',
        },
        imageAccessibilityText: {
            name: 'imageAccessibilityText',
            type: { name: 'string', required: true },
            description: 'Accessible text description of the image',
        },
    },
};

const StoryTemplate = (args: BrazeBannerMessageProps & { componentName: string }): ReactElement => {
    const imageUrl = grid(
        'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
    );

    const brazeMessageProps: BrazeBannerMessageProps = {
        ophanComponentId: args.ophanComponentId,
        header: args.header,
        body: args.body,
        boldText: args.boldText,
        buttonText: args.buttonText,
        buttonUrl: args.buttonUrl,
        imageUrl,
        imageAccessibilityText: args.imageAccessibilityText,
    };

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ ...brazeMessageProps, componentName: args.componentName });

    return (
        <StorybookWrapper>
            <BrazeBannerComponent
                componentName={args.componentName}
                logButtonClickWithBraze={(internalButtonId) => {
                    console.log(`Button with internal ID ${internalButtonId} clicked`);
                }}
                submitComponentEvent={(componentEvent) => {
                    console.log('submitComponentEvent called with: ', componentEvent);
                }}
                brazeMessageProps={brazeMessageProps}
            />
        </StorybookWrapper>
    );
};

export const DefaultStory = StoryTemplate.bind({});

DefaultStory.args = {
    slotName: 'Banner',
    componentName: 'BannerWithLink',

    ophanComponentId: 'change_me_ophan_component_id',

    header: 'The Guardian’s impact in 2021',
    body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, our reporting had a powerful impact.',
    boldText: 'Read our look-back to see how Guardian journalism made a difference.',

    buttonText: 'Take a look back',
    buttonUrl:
        'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',

    imageAccessibilityText: 'Product packshot image',
};

DefaultStory.story = { name: 'BannerWithLink' };
