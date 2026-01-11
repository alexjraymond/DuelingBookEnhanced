# Build Process

This document explains how the extension is built and bundled.

## Build System

The extension uses **Webpack 5** for bundling and **TypeScript** for compilation.

## Build Steps

### 1. TypeScript Compilation

```bash
npx tsc
```

- Compiles TypeScript files to JavaScript
- Type checking (ensures type safety)
- Outputs to temporary directory (or in-memory for watch mode)

**Configuration**: `tsconfig.json`

### 2. Webpack Bundling

```bash
webpack --config webpack/webpack.prod.js
```

Webpack bundles all entry points:

- **popup.js**: Popup UI (React)
- **options.js**: Options page (React)
- **content_script.js**: Content script (TypeScript)
- **background.js**: Background service worker (TypeScript)
- **updatePage.js**: Update page (React)
- **vendor.js**: Shared dependencies (React, lodash, etc.)

**Configuration Files**:

- `webpack/webpack.common.js`: Shared configuration
- `webpack/webpack.dev.js`: Development configuration
- `webpack/webpack.prod.js`: Production configuration

### 3. Tailwind CSS Processing

```bash
npm run build:tailwind
```

- Processes Tailwind CSS from `src/styles/tailwind.css`
- Outputs to `dist/css/output.css`
- Includes only used classes (purge CSS)

**Configuration**: `tailwind.config.js`

## Entry Points

Entry points are defined in `webpack/webpack.common.js`:

```javascript
entry: {
  popup: path.join(srcDir, 'entry', 'popup.tsx'),
  options: path.join(srcDir, 'entry', 'options.tsx'),
  updatePage: path.join(srcDir, 'entry', 'updatePage.tsx'),
  background: path.join(srcDir, 'entry', 'background.ts'),
  content_script: path.join(srcDir, 'entry', 'content_script.tsx'),
}
```

Each entry point becomes a separate bundle in `dist/js/`.

## Output Structure

After building, `dist/` contains:

```
dist/
├── js/
│   ├── popup.js
│   ├── options.js
│   ├── content_script.js
│   ├── background.js
│   ├── updatePage.js
│   └── vendor.js
├── css/
│   ├── output.css          # Tailwind CSS
│   └── dark-mode.css       # Dark mode styles
├── images/                 # Images (if any)
├── manifest.json           # Extension manifest
├── popup.html
├── options.html
├── updatePage.html
└── *.png                   # Extension icons
```

## Code Splitting

Webpack uses code splitting to optimize bundle size:

### Vendor Chunk

Dependencies (React, lodash, etc.) are split into `vendor.js`:

- Shared across popup, options, and updatePage
- Cached separately (changes less frequently)
- Excluded from background script (smaller bundle)

**Configuration**:

```javascript
optimization: {
  splitChunks: {
    name: "vendor",
    chunks(chunk) {
      return chunk.name !== 'background';  // Background doesn't use vendor
    }
  }
}
```

## Build Modes

### Development Mode (`npm start` / `npm run watch`)

- **Source Maps**: Enabled for debugging
- **Minification**: Disabled (faster builds)
- **Watch Mode**: Rebuilds on file changes
- **Fast Refresh**: Faster incremental builds

**Configuration**: `webpack/webpack.dev.js`

### Production Mode (`npm run build`)

- **Source Maps**: Disabled (smaller files)
- **Minification**: Enabled (smaller bundles)
- **Optimization**: Tree shaking, dead code elimination
- **Performance**: Optimized for file size

**Configuration**: `webpack/webpack.prod.js`

## Loaders

Webpack uses loaders to process different file types:

### TypeScript Loader (`ts-loader`)

- Transpiles TypeScript to JavaScript
- Uses `tsconfig.json` for configuration
- Type checking (if enabled)

### CSS Loader (`css-loader` + `style-loader`)

- Processes CSS imports
- Injects styles into JavaScript bundles
- Handles CSS modules (if used)

### File Loader (`file-loader`)

- Handles image imports (`.png`, `.jpg`, etc.)
- Outputs images to `dist/images/`
- Returns public URL in code

## Plugins

### HtmlWebpackPlugin

- Generates HTML files for popup, options, updatePage
- Injects script tags automatically
- Uses templates from `public/` directory

### CopyWebpackPlugin

- Copies static files to `dist/`
- Copies `manifest.json`
- Copies extension icons
- Copies CSS files (dark-mode.css)

## Build Scripts

From `package.json`:

```json
{
  "scripts": {
    "start": "webpack watch --config webpack/webpack.dev.js",
    "watch": "webpack --config webpack/webpack.dev.js --watch",
    "build": "npx tsc && webpack --config webpack/webpack.prod.js && npm run build:tailwind",
    "build:tailwind": "npx tailwindcss build -i src/styles/tailwind.css -o dist/css/output.css",
    "clean": "rimraf dist"
  }
}
```

### `npm start` / `npm run watch`

Development mode with watch:

- Fast rebuilds
- Source maps enabled
- Watches for changes

### `npm run build`

Production build:

1. TypeScript compilation
2. Webpack bundling (production mode)
3. Tailwind CSS processing

### `npm run clean`

Removes `dist/` directory (clean slate).

## Manifest Generation

The `manifest.json` is copied from `public/manifest.json` to `dist/`.

**Note**: No build-time modification of manifest currently. If needed, use a plugin to generate/modify manifest.

## Bundle Size Optimization

Current optimizations:

1. **Code Splitting**: Vendor chunk separate from app code
2. **Tree Shaking**: Unused code eliminated
3. **Minification**: JavaScript minified in production
4. **CSS Purging**: Tailwind removes unused classes

**Monitoring**: No bundle size analysis currently configured. Consider adding `webpack-bundle-analyzer` for analysis.

## Troubleshooting

### Build Fails

1. **Check TypeScript Errors**:

   ```bash
   npx tsc --noEmit
   ```

2. **Check Webpack Config**:

   - Verify entry points exist
   - Check loader configurations
   - Verify plugin settings

3. **Check Dependencies**:
   ```bash
   npm install
   ```

### Build Slow

- Use watch mode (`npm start`) for development (incremental builds)
- Production builds are slower (minification, optimization)
- Consider optimizing large dependencies

### Bundle Too Large

- Check vendor chunk size (shared dependencies)
- Consider lazy loading for large features
- Analyze bundle with `webpack-bundle-analyzer`
- Remove unused dependencies

### Missing Files in dist/

- Check CopyWebpackPlugin configuration
- Verify files exist in `public/`
- Check build output for errors

## CI/CD Integration

For CI/CD pipelines:

```bash
npm ci              # Clean install (faster, uses package-lock.json)
npm run build       # Production build
npm run format:check  # Format check
npm run lint        # Lint check
npm test            # Run tests (if applicable)
```

Output: `dist/` directory ready for packaging/uploading to Chrome Web Store.
