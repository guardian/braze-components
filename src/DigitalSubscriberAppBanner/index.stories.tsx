import React, { ReactElement } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { BrazeMessageComponent } from '../BrazeMessageComponent';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import { knobsData } from '../utils/knobsData';

export default {
    component: 'DigitalSubscriberAppBanner',
    title: 'Components/DigitalSubscriberAppBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'Banner');
    const header = text('header', 'A note to our digital subscribers');
    const body = text(
        'body',
        'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
    );
    const componentName = text('componentName', 'DigitalSubscriberAppBanner');

    // This is to make the data available to the guPreview add-on:
    knobsData.set({ header, body, componentName });

    return (
        <StorybookWrapper>
            <>
                <BrazeMessageComponent
                    candidates={[
                        {
                            componentName: componentName,
                            brazeMessageProps: {
                                header: header,
                                body: body,
                            },
                        },
                    ]}
                    logButtonClickWithBraze={(internalButtonId) => {
                        console.log(`Button with internal ID ${internalButtonId} clicked`);
                    }}
                    submitComponentEvent={(componentEvent) => {
                        console.log('submitComponentEvent called with: ', componentEvent);
                    }}
                />
            </>
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Digital Subscriber App Banner' };
