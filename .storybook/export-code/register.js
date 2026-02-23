import * as React from 'react';
import { addons, types } from '@storybook/manager-api';
import { ExportCode } from './ExportCode';

const ADDON_ID = 'exportcode';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Export Code',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ExportCode />,
  });
});
