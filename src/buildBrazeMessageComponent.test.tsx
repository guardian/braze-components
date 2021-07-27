/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { buildBrazeMessageComponent } from './buildBrazeMessageComponent';

describe('buildBrazeMessageComponent', () => {
    it('renders the correct component when a valid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null);
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

        render(<BrazeMessageComponent componentName={'ExampleComponent'} />);

        expect(ExampleComponent).toHaveBeenCalled();
    });

    it('renders nothing when an invalid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null);
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent(mappings);

        render(<BrazeMessageComponent componentName={'NoSuchComponent'} />);

        expect(ExampleComponent).not.toHaveBeenCalled();
    });
});
