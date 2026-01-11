# Development Setup

This guide covers setting up a development environment for DuelingBookEnhanced.

## Prerequisites

- **Node.js**: Version 18.x or 20.x (LTS recommended)
- **npm**: Comes with Node.js
- **Chrome Browser**: For testing the extension
- **Git**: For version control

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/alexjraymond/DuelingBookEnhanced.git
cd DuelingBookEnhanced
```

### 2. Install Dependencies

```bash
npm install
```

This installs all dependencies listed in `package.json`, including:

- TypeScript and type definitions
- React and React DOM
- Webpack and build tools
- ESLint and Prettier
- Testing tools (Jest)

### 3. Build the Extension

```bash
npm run build
```

This:

1. Compiles TypeScript to JavaScript
2. Bundles code with Webpack
3. Processes Tailwind CSS
4. Outputs to `dist/` directory

### 4. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `dist/` directory from the project root
5. Extension should appear in your extensions list

### 5. Test the Extension

1. Navigate to `https://www.duelingbook.com/html5`
2. Click the extension icon to open the popup
3. Test features (hotkeys, dark mode, etc.)

## Development Workflow

### Watch Mode (Recommended)

For active development, use watch mode to rebuild automatically:

```bash
npm start
# or
npm run watch
```

This:

- Watches for file changes
- Rebuilds automatically on save
- Faster than full build (incremental compilation)

**Important**: After code changes, you still need to:

1. Reload the extension in Chrome (`chrome://extensions/` → Reload)
2. Refresh the DuelingBook page (for content script changes)

### Manual Build

For production builds:

```bash
npm run build
```

### Clean Build

To start fresh:

```bash
npm run clean  # Removes dist/ directory
npm run build  # Rebuild from scratch
```

## Project Structure

```
DuelingBookEnhanced/
├── src/              # Source code
│   ├── entry/        # Entry points (popup, options, content script, background)
│   ├── handlers/     # Content script handlers
│   ├── services/     # Service layer (storage, messaging, logging)
│   ├── utilities/    # Utility functions
│   ├── components/   # React components
│   ├── pages/        # Page-level components
│   ├── data/         # Configuration data
│   ├── types/        # TypeScript types
│   └── styles/       # CSS files
├── dist/             # Built extension (generated)
├── public/           # Static files (manifest, HTML)
├── webpack/          # Webpack configuration
├── docs/             # Developer documentation
└── package.json      # Dependencies and scripts
```

## Code Quality Tools

### Formatting

**Prettier** is configured for code formatting:

```bash
npm run format        # Format all files
npm run format:check  # Check formatting (for CI)
```

**Configuration**: Uses Prettier defaults (no custom config file yet)

### Linting

**ESLint** is configured for code quality:

```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Auto-fix linting errors
```

**Configuration**: `.eslintrc.json` (TypeScript + React rules)

### Pre-commit Hooks

**Husky** runs pre-commit checks:

- Prettier formatting
- ESLint checks
- TypeScript type checking (via ESLint)

Configured in `.husky/pre-commit` (if set up)

## Testing

### Run Tests

```bash
npm test
```

**Test Framework**: Jest with TypeScript support

**Test Files**: `*.test.ts` or `*.test.tsx` files

**Note**: Test coverage is currently minimal. See [Testing Strategy](./testing.md) for details.

## TypeScript Configuration

TypeScript config is in `tsconfig.json`:

- **Target**: ES2020
- **Module**: ESNext
- **JSX**: React
- **Strict**: Enabled

Type definitions for Chrome APIs are in `@types/chrome`.

## Common Issues

### Extension Not Loading

- **Check**: `dist/` directory exists and contains files
- **Check**: `manifest.json` is in `dist/` directory
- **Check**: Build completed without errors

### Changes Not Appearing

1. **Rebuild**: Run `npm run build` or `npm start`
2. **Reload Extension**: In `chrome://extensions/` → Click Reload
3. **Refresh Page**: Refresh the DuelingBook page (for content script changes)
4. **Reopen Popup**: Close and reopen popup (for popup changes)

### TypeScript Errors

- **Check**: All imports are correct
- **Check**: Types are defined in `src/types/`
- **Check**: Type definitions are installed (`@types/*` packages)

### Build Errors

- **Check**: Node.js version (18.x or 20.x)
- **Check**: Dependencies installed (`npm install`)
- **Check**: Webpack config is valid
- **Clean Build**: Try `npm run clean && npm run build`

## IDE Setup

### Recommended: VS Code

**Extensions**:

- ESLint
- Prettier
- TypeScript and JavaScript Language Features (built-in)

**Settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Other IDEs

- **WebStorm**: Good TypeScript/React support
- **Sublime Text**: Use TypeScript and Prettier plugins
- **Atom**: Use atom-typescript and prettier-atom

## Next Steps

- [Build Process](./build-process.md) - Understanding the build system
- [Adding Features](../contributing/adding-features.md) - How to add new features
- [Debugging](./debugging.md) - Debugging techniques
