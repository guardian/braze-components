import React, { useState, useCallback, useMemo } from 'react';
import { styled } from '@storybook/theming';
import { Button } from '@storybook/components';
import { PERSONALIZATION_CATEGORIES, DEFAULT_VALUES, PersonalizationOption } from './personalizationData';

interface PersonalizationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (template: string) => void;
}

const Overlay = styled.div<{}>(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
}));

const DialogContainer = styled.div<{}>(({ theme }) => ({
    backgroundColor: theme.background.content,
    borderRadius: 8,
    padding: 24,
    width: 500,
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    border: `1px solid ${theme.appBorderColor}`,
}));

const DialogHeader = styled.h2<{}>(({ theme }) => ({
    margin: '0 0 20px 0',
    fontSize: theme.typography.size.l1,
    fontWeight: 600,
    color: theme.color.defaultText,
}));

const FormGroup = styled.div(() => ({
    marginBottom: 16,
}));

const Label = styled.label<{}>(({ theme }) => ({
    display: 'block',
    marginBottom: 8,
    fontSize: theme.typography.size.s2,
    fontWeight: 500,
    color: theme.color.defaultText,
}));

const Select = styled.select<{}>(({ theme }) => ({
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${theme.appBorderColor}`,
    borderRadius: 4,
    fontSize: theme.typography.size.s2,
    backgroundColor: theme.input.background,
    color: theme.color.defaultText,
    '&:focus': {
        outline: 'none',
        borderColor: theme.color.secondary,
        boxShadow: `0 0 0 1px ${theme.color.secondary}`,
    },
}));

const Input = styled.input<{}>(({ theme }) => ({
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${theme.appBorderColor}`,
    borderRadius: 4,
    fontSize: theme.typography.size.s2,
    backgroundColor: theme.input.background,
    color: theme.color.defaultText,
    '&:focus': {
        outline: 'none',
        borderColor: theme.color.secondary,
        boxShadow: `0 0 0 1px ${theme.color.secondary}`,
    },
}));

const PreviewContainer = styled.div<{}>(({ theme }) => ({
    padding: 12,
    backgroundColor: theme.background.app,
    border: `1px solid ${theme.appBorderColor}`,
    borderRadius: 4,
    marginTop: 16,
}));

const PreviewLabel = styled.div<{}>(({ theme }) => ({
    fontSize: theme.typography.size.s1,
    color: theme.color.mediumdark,
    marginBottom: 4,
}));

const PreviewCode = styled.code<{}>(({ theme }) => ({
    fontSize: theme.typography.size.s2,
    fontFamily: theme.typography.fonts.mono,
    color: theme.color.defaultText,
    backgroundColor: 'transparent',
    border: 'none',
}));

const ButtonGroup = styled.div(() => ({
    display: 'flex',
    gap: 12,
    justifyContent: 'flex-end',
    marginTop: 24,
}));

const Description = styled.div<{}>(({ theme }) => ({
    fontSize: theme.typography.size.s1,
    color: theme.color.mediumdark,
    marginTop: 4,
    fontStyle: 'italic',
}));

export const PersonalizationDialog: React.FC<PersonalizationDialogProps> = ({
    isOpen,
    onClose,
    onInsert,
}) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAttribute, setSelectedAttribute] = useState('');
    const [customAttributeName, setCustomAttributeName] = useState('');
    const [defaultValue, setDefaultValue] = useState('');

    // Get available options for selected category
    const availableOptions = useMemo(() => {
        const category = PERSONALIZATION_CATEGORIES.find(cat => cat.label === selectedCategory);
        return category?.options || [];
    }, [selectedCategory]);

    // Get selected option
    const selectedOption = useMemo(() => {
        return availableOptions.find(option => option.value === selectedAttribute);
    }, [availableOptions, selectedAttribute]);

    // Generate the liquid template
    const liquidTemplate = useMemo(() => {
        if (!selectedOption) return '';

        let template = selectedOption.template;
        
        // Handle custom attributes that need attribute name replacement
        if (template.includes('ATTRIBUTE_NAME') && customAttributeName) {
            template = template.replace('ATTRIBUTE_NAME', customAttributeName);
        }
        
        // Add default value if provided
        if (defaultValue.trim()) {
            // Remove closing braces and add default filter with proper spacing
            template = template.replace(' }}', ` | default: '${defaultValue.trim()}' }}`);
        }

        return template;
    }, [selectedOption, customAttributeName, defaultValue]);

    const handleCopyToClipboard = useCallback(() => {
        if (liquidTemplate) {
            navigator.clipboard.writeText(liquidTemplate).then(
                () => {
                    console.log('✅ Personalization template copied to clipboard!');
                    onInsert(liquidTemplate); // Still call this for any additional logic
                    onClose();
                },
                (err) => {
                    console.error('Could not copy to clipboard:', err);
                    alert(`Failed to copy to clipboard. Template: ${liquidTemplate}`);
                }
            );
        }
    }, [liquidTemplate, onInsert, onClose]);

    const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedAttribute('');
        setCustomAttributeName('');
        setDefaultValue('');
    }, []);

    const handleAttributeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAttribute(e.target.value);
        setCustomAttributeName('');
        
        // Set default value suggestions based on the selected attribute
        const option = availableOptions.find(opt => opt.value === e.target.value);
        if (option && DEFAULT_VALUES[option.value as keyof typeof DEFAULT_VALUES]) {
            setDefaultValue(DEFAULT_VALUES[option.value as keyof typeof DEFAULT_VALUES]);
        } else if (option?.value.startsWith('custom_')) {
            setDefaultValue(DEFAULT_VALUES.custom_default);
        } else {
            setDefaultValue('');
        }
    }, [availableOptions]);

    const needsCustomAttributeName = selectedOption?.template.includes('ATTRIBUTE_NAME');

    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <DialogContainer onClick={(e) => e.stopPropagation()}>
                <DialogHeader>Add Personalization</DialogHeader>
                
                <FormGroup>
                    <Label htmlFor="category">Personalization Type</Label>
                    <Select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select a category...</option>
                        {PERSONALIZATION_CATEGORIES.map(category => (
                            <option key={category.label} value={category.label}>
                                {category.label}
                            </option>
                        ))}
                    </Select>
                </FormGroup>

                {selectedCategory && (
                    <FormGroup>
                        <Label htmlFor="attribute">Attribute</Label>
                        <Select
                            id="attribute"
                            value={selectedAttribute}
                            onChange={handleAttributeChange}
                        >
                            <option value="">Select an attribute...</option>
                            {availableOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                        {selectedOption && (
                            <Description>{selectedOption.description}</Description>
                        )}
                    </FormGroup>
                )}

                {needsCustomAttributeName && (
                    <FormGroup>
                        <Label htmlFor="customName">Custom Attribute Name</Label>
                        <Input
                            id="customName"
                            type="text"
                            value={customAttributeName}
                            onChange={(e) => setCustomAttributeName(e.target.value)}
                            placeholder="e.g., subscription_tier, favorite_color"
                        />
                        <Description>
                            Enter the exact name of your custom attribute as defined in Braze
                        </Description>
                    </FormGroup>
                )}

                {selectedOption && (
                    <FormGroup>
                        <Label htmlFor="defaultValue">Default Value (Optional)</Label>
                        <Input
                            id="defaultValue"
                            type="text"
                            value={defaultValue}
                            onChange={(e) => setDefaultValue(e.target.value)}
                            placeholder="Value to show if attribute is empty"
                        />
                        <Description>
                            This value will be shown if the personalization data is not available
                        </Description>
                    </FormGroup>
                )}

                {liquidTemplate && (
                    <PreviewContainer>
                        <PreviewLabel>Preview:</PreviewLabel>
                        <PreviewCode>{liquidTemplate}</PreviewCode>
                    </PreviewContainer>
                )}

                <ButtonGroup>
                    <Button onClick={onClose} secondary>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleCopyToClipboard} 
                        primary
                        disabled={!liquidTemplate || (needsCustomAttributeName && !customAttributeName.trim())}
                    >
                        Copy to Clipboard
                    </Button>
                </ButtonGroup>
            </DialogContainer>
        </Overlay>
    );
};