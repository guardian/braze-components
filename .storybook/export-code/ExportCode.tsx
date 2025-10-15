import React, { ReactElement, useCallback, useState } from 'react';
import { styled } from '@storybook/theming';
import { Icons, IconButton } from '@storybook/components';
import { PersonalizationDialog } from './PersonalizationDialog';

const ButtonsContainer = styled.div(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
}));

const IconButtonWithLabel = styled(IconButton)(() => ({
    display: 'inline-flex',
    alignItems: 'center',
}));

const IconButtonLabel = styled.div<{}>(({ theme }) => ({
    fontSize: theme.typography.size.s2 - 1,
    marginLeft: 10,
}));

const CopiedMessage = styled.div<{}>(({ theme }) => ({
    fontSize: theme.typography.size.s2 - 1,
    marginLeft: 10,
    color: theme.color.positive,
}));

/**
 * Recursively copy element preserving classes and structure (no inline styles)
 */
function cloneElement(originalElement: Element): Element {
    console.log(
        '🔄 Cloning element:',
        originalElement.tagName,
        'class:',
        originalElement.className,
    );
    const clone = originalElement.cloneNode(false) as Element;

    // Clone and process children
    for (let i = 0; i < originalElement.childNodes.length; i++) {
        const childNode = originalElement.childNodes[i];

        if (childNode.nodeType === Node.ELEMENT_NODE) {
            // Recursively clone child elements
            const childClone = cloneElement(childNode as Element);
            clone.appendChild(childClone);
        } else {
            // Clone text nodes and other node types directly
            clone.appendChild(childNode.cloneNode(true));
        }
    }

    return clone;
}

/**
 * Export the rendered HTML and CSS to clipboard
 */
function exportCode(): void {
    console.log('🚀 Starting export...');

    // Access the iframe containing the story
    const previewIframe = document.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;

    if (!previewIframe || !previewIframe.contentDocument || !previewIframe.contentWindow) {
        alert('Could not find preview iframe');
        return;
    }

    const iframeDoc = previewIframe.contentDocument;
    const storyRoot = iframeDoc.querySelector('#storybook-root');

    if (!storyRoot) {
        alert('Could not find story content');
        return;
    }

    console.log('📋 Found story root:', storyRoot.tagName, storyRoot.className);
    console.log('👶 Story root children:', storyRoot.children.length);

    // Clone the root and all children preserving original classes
    console.log('🔧 Starting cloneElementPreservingClasses...');
    const cloneWithClasses = cloneElement(storyRoot);
    console.log('✨ Clone completed');

    // Process the cloned content to fix style issues
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cloneWithClasses.innerHTML;

    // Get all stylesheets from the iframe (including the ones injected by Emotion/styled-components)
    let allCSS = '';
    let htmlBodyStyles = '';

    // Extract styles from iframe's stylesheets
    Array.from(iframeDoc.styleSheets).forEach((stylesheet) => {
        try {
            Array.from(stylesheet.cssRules || []).forEach((rule) => {
                const cssText = rule.cssText;

                // Skip Storybook-specific CSS rules
                if (
                    cssText.includes('sb-') ||
                    cssText.includes('storybook') ||
                    cssText.includes('@keyframes sb-') ||
                    cssText.includes('sb-glow') ||
                    cssText.includes('sb-show') ||
                    cssText.includes('sb-') ||
                    cssText.includes('#storybook-root') ||
                    cssText.includes('#docs-root')
                ) {
                    return; // Skip this rule
                }

                // Extract html and body styles
                if (cssText.includes('html {') || cssText.includes('body {')) {
                    const htmlMatch = cssText.match(/html\s*{([^}]*)}/);
                    const bodyMatch = cssText.match(/body\s*{([^}]*)}/);

                    if (htmlMatch && htmlMatch[1]) {
                        htmlBodyStyles += htmlMatch[1].trim() + '; ';
                    }
                    if (bodyMatch && bodyMatch[1]) {
                        htmlBodyStyles += bodyMatch[1].trim() + '; ';
                    }
                } else {
                    // Keep all other CSS rules (component styles, @font-face, etc.)
                    allCSS += cssText + '\n';
                }
            });
        } catch (e) {
            // Some stylesheets might be cross-origin and inaccessible
            console.warn('Could not access stylesheet:', e);
        }
    });

    // Update or create style tag with the iframe's CSS
    let styleTag = tempDiv.querySelector('style');
    if (!styleTag) {
        styleTag = document.createElement('style');
        tempDiv.insertBefore(styleTag, tempDiv.firstChild);
    }

    styleTag.textContent = allCSS;

    // Get the processed HTML
    let html = tempDiv.innerHTML;

    console.log('📄 Generated HTML length:', html.length);
    console.log('🔍 First 200 chars:', html.substring(0, 200));

    // Build the complete HTML export with html/body styles applied to wrapper
    const wrapperStyles = htmlBodyStyles
        ? ` style="${htmlBodyStyles.replace(/"/g, '&quot;')}"`
        : '';
    const completeHTML = `<div${wrapperStyles}>
${html}
</div>`;

    // Copy to clipboard
    navigator.clipboard.writeText(completeHTML).then(
        () => {
            console.log('✅ HTML and CSS copied to clipboard!');
            console.log('Exported', completeHTML.length, 'characters of HTML');
        },
        (err) => {
            console.error('Could not copy to clipboard:', err);
            alert('Failed to copy to clipboard. Check console for the code.');
            console.log(completeHTML);
        },
    );
}

export const ExportCode = (): ReactElement => {
    const [copied, setCopied] = useState(false);
    const [isPersonalizationDialogOpen, setIsPersonalizationDialogOpen] = useState(false);

    const handleExport = useCallback(() => {
        exportCode();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const handleBrazePreview = useCallback(() => {
        const brazeUrl =
            'https://dashboard-01.braze.eu/engagement/templates_and_media/content_blocks/5b75934336dc781764d855ae/new?editor=HTML';
        window.open(brazeUrl, '_blank');
    }, []);

    const handlePersonalizationClick = useCallback(() => {
        setIsPersonalizationDialogOpen(true);
    }, []);

    const handlePersonalizationClose = useCallback(() => {
        setIsPersonalizationDialogOpen(false);
    }, []);

    const handlePersonalizationInsert = useCallback((template: string) => {
        // Get the currently focused input element
        const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
        
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            // Insert into the focused input field
            const start = activeElement.selectionStart || 0;
            const end = activeElement.selectionEnd || 0;
            const currentValue = activeElement.value;
            
            const newValue = 
                currentValue.substring(0, start) + 
                template + 
                currentValue.substring(end);
            
            activeElement.value = newValue;
            
            // Set cursor position after inserted text
            const newCursorPosition = start + template.length;
            activeElement.setSelectionRange(newCursorPosition, newCursorPosition);
            
            // Trigger input event to notify of changes
            activeElement.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            // No input field focused, copy to clipboard
            navigator.clipboard.writeText(template).then(
                () => {
                    console.log('✅ Personalization template copied to clipboard!');
                },
                (err) => {
                    console.error('Could not copy to clipboard:', err);
                    alert(`Failed to copy to clipboard. Template: ${template}`);
                }
            );
        }
    }, []);

    return (
        <>
            <ButtonsContainer>
                <IconButtonWithLabel
                    key="exportcode"
                    title="Export HTML and CSS to clipboard"
                    onClick={handleExport}
                >
                    <Icons icon="download" />
                    {copied ? (
                        <CopiedMessage>Copied!</CopiedMessage>
                    ) : (
                        <IconButtonLabel>Export Code</IconButtonLabel>
                    )}
                </IconButtonWithLabel>
                <IconButtonWithLabel
                    key="brazepreview"
                    title="Open Braze Preview in a new tab"
                    onClick={handleBrazePreview}
                >
                    <Icons icon="browser" />
                    <IconButtonLabel>Open Braze Preview</IconButtonLabel>
                </IconButtonWithLabel>
                <IconButtonWithLabel
                    key="personalization"
                    title="Add Braze personalization template"
                    onClick={handlePersonalizationClick}
                >
                    <Icons icon="user" />
                    <IconButtonLabel>Add Personalization</IconButtonLabel>
                </IconButtonWithLabel>
            </ButtonsContainer>
            <PersonalizationDialog
                isOpen={isPersonalizationDialogOpen}
                onClose={handlePersonalizationClose}
                onInsert={handlePersonalizationInsert}
            />
        </>
    );
};
