import { AddonPanel } from '@storybook/components';
import { API } from '@storybook/api';
import { guardianSectionIds } from './sectionIds';
import { useState } from 'react';
import { useRef } from 'react';

type Props = {
    active: boolean;
    api: API;
};

export const nonEmotionStyles: Record<string, React.CSSProperties> = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    row: {
        borderBottom: '1px solid rgba(0,0,0,.1)',
        margin: '0 15px',
        padding: '8px 0',
    },
    label: {
        display: 'flex',
        flexGrow: 1,
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 2.7,
        paddingLeft: 12
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
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        border: '0 none',
        boxSizing: 'inherit',
        display: 'inline',
        margin: '0',
        background: '#FFFFFF',
        padding: '6px 10px',
        fontSize: '13px',
        position: 'relative',
        color: '#333333',
        boxShadow: 'rgb(0 0 0 / 10%) 0 0 0 1px inset',
        borderRadius: '4px',
        lineHeight: '20px',
        textAlign: 'left',
        overflow: 'visible',
        maxHeight: '400px',
    },
    copyButton: {
        borderColor: 'rgba(51, 51, 51, 0.2)',
        borderWidth: 1,
        whiteSpace: 'nowrap',
        margin: '0px',
        marginRight: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '1',
        background: 'rgb(250, 250, 250)',
        color: 'rgb(51, 51, 51)',
        borderRadius: '4px',
        padding: '10px 16px',
        display: 'inline',
        overflow: 'visible',
    },
    td: {
        padding: 12,
    },
    th: {
        textAlign: 'left',
        padding: 12,
        paddingLeft: 20,
        color: 'grey'
    },
    tableHeaderRow: {
        borderBottom: '1px solid rgb(128, 128, 128, 0.3)',
        height: 22,
    },
};

export const ArticleContextPanel = ({ active, api }: Props) => {
    const [selectedSection, setSelectedSection] = useState('');

    const inputRef = useRef<HTMLInputElement>();

    const onCopyClick = () => {
        inputRef.current.select();
        inputRef.current.setSelectionRange(0, 1000);
        navigator.clipboard.writeText(inputRef.current.value);
    };

    return (
        <AddonPanel active={active}>
            <table style={nonEmotionStyles.table}>
                <thead>
                    <tr style={nonEmotionStyles.tableHeaderRow}>
                        <th style={{ ...nonEmotionStyles.th, width: '25%' }}>Name</th>
                        <th style={{ ...nonEmotionStyles.th, width: '75%' }}>Control</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={nonEmotionStyles.row}>
                        <td style={nonEmotionStyles.td}>
                            <label htmlFor="section-dropdown" style={nonEmotionStyles.label}>
                                section
                            </label>
                        </td>
                        <td style={nonEmotionStyles.td}>
                            <select
                                id="section-dropdown"
                                onChange={(event) => setSelectedSection(event.target.value)}
                                style={nonEmotionStyles.select}
                            >
                                {guardianSectionIds.map((id) => (
                                    <option value={id}>{id}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr style={nonEmotionStyles.row}>
                        <td style={nonEmotionStyles.td}></td>
                        <td style={nonEmotionStyles.td}>
                            <button onClick={onCopyClick} style={nonEmotionStyles.copyButton}>
                                Copy
                            </button>
                            <input
                                ref={inputRef}
                                value={selectedSection}
                                style={nonEmotionStyles.textInput}
                                placeholder="Select section from dropdown then copy it from here"
                            ></input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </AddonPanel>
    );
};
