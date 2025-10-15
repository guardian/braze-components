# Export Code Storybook Addon

This addon adds a comprehensive export toolkit to the Storybook toolbar, enabling you to copy optimized HTML and CSS of any component story to your clipboard, open Braze previews, and add personalization templates. Perfect for porting components to marketing platforms like Braze, email templates, or standalone HTML files.

## Features

### 🚀 Export Code
- **Compact output**: Preserves original CSS classes instead of bloated inline styles
- **Responsive design**: All media queries and breakpoints are fully preserved
- **Complete styling**: Includes all component CSS classes and @font-face declarations
- **Clean structure**: Only applies essential html/body styles inline to the wrapper div
- **Braze-compatible**: Output stays well under character limits for marketing platforms (typically 5-15KB vs 50KB+ with inline styles)
- **One-click export**: Copy to clipboard with visual feedback

### 🌐 Braze Integration
- **Direct Braze access**: "Open Braze Preview" button opens Braze content block editor in new tab
- **Seamless workflow**: Export code, then immediately paste into Braze for testing
- **Pre-configured URL**: Opens the Guardian's Braze dashboard content block creation page

### 👤 Personalization Templates
- **Interactive dialog**: "Add Personalization" opens a guided personalization builder
- **Multiple categories**: Basic user info, custom attributes, device information, and event properties
- **Smart templates**: Pre-built Liquid templates for common personalization scenarios
- **Custom attributes**: Support for user-defined custom attribute names
- **Default values**: Optional fallback values when personalization data is unavailable
- **Live preview**: See the generated Liquid template before copying
- **One-click copy**: Generated personalization templates copied directly to clipboard

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

### Export Code
1. Navigate to any story in Storybook
2. Click the "Export Code" button in the toolbar (download icon)
3. The optimized HTML and CSS will be copied to your clipboard
4. Paste the code into Braze, email templates, or any system that supports CSS

### Braze Preview
1. Click the "Open Braze Preview" button (browser icon) 
2. A new tab opens to the Guardian's Braze content block editor
3. Paste your exported code directly into the HTML editor for testing

### Add Personalization
1. Click the "Add Personalization" button (user icon)
2. Select a personalization category (Basic User Information, Custom Attributes, etc.)
3. Choose the specific attribute you want to personalize
4. For custom attributes, enter the exact attribute name as defined in Braze
5. Optionally add a default value to show when data is unavailable
6. Preview the generated Liquid template
7. Click "Copy to Clipboard" to copy the personalization code
8. Paste directly into your HTML templates or Braze content blocks

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
- **Small file size**: Typically 5-15KB vs 50KB+ with full inline styles  
- **Responsive design**: Media queries work perfectly
- **Easy maintenance**: CSS classes can be updated without touching HTML
- **Platform compatibility**: Works with Braze, Mailchimp, and other marketing tools

## Personalization Categories

The personalization system supports the following categories:

### Basic User Information
- First Name, Last Name, Email Address
- User ID, Language, Country, Time Zone
- Example: `{{ ${first_name} | default: 'Valued User' }}`

### Custom Attributes  
- Custom text, number, date, and boolean attributes
- User-defined attribute names
- Example: `{{ custom_attribute.${subscription_tier} | default: 'standard' }}`

### Device Information
- Most recent app version, platform, device carrier
- Example: `{{ ${most_recent_platform} | default: 'mobile' }}`

### Event Properties
- Custom event properties from user interactions
- Example: `{{ event_properties.${purchase_category} | default: 'general' }}`

All personalization templates support optional default values using Braze's Liquid syntax, ensuring graceful fallbacks when personalization data is unavailable.
