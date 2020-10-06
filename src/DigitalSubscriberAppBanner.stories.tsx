import React, { ReactElement } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { BrazeMessage } from './BrazeMessage';
import { StorybookWrapper } from './utils/StorybookWrapper';

export default {
    component: 'DigitalSubscriberAppBanner',
    title: 'Components/DigitalSubscriberAppBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const slotName = text('slotName', 'Banner');

    return (
        <StorybookWrapper>
            <BrazeMessage
                componentName={text('componentName', 'DigitalSubscriberAppBanner')}
                logButtonClickWithBraze={(internalButtonId) => {
                    console.log(`Button with internal ID ${internalButtonId} clicked`);
                }}
                submitComponentEvent={(componentEvent) => {
                    console.log('submitComponentEvent called with: ', componentEvent);
                }}
                brazeMessageProps={{
                    header: text('header', 'A note to our digital subscribers'),
                    body: text(
                        'body',
                        'Hi John, did you know that as a Guardian digital subscriber you can enjoy an enhanced experience of our quality, independent journalism on all your devices, including The Guardian Live app.',
                    ),
                }}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Digital Subscriber App Banner' };
