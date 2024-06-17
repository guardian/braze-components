import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { ArticleContextPanel } from './ArticleContextPanel';

const ARTICLE_CONTEXT_ADDON_ID = 'articleContextAddon';
const ARTICLE_CONTEXT_PANEL_ID = `${ARTICLE_CONTEXT_ADDON_ID}/panel`;

addons.register(ARTICLE_CONTEXT_ADDON_ID, (api) => {
    addons.add(ARTICLE_CONTEXT_PANEL_ID, {
        title: 'Article Context Filters',
        type: types.PANEL,
        render: ({ active }) => <ArticleContextPanel api={api} active={active} />,
        paramKey: 'articleContext', // This is the key under which parameters are expected in the addon config
    });
});
