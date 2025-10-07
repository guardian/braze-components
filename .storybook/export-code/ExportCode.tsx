import React, { ReactElement, useCallback, useState } from 'react';
import { styled } from '@storybook/theming';
import { Icons, IconButton } from '@storybook/components';

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
 * Recursively copy element with computed styles applied inline
 */
function cloneElementWithStyles(originalElement: Element, iframeWindow: Window): Element {
    console.log('🔄 Cloning element:', originalElement.tagName, 'class:', originalElement.className);
    const clone = originalElement.cloneNode(false) as Element;
    
    // Apply computed styles - check if it's an element with style capabilities
    // Use nodeType check instead of instanceof to work across iframe boundaries
    if (originalElement.nodeType === Node.ELEMENT_NODE && originalElement.tagName) {
        console.log('✅ Processing HTML element:', originalElement.tagName, originalElement.className);
        
        try {
            const computed = iframeWindow.getComputedStyle(originalElement as Element);
            const styles: string[] = [];
            
            // Get ALL computed style properties
            for (let i = 0; i < computed.length; i++) {
                const prop = computed[i];
                const value = computed.getPropertyValue(prop);
                
                // Skip empty values and CSS variables
                if (value && !prop.startsWith('--')) {
                    styles.push(`${prop}: ${value}`);
                }
            }
            
            console.log('Extracted', styles.length, 'styles for', originalElement.tagName);
            
            if (styles.length > 0) {
                clone.setAttribute('style', styles.join('; '));
                console.log('Applied styles to', clone.tagName, ':', styles.slice(0, 3).join('; '), '...');
            }
        } catch (error) {
            console.warn('Could not get computed styles for', originalElement.tagName, ':', error);
        }
    }
    
    // Clone and process children
    for (let i = 0; i < originalElement.childNodes.length; i++) {
        const childNode = originalElement.childNodes[i];
        
        if (childNode.nodeType === Node.ELEMENT_NODE) {
            // Recursively clone child elements with styles
            const childClone = cloneElementWithStyles(childNode as Element, iframeWindow);
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
    const iframeWindow = previewIframe.contentWindow;
    const storyRoot = iframeDoc.querySelector('#storybook-root');

    if (!storyRoot) {
        alert('Could not find story content');
        return;
    }

    console.log('📋 Found story root:', storyRoot.tagName, storyRoot.className);
    console.log('👶 Story root children:', storyRoot.children.length);

    // Debug: Check if storyRoot has actual content
    console.log('🧱 Story root HTML (first 200 chars):', storyRoot.innerHTML.substring(0, 200));

    // Clone the root and all children with computed styles
    console.log('🔧 Starting cloneElementWithStyles...');
    const cloneWithStyles = cloneElementWithStyles(storyRoot, iframeWindow);
    console.log('✨ Clone completed');
    
    // Get the HTML with inline styles
    const html = cloneWithStyles.innerHTML;
    console.log('📄 Generated HTML length:', html.length);
    console.log('🔍 First 200 chars:', html.substring(0, 200));

    // Build the complete HTML export - just a div wrapper with all inline styles
    const completeHTML = `<div>
${html}
</div>`;

    // Copy to clipboard
    navigator.clipboard.writeText(completeHTML).then(
        () => {
            console.log('✅ HTML and CSS copied to clipboard!');
            console.log('Exported', html.length, 'characters of HTML');
        },
        (err) => {
            console.error('Could not copy to clipboard:', err);
            alert('Failed to copy to clipboard. Check console for the code.');
            console.log(completeHTML);
        }
    );
}

export const ExportCode = (): ReactElement => {
    const [copied, setCopied] = useState(false);

    const handleExport = useCallback(() => {
        exportCode();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    return (
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
    );
};
