/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { buildBrazeMessageComponent } from './BrazeMessageComponent';

describe('BrazeMessage', () => {
    it('renders the correct component when a valid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null);
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

        render(
            <BrazeMessageComponent
                componentName={'ExampleComponent'}
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                brazeMessageProps={{}}
            />,
        );

        expect(ExampleComponent).toHaveBeenCalled();
    });

    it('renders nothing when an invalid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null);
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

        render(
            <BrazeMessageComponent
                componentName={'NoSuchComponent'}
                logButtonClickWithBraze={jest.fn()}
                submitComponentEvent={jest.fn()}
                brazeMessageProps={{}}
            />,
        );

        expect(ExampleComponent).not.toHaveBeenCalled();
    });
});
