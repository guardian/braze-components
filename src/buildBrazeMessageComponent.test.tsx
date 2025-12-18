/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
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

    it('renders nothing when an invalid componentName is passed and no raw HTML', () => {
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

    it('renders RawHtmlMessage when no componentName but raw HTML is provided', () => {
        const ExampleComponent = jest.fn(() => null);
        const mappings = {
            ExampleComponent,
        };
        const BrazeMessageComponent = buildBrazeMessageComponent('RETENTION_EPIC', mappings);

        const { container } = render(
            <BrazeMessageComponent
                logButtonClickWithBraze={noOp}
                submitComponentEvent={noOp}
                brazeMessageProps={{
                    message: '<div class="test-content">Custom HTML Content</div>',
                    messageId: 'test-message-123',
                }}
            />,
        );

        // Check that the RawHtmlMessage component rendered the sanitized HTML
        expect(container.querySelector('.gu-braze-raw-html-message')).toBeInTheDocument();
        expect(container.textContent).toContain('Custom HTML Content');
        expect(ExampleComponent).not.toHaveBeenCalled();
    });

    it('sanitizes dangerous HTML when rendering raw HTML', () => {
        const mappings = {};
        const BrazeMessageComponent = buildBrazeMessageComponent('RETENTION_EPIC', mappings);

        const { container } = render(
            <BrazeMessageComponent
                logButtonClickWithBraze={noOp}
                submitComponentEvent={noOp}
                brazeMessageProps={{
                    message: '<div>Safe content</div><script>alert("xss")</script>',
                    messageId: 'test-message-456',
                }}
            />,
        );

        // Check that the script tag was removed by DOMPurify
        expect(container.querySelector('script')).not.toBeInTheDocument();
        expect(container.textContent).toContain('Safe content');
        expect(container.textContent).not.toContain('alert');
    });
});
