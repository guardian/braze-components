/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { buildBrazeMessageComponent } from './buildBrazeMessageComponent';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

describe('buildBrazeMessageComponent', () => {
    it('renders the correct component when a valid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent('RETENTION_EPIC', mappings);

        render(
            <BrazeMessageComponent
                componentName={'ExampleComponent'}
                logButtonClickWithBraze={noOp}
                submitComponentEvent={noOp}
            />,
        );

        expect(ExampleComponent).toHaveBeenCalled();
    });

    it('renders nothing when an invalid componentName is passed', () => {
        const ExampleComponent = jest.fn(() => null);
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent('RETENTION_EPIC', mappings);

        render(
            <BrazeMessageComponent
                componentName={'NoSuchComponent'}
                logButtonClickWithBraze={noOp}
                submitComponentEvent={noOp}
            />,
        );

        expect(ExampleComponent).not.toHaveBeenCalled();
    });
});
