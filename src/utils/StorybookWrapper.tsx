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

export const mockSubscribe = (newsletterId: string) => {
    console.log(`subscribeToNewsletter invoked - ${newsletterId}`);
    return new Promise((resolve: (value: unknown) => void) => {
        setTimeout(() => {
            console.log(`subscribeToNewsletter resolved - ${newsletterId}`);
            resolve('');
        }, 1000);
    });
};

export const mockButtonClick = (internalButtonId: number) => {
    console.log(`Button with internal ID ${internalButtonId} clicked`);
};

export const mockComponentEvent = (componentEvent: {[key: string]: any}) => {
    console.log('submitComponentEvent called with: ', componentEvent);
};
