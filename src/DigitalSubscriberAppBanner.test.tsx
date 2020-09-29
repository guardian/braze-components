/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DigitalSubscriberAppBanner } from './DigitalSubscriberAppBanner';

describe('DigitalSubscriberAppBanner', () => {
    describe('when a button is clicked', () => {
        const baseProps = () => ({
            logButtonClickWithBraze: jest.fn(),
            submitComponentEvent: jest.fn(),
            brazeMessageProps: {
                header: 'A note to our digital subscribers',
                body: 'Hi John, did you know...',
            },
        });

        it('invokes logButtonClickWithBraze with the internal button ID', () => {
            const logButtonClickWithBraze = jest.fn();
            const { getByText } = render(
                <DigitalSubscriberAppBanner
                    {...baseProps()}
                    logButtonClickWithBraze={logButtonClickWithBraze}
                />,
            );

            fireEvent.click(getByText('Ok, got it'));

            expect(logButtonClickWithBraze).toHaveBeenCalledWith(0);
        });

        it('invokes submitComponentEvent with correct data', () => {
            const logButtonClickWithOphan = jest.fn();
            const { getByText } = render(
                <DigitalSubscriberAppBanner
                    {...baseProps()}
                    submitComponentEvent={logButtonClickWithOphan}
                />,
            );

            fireEvent.click(getByText('Ok, got it'));

            expect(logButtonClickWithOphan).toHaveBeenCalledWith({
                component: {
                    componentType: 'RETENTION_ENGAGEMENT_BANNER',
                    id: 'DigitalSubscriberAppBanner',
                },
                action: 'CLICK',
                value: '1',
            });
        });

        it('closes the banner', () => {
            const props = baseProps();
            const { container, getByText } = render(<DigitalSubscriberAppBanner {...props} />);

            fireEvent.click(getByText('Ok, got it'));

            // Closing the banner means nothing is rendered
            expect(container.firstChild).toBeNull();
        });

        it('closes the banner even if the callback throws an error', () => {
            const props = baseProps();
            const logButtonClickWithBraze = () => {
                throw new Error('Something went wrong');
            };
            const { container, getByText } = render(
                <DigitalSubscriberAppBanner
                    {...props}
                    logButtonClickWithBraze={logButtonClickWithBraze}
                />,
            );

            fireEvent.click(getByText('Ok, got it'));

            // Closing the banner means nothing is rendered
            expect(container.firstChild).toBeNull();
        });
    });
});
