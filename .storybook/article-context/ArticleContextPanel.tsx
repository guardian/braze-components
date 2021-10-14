import { AddonPanel } from '@storybook/components';
import { API } from '@storybook/api';
import { guardianSectionIds } from './sectionIds';
import { useState } from 'react';

type Props = {
    active: boolean;
    api: API;
};

export const ArticleContextPanel = ({active, api}: Props) => {
    const [selectedSection, setSelectedSection] = useState('');
    return <AddonPanel active={active}>
        <select onChange={(event) => setSelectedSection(event.target.value)}>
            {guardianSectionIds.map((id) => <option value={id}>{id}</option>)}
        </select>
        <input value={selectedSection}></input>
    </AddonPanel>
}
