# Extension Lifecycle

This document describes how the extension initializes and runs across all its components.

## Component Initialization Order

### 1. Background Service Worker (`src/entry/background.ts`)

**When**: Extension installation/update or browser start (if extension enabled)

**What happens**:

1. Starts polling function (currently unused but kept for future use)
2. Sets up `onInstalled` listener to show update page on install/update

**Lifecycle**: Service worker stays active while extension is enabled, but can be suspended by Chrome when idle.

### 2. Popup (`src/entry/popup.tsx`)

**When**: User clicks extension icon

**What happens**:

1. React app mounts
2. Loads options from Chrome storage on mount
3. User can toggle settings
4. Settings saved to Chrome storage
5. Popup closes (unmounts) when user clicks away

**Lifecycle**: Created/destroyed each time popup is opened/closed.

### 3. Options Page (`src/entry/options.tsx`)

**When**: User opens extension options (right-click extension → Options)

**What happens**:

1. React app mounts
2. Loads options and hotkeys from Chrome storage
3. User can configure settings and hotkeys
4. Changes saved to Chrome storage immediately
5. Page remains open until user closes tab

**Lifecycle**: Persists until user closes the options tab.

### 4. Content Script (`src/entry/content_script.tsx`)

**When**: Page loads on `https://www.duelingbook.com/*`

**What happens** (see initialization flow below):

#### Content Script Initialization Flow

```
Page Load (window.onload)
    ↓
1. Initialize DOM Cache
    ├─ Queries DOM for all game UI elements
    └─ Stores references in DOMElementCache object
    ↓
2. Initialize Options
    ├─ Injects dark-mode.css stylesheet
    ├─ Loads options from Chrome storage
    ├─ Loads hotkeys from Chrome storage
    ├─ Applies dark mode (if enabled)
    ├─ Applies skipIntro/autoConnect (if enabled)
    └─ Notifies handlers via callbacks
    ↓
3. Setup Options Change Listener
    ├─ Listens to chrome.storage.onChanged
    └─ Updates page when options change in other tabs
    ↓
4. Setup Chrome Runtime Message Listener
    ├─ Listens for HOTKEYS_CHANGED messages
    └─ Updates hotkey map when hotkeys change
    ↓
5. Setup Hotkey Listeners
    ├─ Creates action function map
    ├─ Sets up keydown/keyup event listeners (debounced)
    └─ Ready to handle hotkey presses
```

**Lifecycle**:

- Runs once per page load
- Stays active while page is open
- Re-runs if page is refreshed or navigated (new page load)

## State Management

### Content Script State

The content script maintains local state:

- **Hotkey Map**: Array of `HotkeyEntry` objects loaded from storage
- **Focus States**: `chatInputFocused`, `LPInputFocused` (for toggling behavior)
- **DOM Cache**: Cached references to DOM elements (initialized once on page load)

### Shared State (Chrome Storage)

- **Options**: User preferences (dark mode, skip intro, auto connect, etc.)
- **Hotkeys Config**: Array of hotkey mappings (action → key → disabled flag)

## Real-Time Updates

### Options Changes

1. User changes option in Popup/Options page
2. `saveOptionsToStorage()` saves to Chrome storage
3. `sendMessageToAllTabs()` sends `SETTINGS_CHANGED` message
4. All active content scripts receive message
5. Each content script's options change listener updates the page

### Hotkey Changes

1. User changes hotkey in Options page
2. `saveHotkeysConfig()` saves to Chrome storage
3. `sendMessageToAllTabs()` sends `HOTKEYS_CHANGED` message
4. All active content scripts receive message
5. Each content script updates its local hotkey map

## Event Flow Example: Hotkey Press

```
User presses 'G' key
    ↓
Keydown event fires
    ↓
Hotkey Handler checks:
    ├─ Is target an input field? (skip if yes, unless Enter)
    ├─ Get all actions mapped to 'g'
    ├─ Check if actions are disabled
    └─ Execute actions via action function map
    ↓
Action Executor runs:
    ├─ For "View Graveyard":
    │   ├─ Check if view menu is open → close if yes
    │   └─ Otherwise click graveyard element
    └─ DOM is manipulated → DuelingBook responds
```

## Hot Reload During Development

When developing with `npm start` (webpack watch):

1. Code changes trigger webpack rebuild
2. Built files are output to `dist/`
3. Extension must be reloaded in Chrome (chrome://extensions → Reload)
4. Content scripts run on next page load/navigation
5. Popup/Options must be reopened to see changes

**Note**: Content scripts don't auto-reload on code changes. Always reload the extension and refresh the page.
