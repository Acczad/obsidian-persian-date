# Insert Jalali Date Plugin for Obsidian

A simple Obsidian plugin that allows you to insert the current Jalali (Persian) date into your markdown files.

## Features

- Insert current Jalali date with a single click using the ribbon icon
- Command palette integration for easy access
- **Full Shamsi date format** with Persian day names, month names, and year
- **Short date format** option (YYYY-MM-DD)
- **Accurate date conversion** using a reliable lookup table approach
- User-friendly error handling

## Installation

### Manual Installation

1. Download the latest release from this repository
2. Extract the files to your Obsidian vault's plugins folder: `{vault}/.obsidian/plugins/insert-jalali-date-plugin/`
3. Enable the plugin in Obsidian:
   - Go to Settings → Community plugins
   - Turn off Safe mode
   - Click "Refresh" and then "Browse"
   - Search for "Insert Jalali Date Plugin"
   - Click "Install" and then "Enable"

### Development Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the plugin
4. Copy the `main.js`, `manifest.json`, and `styles.css` (if any) files to your Obsidian plugins folder

## Usage

### Ribbon Icon

- Click the calendar icon in the left sidebar to insert the **full Shamsi date** at your cursor position

### Command Palette

- Press `Ctrl+P` (or `Cmd+P` on Mac) to open the command palette
- **"Insert Jalali Date (Full)"** - Inserts full Shamsi date with Persian text
- **"Insert Jalali Date (Short)"** - Inserts short date format (YYYY-MM-DD)

## Date Formats

### Full Shamsi Date Format

The plugin inserts dates in the format: `[Day Name] [Day] [Month Name] [Year]`

**Example:** `پنج‌شنبه ۱۵ فروردین ۱۴۰۳`

### Short Date Format

The plugin also supports short format: `YYYY-MM-DD`

**Example:** `1403-01-15`

## Date Conversion Algorithm

This plugin uses a reliable lookup table approach for Jalali date conversion that:

- Uses accurate year mappings for recent years (2020-2030)
- Calculates day of year and converts to Jalali month/day
- Handles leap years correctly
- Provides fallback calculation for other years
- No external dependencies required

## Development

### Building the Plugin

```bash
npm install
npm run build
```

### Project Structure

- `main.ts` - Main plugin code with Jalali date conversion
- `manifest.json` - Plugin manifest for Obsidian
- `obsidian.d.ts` - TypeScript definitions for Obsidian API
- `rollup.config.js` - Build configuration
- `tsconfig.json` - TypeScript configuration

## License

This project is open source and available under the MIT License.

## Author

Farzad Dehghani
