/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { NewsletterEpic } from '.';

describe('NewsletterEpic', () => {
    describe('when the sign up button is clicked', () => {
        const newsletterId = '4156';
        const brazeMessageProps = {
            header: 'First Thing',
            frequency: 'Every day',
            paragraph1: 'Start your day with...',
            imageUrl:
                'https://i.guim.co.uk/img/media/d0944e021b1cc7426f515fecc8034f12b7862041/0_0_784_784/784.png?width=196&s=fbdead3f454e1ceeeab260ffde71100a',
            newsletterId,
            ophanComponentId: 'ophan_component_id',
        };

        it('calls subscribeToNewsletter with the correct id', async () => {
            const subscribeToNewsletter = jest.fn(() => Promise.resolve());
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const noOp = () => {};

            render(
                <NewsletterEpic
                    brazeMessageProps={brazeMessageProps}
                    subscribeToNewsletter={subscribeToNewsletter}
                    submitComponentEvent={noOp}
                    logButtonClickWithBraze={noOp}
                />,
            );

            fireEvent.click(screen.getByText('Sign up'));

            await screen.findByText(/Thank you/);
            expect(subscribeToNewsletter).toHaveBeenCalledWith(newsletterId);
        });

        it('renders thank you when successful', async () => {
            const subscribeToNewsletter = () => Promise.resolve();
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const noOp = () => {};

            render(
                <NewsletterEpic
                    brazeMessageProps={brazeMessageProps}
                    subscribeToNewsletter={subscribeToNewsletter}
                    submitComponentEvent={noOp}
                    logButtonClickWithBraze={noOp}
                />,
            );

            fireEvent.click(screen.getByText('Sign up'));

            await screen.findByText(/Thank you/);
        });

        it('calls submitComponentEvent with the correct data', async () => {
            const subscribeToNewsletter = () => Promise.resolve();
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const noOp = () => {};
            const submitComponentEvent = jest.fn();

            render(
                <NewsletterEpic
                    brazeMessageProps={brazeMessageProps}
                    subscribeToNewsletter={subscribeToNewsletter}
                    submitComponentEvent={submitComponentEvent}
                    logButtonClickWithBraze={noOp}
                />,
            );

            fireEvent.click(screen.getByText('Sign up'));

            await screen.findByText(/Thank you/);
            const expectedPayload = {
                action: 'CLICK',
                component: { componentType: 'RETENTION_EPIC', id: 'ophan_component_id' },
                value: '1',
            };
            expect(submitComponentEvent).toHaveBeenCalledWith(expectedPayload);
        });

        it('calls logButtonClickWithBraze with the correct id', async () => {
            const subscribeToNewsletter = () => Promise.resolve();
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const noOp = () => {};
            const logButtonClickWithBraze = jest.fn();

            render(
                <NewsletterEpic
                    brazeMessageProps={brazeMessageProps}
                    subscribeToNewsletter={subscribeToNewsletter}
                    submitComponentEvent={noOp}
                    logButtonClickWithBraze={logButtonClickWithBraze}
                />,
            );

            fireEvent.click(screen.getByText('Sign up'));

            await screen.findByText(/Thank you/);
            expect(logButtonClickWithBraze).toHaveBeenCalledWith(0);
        });
    });
});
