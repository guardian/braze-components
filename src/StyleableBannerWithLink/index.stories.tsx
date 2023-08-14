import React, { ReactElement } from 'react';
import { BrazeBannerComponent } from '../BrazeBannerComponent';
import { StorybookWrapper, mockFetchEmail } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';
import { coreArgTypes, ophanComponentIdArgType } from '../storybookCommon/argTypes';
import { BrazeMessageProps } from '.';
import { grid, withGrid } from '../../.storybook/grid/withGrid';

export default {
    component: 'StyleableBannerWithLink',
    title: 'Banner/StyleableBannerWithLink',
    decorators: [withGrid],
    parameters: {
        grid: {
            disable: false,
        },
    },
    argTypes: {
        ...coreArgTypes,
        ...ophanComponentIdArgType,
        styleBackground: {
            name: 'styleBackground',
            type: { name: 'string', required: false },
            description: 'Banner background color - defaults to "#ededed"',
        },
        header: {
            name: 'header',
            type: { name: 'string', required: true },
            description: 'Header text',
        },
        styleHeader: {
            name: 'styleHeader',
            type: { name: 'string', required: false },
            description: 'Headline text color - defaults to "#333333"',
        },
        body: {
            name: 'body',
            type: { name: 'string', required: true },
            description: 'Body text',
        },
        styleBody: {
            name: 'styleBody',
            type: { name: 'string', required: false },
            description: 'Body text color - defaults to "#333333"',
        },
        highlight: {
            name: 'highlight',
            type: { name: 'string', required: false },
            description: 'Highlighted (callout) text',
        },
        styleHighlight: {
            name: 'styleHighlight',
            type: { name: 'string', required: false },
            description: 'Highlighted text color - defaults to "#333333"',
        },
        styleHighlightBackground: {
            name: 'styleHighlightBackground',
            type: { name: 'string', required: false },
            description: 'Highlighted background color - defaults to "#ededed"',
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
        showPaymentIcons: {
            name: 'showPaymentIcons',
            type: { name: 'string', required: false },
            description: 'set to "true" to show payment icons near the button',
        },
        styleButton: {
            name: 'styleButton',
            type: { name: 'string', required: false },
            description: 'CTA button text color - defaults to "#ffffff"',
        },
        styleButtonBackground: {
            name: 'styleButtonBackground',
            type: { name: 'string', required: false },
            description: 'CTA button background color - defaults to "#052962"',
        },
        styleButtonHover: {
            name: 'styleButtonHover',
            type: { name: 'string', required: false },
            description: 'CTA button background hover color - defaults to "#234b8a"',
        },
        imageUrl: {
            name: 'imageUrl (use Grid image picker)',
            type: { name: 'string', required: true },
            control: null,
            description:
                'i.guim.co.uk URL for the banner image. Use the Grid image picker to select this.',
        },
        imageAltText: {
            name: 'imageAltText',
            type: { name: 'string', required: true },
            description: 'Accessible image alt text',
        },
        imagePosition: {
            name: 'imagePosition',
            type: { name: 'string', required: false },
            description: 'Image vertical position - options: "bottom", "center" (default)',
        },
        styleClose: {
            name: 'styleClose',
            type: { name: 'string', required: false },
            description: 'Close button color - defaults to "#052962"',
        },
        styleCloseBackground: {
            name: 'styleCloseBackground',
            type: { name: 'string', required: false },
            description: 'Close button background - defaults to "#ededed"',
        },
        styleCloseHover: {
            name: 'styleCloseHover',
            type: { name: 'string', required: false },
            description: 'Close button background hover - defaults to "#e5e5e5"',
        },
    },
};

const StoryTemplate = (args: BrazeMessageProps & { componentName: string }): ReactElement => {
    const imageUrl = grid(
        'https://i.guim.co.uk/img/media/35d403182e4b262d37385281b19b763ee6b32f6a/58_0_1743_1046/master/1743.png?width=930&quality=45&auto=format&s=9ecd82413fef9883c1e7a0df2bf6abb1',
    );

    const brazeMessageProps: BrazeMessageProps = {
        styleBackground: args.styleBackground,
        header: args.header,
        styleHeader: args.styleHeader,
        body: args.body,
        styleBody: args.styleBody,
        highlight: args.highlight,
        styleHighlight: args.styleHighlight,
        styleHighlightBackground: args.styleHighlightBackground,
        buttonText: args.buttonText,
        buttonUrl: args.buttonUrl,
        showPaymentIcons: args.showPaymentIcons,
        styleButton: args.styleButton,
        styleButtonBackground: args.styleButtonBackground,
        styleButtonHover: args.styleButtonHover,
        imageUrl,
        imageAltText: args.imageAltText,
        imagePosition: args.imagePosition,
        styleClose: args.styleClose,
        styleCloseBackground: args.styleCloseBackground,
        styleCloseHover: args.styleCloseHover,
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
                fetchEmail={() => mockFetchEmail()}
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
    styleBackground: '#ededed',
    header: 'The Guardian’s impact in 2021',
    styleHeader: '#333333',
    body: 'Thanks to your generous support in this extraordinary year, our open, independent journalism was read by millions. From the pandemic to our urgent coverage of the climate crisis, our reporting had a powerful impact.',
    styleBody: '#333333',
    highlight: 'Read our look-back to see how Guardian journalism made a difference.',
    styleHighlight: '#333333',
    styleHighlightBackground: '#ededed',
    buttonText: 'Take a look back',
    buttonUrl:
        'https://www.theguardian.com/info/ng-interactive/2020/dec/21/the-guardian-in-2020?INTCMP=gdnwb_mrtn_banner_edtrl_MK_SU_WorkingReport2020Canvas',
    showPaymentIcons: 'false',
    styleButton: '#ffffff',
    styleButtonBackground: '#052962',
    styleButtonHover: '#234b8a',
    imageAltText: 'Accessible image description',
    imagePosition: 'bottom',
    styleClose: '#052962',
    styleCloseBackground: '#ededed',
    styleCloseHover: '#e5e5e5',
    componentName: 'StyleableBannerWithLink',
    ophanComponentId: 'change_me_ophan_component_id',
};

DefaultStory.story = { name: 'StyleableBannerWithLink' };
