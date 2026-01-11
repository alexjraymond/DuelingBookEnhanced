# Debugging Chrome Extensions

This guide covers debugging techniques for DuelingBookEnhanced.

## Debugging Locations

Chrome extensions have multiple execution contexts, each with its own console:

1. **Popup/Options Page**: Regular web page context
2. **Content Script**: Runs in page context (shared with page)
3. **Background Service Worker**: Separate context (service worker)
4. **Background Page** (Legacy): If using persistent background (not applicable here)

## Debugging Popup

### Open DevTools

1. Right-click the extension icon → **Inspect popup**
2. Or: Open popup, press `F12` (if focus is in popup)

### Console

- View logs from popup code
- Inspect React component tree (React DevTools extension)
- Check network requests
- Debug JavaScript errors

### Sources

- Set breakpoints in popup code
- Step through code execution
- Inspect variables

## Debugging Options Page

### Open DevTools

1. Open options page (right-click extension → Options)
2. Press `F12` (standard web page DevTools)

### Console

- View logs from options page code
- Inspect React component tree
- Check Chrome storage (Application tab → Storage → Chrome Storage → Sync)

### Sources

- Set breakpoints in options page code
- Step through code execution
- Inspect variables

## Debugging Content Script

### Open DevTools

1. Navigate to DuelingBook page (`https://www.duelingbook.com/html5`)
2. Press `F12` (page DevTools)
3. **Note**: Content script console is shared with page console

### Console

- View logs from content script
- **Filter**: Use console filter to show only extension logs
- Look for logs from `Logger` service (prefixed with module name)

### Sources

- Content script code appears under "Content scripts" in Sources panel
- Set breakpoints in content script code
- **Note**: Code is bundled, so original TypeScript files may not be available (unless source maps are enabled)

### Identifying Content Script Logs

The extension uses a `Logger` service that prefixes logs:

```typescript
const debug = new Logger("content_script");
debug.log("Message"); // Outputs: "[content_script] Message"
```

Look for logs prefixed with:

- `[content_script]`
- `[hotkeyHandler]`
- `[actionExecutor]`
- `[optionsManager]`

## Debugging Background Service Worker

### Open DevTools

1. Go to `chrome://extensions/`
2. Find "DuelingBookEnhanced"
3. Click **"service worker"** link (under "Inspect views")
4. Or: Click **"background page"** link (if available)

### Console

- View logs from background script
- Check for errors during initialization
- Monitor message passing

### Sources

- Set breakpoints in background code
- Step through code execution
- Inspect variables

### Service Worker Lifecycle

Service workers can be suspended by Chrome. If console is blank:

- Service worker may be inactive
- Refresh the service worker page
- Or trigger an event (e.g., install event) to wake it up

## Common Debugging Scenarios

### Hotkeys Not Working

1. **Check Content Script Console**:

   - Look for errors
   - Check if hotkeys are loaded: `console.log(hotkeyHashMap)`
   - Verify keydown events are firing

2. **Check Hotkey Configuration**:

   - Open Options page → Check hotkey mappings
   - Verify hotkeys aren't disabled
   - Check if `disableHotkeys` option is enabled

3. **Check Action Function Map**:
   - In content script, check if action exists in map
   - Verify action function is defined in `actionExecutor.ts`

### Options Not Applying

1. **Check Storage**:

   - Chrome DevTools → Application → Storage → Chrome Storage → Sync
   - Verify options are saved correctly
   - Check option values

2. **Check Storage Listener**:

   - Add breakpoint in `setupOptionsChangeListener()`
   - Verify listener is set up
   - Check if storage events are firing

3. **Check Initialization**:
   - Add breakpoint in `initializeOptions()`
   - Verify options are loaded on page load
   - Check if options are applied

### Messages Not Received

1. **Check Message Sending**:

   - Add logging in `sendMessageToAllTabs()`
   - Verify message is sent
   - Check message payload

2. **Check Message Receiving**:

   - Add logging in content script's `onMessage` listener
   - Verify listener is set up
   - Check message type matches

3. **Check Tab IDs**:
   - Verify tabs are found by `chrome.tabs.query()`
   - Check if tab IDs are valid
   - Some tabs (chrome:// pages) can't receive messages (errors are ignored)

### DOM Elements Not Found

1. **Check DOM Cache**:

   - In content script console: `console.log(cache)`
   - Verify elements are not null
   - Check if elements exist on page

2. **Check Timing**:

   - DOM cache is initialized on `window.onload`
   - Verify page is fully loaded
   - Some elements may not exist on all pages

3. **Check Selectors**:
   - Verify selectors in `domElementCache.ts`
   - DuelingBook may have changed DOM structure
   - Use browser DevTools to inspect actual DOM

## Logging Best Practices

The extension uses a `Logger` service for consistent logging:

```typescript
import { Logger } from "../services";

const debug = new Logger("moduleName");

debug.log("Info message");
debug.error("Error message", error);
```

**Benefits**:

- Consistent log format
- Module name prefixing
- Easy to filter logs
- Can be enhanced (e.g., log levels, file output)

## Breakpoint Tips

### TypeScript Source Maps

For better debugging experience:

- Enable source maps in webpack config (already enabled in dev mode)
- Original TypeScript files appear in Sources panel
- Set breakpoints in original `.ts` files

### Conditional Breakpoints

Use conditional breakpoints for specific scenarios:

- Break only when specific hotkey is pressed
- Break only when specific option is changed
- Break only on specific DOM elements

### Watch Expressions

Add watch expressions for:

- `hotkeyHashMap` (current hotkey configuration)
- `cache` (DOM element cache)
- `options` (current options)

## Chrome DevTools Extensions

Useful Chrome extensions for debugging:

1. **React DevTools**: Inspect React component tree and props
2. **Redux DevTools**: If using Redux (not currently used)
3. **Vue DevTools**: If using Vue (not applicable)

## Network Debugging

### Check Storage Requests

Chrome DevTools → Network tab → Filter by "chrome-extension://"

### Check Message Passing

- Messages don't appear in Network tab (runtime messages)
- Use console logging to debug message passing
- Check background script console for message logs

## Performance Debugging

### Performance Tab

- Record performance profile
- Check for memory leaks
- Identify slow operations

### Memory Tab

- Take heap snapshots
- Compare snapshots to find memory leaks
- Check for detached DOM nodes

## Remote Debugging

For debugging on other devices:

1. Enable remote debugging in Chrome
2. Connect device via USB
3. Open `chrome://inspect`
4. Debug extension on remote device

## Troubleshooting

### Console Not Showing

- Check if extension is loaded
- Reload extension
- Check for JavaScript errors preventing execution

### Breakpoints Not Hitting

- Verify source maps are enabled
- Check if code is actually executing
- Verify breakpoint is in correct file

### Variables Not Available

- Check scope (variables may be in different scope)
- Use `console.log()` to inspect variables
- Check if variable is defined at breakpoint location

## Debugging Checklist

When debugging an issue:

- [ ] Check all relevant consoles (popup, content script, background)
- [ ] Check Chrome storage (Application → Storage)
- [ ] Verify extension is loaded and enabled
- [ ] Reload extension after code changes
- [ ] Refresh page (for content script changes)
- [ ] Check for JavaScript errors
- [ ] Verify DOM elements exist
- [ ] Check message passing (if applicable)
- [ ] Verify options/hotkeys are saved correctly
