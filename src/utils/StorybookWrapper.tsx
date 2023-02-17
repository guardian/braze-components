import React from 'react';
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

type MockSubscribe = (id: string) => Promise<unknown>;
export const mockSubscribe: MockSubscribe = (newsletterId) => {
    console.log(`subscribeToNewsletter invoked - ${newsletterId}`);
    return new Promise((resolve: (value: unknown) => void) => {
        setTimeout(() => {
            console.log(`subscribeToNewsletter resolved - ${newsletterId}`);
            resolve('');
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
