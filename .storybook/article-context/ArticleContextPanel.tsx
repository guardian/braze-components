import { AddonPanel } from '@storybook/components';
import { API } from '@storybook/api';
import { guardianSectionIds } from './sectionIds';
import { useState } from 'react';

type Props = {
    active: boolean;
    api: API;
};

export const nonEmotionStyles: Record<string, React.CSSProperties> = {
    row: {
        display: 'flex',
        borderBottom: '1px solid rgba(0,0,0,.1)',
        margin: '0 15px',
        padding: '8px 0',
        justifyContent: 'space-between',
    },
    label: {
        display: 'flex',
        flexGrow: 1,
    },
    select: {
        appearance: 'none',
        border: '0 none',
        boxSizing: 'border-box',
        display: 'block',
        margin: '0',
        background: '#FFFFFF',
        padding: '6px 10px',
        fontSize: '13px',
        position: 'relative',
        flexGrow: 3,
        color: '#333333',
        borderRadius: '4px',
        boxShadow: 'rgb(0 0 0 / 10%) 0 0 0 1px inset',
        lineHeight: '20px',
    },
    textInput: {
        appearance: 'none',
        margin: '0px',
        background: 'rgb(255, 255, 255)',
        padding: '6px 10px',
        fontSize: '13px',
        color: 'rgb(51, 51, 51)',
        boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 0px 1px inset',
        borderRadius: '4px',
        lineHeight: '20px',
        flex: '1 1 0%',
        textAlign: 'left',
        overflow: 'visible',
    },
};

export const ArticleContextPanel = ({ active, api }: Props) => {
    const [selectedSection, setSelectedSection] = useState('');
    return (
        <AddonPanel active={active}>
            <div style={nonEmotionStyles.row}>
                <label htmlFor="section-dropdown" style={nonEmotionStyles.label}>
                    section
                </label>
                <select
                    id="section-dropdown"
                    onChange={(event) => setSelectedSection(event.target.value)}
                    style={nonEmotionStyles.select}
                >
                    {guardianSectionIds.map((id) => (
                        <option value={id}>{id}</option>
                    ))}
                </select>
            </div>
            <div style={nonEmotionStyles.row}>
                <input
                    value={selectedSection}
                    style={nonEmotionStyles.textInput}
                    placeholder="Select section from dropdown then copy it from here"
                ></input>
            </div>
        </AddonPanel>
    );
};
