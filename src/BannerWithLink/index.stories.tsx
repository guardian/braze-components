import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, ophanComponentIdArgType } from '../storybookCommon/argTypes';
import { BrazeMessageProps } from '.';
import { grid, withGrid } from '../../.storybook/grid/withGrid';

export default {
    component: 'BannerWithLink',
    title: 'WorkInProgress/Banner/BannerWithLink',
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
    },
};

const StoryTemplate = (args: BrazeMessageProps & { componentName: string }): ReactElement => {
    const imageUrl = grid(
        'https://i.guim.co.uk/img/media/c9ba78ef2b1a931aab5ca625ce49646e116b11b3/0_0_3200_1800/3200.png?quality=60&width=930&s=72ff133ea3e4516f5a353213e7a62e8a',
    );

    const brazeMessageProps: BrazeMessageProps = {
        header: args.header,
        body: args.body,
        boldText: args.boldText,
        buttonText: args.buttonText,
        buttonUrl: args.buttonUrl,
        imageUrl,
        ophanComponentId: args.ophanComponentId,
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
    header: 'The Guardian’s impact in 2021',
    body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, our reporting had a powerful impact.',
    buttonText: 'Take a look back',
    buttonUrl:
        'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',
    boldText: 'Read our look-back to see how Guardian journalism made a difference.',
    componentName: 'BannerWithLink',
    ophanComponentId: 'change_me_ophan_component_id',
};

DefaultStory.story = { name: 'BannerWithLink' };
