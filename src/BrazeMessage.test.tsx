/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { buildBrazeMessageComponent } from './BrazeMessage';

describe('BrazeMessage', () => {
    it('renders the correct component when a valid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null);
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessage = buildBrazeMessageComponent(mappings);

        render(
            <BrazeMessage
                componentName={'ExampleComponent'}
                onButtonClick={jest.fn}
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
        const BrazeMessage = buildBrazeMessageComponent(mappings);

        render(
            <BrazeMessage
                componentName={'NoSuchComponent'}
                onButtonClick={jest.fn}
                brazeMessageProps={{}}
            />,
        );

        expect(ExampleComponent).not.toHaveBeenCalled();
    });
});
