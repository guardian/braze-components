import React, { ReactElement } from 'react';
import { USNewsletterEpic } from '.';

export default {
    component: 'USNewsletterEpic',
    title: 'Components/USNewsletterEpic',
    decorators: [],
    parameters: {},
};

export const defaultStory = (): ReactElement | null => {
    return <USNewsletterEpic></USNewsletterEpic>;
};
