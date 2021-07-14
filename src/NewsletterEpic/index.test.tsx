/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NewsletterEpic } from '.';

describe('NewsletterEpic', () => {
    describe('when the sign up button is clicked', () => {
        it('calls subscribeToNewsletter with the correct id', () => {
            const logButtonClickWithOphan = () => {
                return;
            };
            const logButtonClickWithBraze = () => {
                return;
            };
            const newsletterId = '4156';
            const brazeMessageProps = {
                header: 'First Thing',
                frequency: 'Every day',
                paragraph1: 'Start your day with...',
                imageUrl:
                    'https://i.guim.co.uk/img/media/d0944e021b1cc7426f515fecc8034f12b7862041/0_0_784_784/784.png?width=196&s=fbdead3f454e1ceeeab260ffde71100a',
                newsletterId,
            };
            const subscribeToNewsletter = jest.fn();

            const { getByText } = render(
                <NewsletterEpic
                    submitComponentEvent={logButtonClickWithOphan}
                    logButtonClickWithBraze={logButtonClickWithBraze}
                    brazeMessageProps={brazeMessageProps}
                    subscribeToNewsletter={subscribeToNewsletter}
                />,
            );

            fireEvent.click(getByText('Sign up'));

            expect(subscribeToNewsletter).toHaveBeenCalledWith(newsletterId);
        });
    });
});
