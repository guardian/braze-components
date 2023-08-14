import React from 'react';
import { NewsletterSubscribeCallback, FetchEmail } from '../types/dcrTypes';
import { fontFaces, cssResets, previewStyles } from './styleUtilities';

type Props = {
    children: React.ReactElement;
};

export const StorybookWrapper: React.FC<Props> = ({ children }: Props) => (
    <div>
        <style>
            {fontFaces}
            {cssResets}
            {previewStyles}
        </style>
        <div css="preview">{children}</div>
    </div>
);

export const mockSubscribe: NewsletterSubscribeCallback = (newsletterId) => {
    console.log(`subscribeToNewsletter invoked - ${newsletterId}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`subscribeToNewsletter resolved - ${newsletterId}`);
            resolve();
        }, 1000);
    });
};

export const mockRemind: FetchEmail = () => {
    console.log(`fetchEmail invoked`);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`fetchEmail resolved`);
            resolve('some.person@example.com');
        }, 1000);
    });
};

type MockButtonClick = (id: number) => void;
export const mockButtonClick: MockButtonClick = (internalButtonId) => {
    console.log(`Button with internal ID ${internalButtonId} clicked`);
};

type MockComponentEvent = (e: { [key: string]: unknown }) => void;
export const mockComponentEvent: MockComponentEvent = (componentEvent) => {
    console.log('submitComponentEvent called with: ', componentEvent);
};
