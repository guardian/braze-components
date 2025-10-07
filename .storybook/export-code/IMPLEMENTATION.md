# Export Code Feature - Implementation Summary

## Overview
A new Storybook addon that intelligently exports optimized HTML and CSS of any component. Designed specifically for marketing platforms like Braze, the addon produces compact, responsive output by preserving CSS classes instead of bloated inline styles.

## Files Created/Modified

### Created Files:
1. **`.storybook/export-code/ExportCode.tsx`** - The main React component for the export functionality
2. **`.storybook/export-code/register.js`** - Addon registration file
3. **`.storybook/export-code/README.md`** - Documentation for the feature

### Modified Files:
1. **`.storybook/main.js`** - Added `'./export-code/register.js'` to the addons array

## How It Works

### User Experience:
1. User navigates to any story in Storybook
2. Clicks the "Export Code" button in the toolbar (appears next to other toolbar buttons)
3. The complete HTML and CSS is copied to the clipboard
4. A "Copied!" message appears briefly to confirm success

### Technical Implementation:
1. **Addon Registration**: Registered as a `TOOL` type addon that appears in the toolbar
2. **DOM Cloning**: Clones `#storybook-root` structure while preserving original CSS classes
3. **Smart CSS Extraction**: 
   - Extracts CSS rules from iframe stylesheets (not computed styles)
   - Filters out Storybook UI styles (sb-glow animations, etc.)
   - Preserves component CSS classes and media queries
   - Extracts html/body styles for inline application to wrapper
4. **Optimized Output**: 
   - Wrapper div with essential html/body styles inline
   - Style tag with component CSS classes and responsive rules
   - Component HTML with original CSS classes intact
5. **Platform Compatibility**: Output optimized for Braze character limits and email clients

### Output Format:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Component</title>
    <style>
    /* Extracted CSS */
    ...all CSS rules from stylesheets...
    </style>
</head>
<body>
    ...rendered HTML from the component...
</body>
</html>
```

## Key Features

✅ **Complete CSS Extraction** - Captures all styles from stylesheets
✅ **Standalone HTML** - Generates a complete, portable HTML document
✅ **Visual Feedback** - Shows "Copied!" message on successful export
✅ **Error Handling** - Gracefully handles CORS restrictions and clipboard errors
✅ **Consistent UI** - Follows the same pattern as existing toolbar addons (GuPreview)

## Limitations

⚠️ **CORS Restrictions**: Cannot access CSS from external stylesheets on different domains
⚠️ **Dynamic Styles**: Best effort extraction of CSS-in-JS and inline styles

## Testing

To test the feature:
1. Run `./bin/storybook` or `yarn storybook`
2. Navigate to any story
3. Look for the "Export Code" button in the toolbar (download icon)
4. Click it and paste the clipboard content to verify

## Dependencies

The feature uses existing Storybook dependencies:
- `@storybook/manager-api` - For addon registration
- `@storybook/components` - For UI components (IconButton, Icons)
- `@storybook/theming` - For styled components
- Native Clipboard API - For copying to clipboard

No additional packages need to be installed.
