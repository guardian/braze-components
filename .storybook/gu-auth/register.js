import React from 'react';
import { addons, types } from '@storybook/addons';

import { GuAuth } from './GuAuth';

const GU_AUTH_ADDON_ID = 'guAuthAddon';
const GU_AUTH_PANEL_ID = `${GU_AUTH_ADDON_ID}/panel`;

if (process.env.STORYBOOK_DISABLE_AUTH !== 'true') {
    addons.register(GU_AUTH_ADDON_ID, () => {
        addons.add(GU_AUTH_PANEL_ID, {
            title: 'Gu Auth',
            type: types.TOOL,
            render: () => <GuAuth />,
            paramKey: 'guAuth', // This is the key under which parameters are expected in the addon config
        });
    });
}
