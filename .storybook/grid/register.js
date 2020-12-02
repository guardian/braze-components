import React from 'react';
import { addons, types } from '@storybook/addons';
import { GridPanel } from './GridPanel';

const GRID_ADDON_ID = 'gridAddon';
const GRID_PANEL_ID = `${GRID_ADDON_ID}/panel`;

addons.register(GRID_ADDON_ID, (api) => {
    addons.add(GRID_PANEL_ID, {
        title: 'Grid Image Picker',
        type: types.PANEL,
        render: ({ active, key }) => <GridPanel api={api} active={active} key={key} />,
        paramKey: 'grid', // This is the key under which parameters are expected in the addon config
    });
});
