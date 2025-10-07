# Export Code Feature - Usage Guide

## Quick Start

### What is it?
The "Export Code" feature allows you to copy optimized HTML and CSS of any Storybook component to your clipboard. Perfect for porting components to marketing platforms like Braze, email templates, or standalone HTML files while maintaining responsive design and keeping file sizes manageable.

### How to Use

1. **Open any Story**
   - Navigate to any component story in Storybook
   
2. **Find the Export Button**
   - Look for the "Export Code" button in the toolbar at the top of the preview
   - It has a download icon (↓) and is labeled "Export Code"
   
3. **Click to Export**
   - Click the button
   - You'll see "Copied!" confirmation message
   
4. **Paste in Target Platform**
   - Paste into Braze content blocks, email templates, or HTML files
   - The code is self-contained and ready to use
   - All responsive breakpoints work perfectly!

## What Gets Exported?

### ✅ Optimized Output Includes:
- **Wrapper div**: Essential html/body styles applied inline (font-smoothing, margins)
- **Style tag**: All component CSS classes, media queries, and @font-face declarations  
- **Component HTML**: Original structure with preserved CSS classes
- **Responsive design**: All breakpoints and media queries intact
- **Custom fonts**: @font-face declarations for Guardian typography
- **Compact size**: Typically 5-15KB instead of 50KB+ with full inline styles

### ✅ Perfect for Marketing Platforms:
- **Braze compatible**: Stays under character limits
- **Email templates**: Works in Mailchimp, Campaign Monitor, etc.
- **Responsive email**: Media queries work in modern email clients
- **Standalone pages**: Create landing pages or promotional content

### ❌ Filtered Out:
- Storybook UI styles and animations (sb-glow, etc.)
- Unnecessary inline styles on every element
- JavaScript functionality (only static HTML/CSS)
- Cross-origin stylesheets that can't be accessed

## Example Output

When you click "Export Code" on a banner component, you get:

```html
<div>
    <div style="display: flex; flex-direction: column; position: relative; box-sizing: border-box; background-color: rgb(255, 220, 0); padding: 16px 20px; color: rgb(18, 18, 18); font-family: 'Guardian Text Sans', sans-serif; font-size: 16px; line-height: 1.5; ...">
        <h2 style="margin: 0px 0px 8px; padding: 0px; font-weight: 700; font-size: 20px; line-height: 1.2; color: rgb(18, 18, 18); ...">
            Banner Title
        </h2>
        <p style="margin: 0px; padding: 0px; font-size: 16px; line-height: 1.5; color: rgb(51, 51, 51); ...">
            Banner description text
        </p>
    </div>
</div>
```

Every element has its complete computed style as an inline attribute - ready to paste anywhere!

## Use Cases

### 📧 Email Templates
Export components and adapt them for email HTML

### 📝 Documentation
Capture rendered examples for documentation

### 🔄 Migration
Port components to other frameworks or systems

### 🧪 Testing
Create static HTML test files

### 🎨 Design Handoff
Share pixel-perfect HTML/CSS with designers or developers

## Troubleshooting

### "Could not find preview iframe"
- Make sure you're on a story view (not docs view)
- Refresh the page and try again

### "Could not find story content"
- The story might still be loading
- Wait for the component to fully render

### Clipboard copy fails
- Check browser permissions for clipboard access
- The code will be logged to console as fallback
- Try using a different browser

### Missing styles
- Some external stylesheets may be blocked by CORS
- Inline styles and same-origin stylesheets are always captured
- Check the browser console for warnings about blocked stylesheets

## Browser Support

Works in all modern browsers that support:
- ES2020 JavaScript
- Clipboard API (`navigator.clipboard`)
- Iframe access

Tested in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
