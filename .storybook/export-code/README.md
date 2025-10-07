# Export Code Storybook Addon

This addon adds an "Export Code" button to the Storybook toolbar that allows you to copy the rendered HTML and CSS of any component story to your clipboard. Perfect for porting components to other systems like Braze, email templates, or standalone HTML files.

## Features

- **Compact output**: Preserves original CSS classes instead of bloated inline styles
- **Responsive design**: All media queries and breakpoints are fully preserved
- **Complete styling**: Includes all component CSS classes and @font-face declarations
- **Clean structure**: Only applies essential html/body styles inline to the wrapper div
- **Braze-compatible**: Output stays well under character limits for marketing platforms
- **One-click export**: Copy to clipboard with visual feedback

## How It Works

The addon extracts styles intelligently:

1. **Preserves CSS classes**: Elements keep their original Emotion/styled-component classes (e.g., `css-12mi0fd-StorybookWrapper`)
2. **Includes all component CSS**: Extracts CSS rules from iframe stylesheets, including media queries
3. **Filters out Storybook UI**: Removes Storybook-specific animations and UI styles
4. **Applies essential styles**: Only html/body styles (font-smoothing, margins) are applied inline to wrapper
5. **Maintains responsiveness**: All `@media` queries remain intact and functional

## Installation

This addon is already configured for this Storybook instance. The files are located in `.storybook/export-code/`.

## Usage

1. Navigate to any story in Storybook
2. Click the "Export Code" button in the toolbar (download icon with "Export Code" label)
3. The optimized HTML and CSS will be copied to your clipboard
4. Paste the code into Braze, email templates, or any system that supports CSS

## Output Structure

The exported code follows this structure:

```html
<div style="-webkit-font-smoothing: antialiased; margin: 0px;">
  <style>
    /* All component CSS classes and rules */
    .css-abc123-component { ... }
    @media (max-width: 768px) { ... }
    @font-face { ... }
  </style>
  <div class="css-abc123-component">
    <!-- Your component HTML with original classes -->
  </div>
</div>
```

This approach ensures:
- **Small file size**: Typically under 10KB vs 50KB+ with full inline styles
- **Responsive design**: Media queries work perfectly
- **Easy maintenance**: CSS classes can be updated without touching HTML
- **Platform compatibility**: Works with Braze, Mailchimp, and other marketing tools
