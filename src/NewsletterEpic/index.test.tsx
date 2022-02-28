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
            const noOpClickHandler = () => {};

            render(
                <NewsletterEpic
                    brazeMessageProps={brazeMessageProps}
                    subscribeToNewsletter={subscribeToNewsletter}
                    logButtonClickWithBraze={noOpClickHandler}
                    submitComponentEvent={noOpClickHandler}
                />,
            );

            fireEvent.click(screen.getByText('Sign up'));

            await screen.findByText(/Thank you/);
            expect(subscribeToNewsletter).toHaveBeenCalledWith(newsletterId);
        });

        it('reports clicks to Ophan and Braze with the correct ID', async () => {
            const subscribeToNewsletter = () => Promise.resolve();
            const logButtonClickWithBraze = jest.fn();
            const submitComponentEvent = jest.fn();
            render(
                <NewsletterEpic
                    brazeMessageProps={brazeMessageProps}
                    subscribeToNewsletter={subscribeToNewsletter}
                    logButtonClickWithBraze={logButtonClickWithBraze}
                    submitComponentEvent={submitComponentEvent}
                />,
            );

            fireEvent.click(screen.getByText('Sign up'));
            await screen.findByText(/Thank you/);

            expect(logButtonClickWithBraze).toHaveBeenCalledWith(0);
            expect(submitComponentEvent).toHaveBeenCalledWith({
                component: {
                    componentType: 'RETENTION_EPIC',
                    id: brazeMessageProps.ophanComponentId,
                },
                action: 'CLICK',
                value: '1',
            });
        });

        it('renders thank you when successful', async () => {
            const subscribeToNewsletter = () => Promise.resolve();
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const noOpClickHandler = () => {};

            render(
                <NewsletterEpic
                    brazeMessageProps={brazeMessageProps}
                    subscribeToNewsletter={subscribeToNewsletter}
                    logButtonClickWithBraze={noOpClickHandler}
                    submitComponentEvent={noOpClickHandler}
                />,
            );

            fireEvent.click(screen.getByText('Sign up'));

            await screen.findByText(/Thank you/);
        });
    });
});
