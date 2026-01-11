# Options Synchronization

This document explains how options synchronize across tabs and persist across sessions.

## Overview

Options (settings like dark mode, skip intro, auto connect) are stored in Chrome storage and synchronized across all tabs in real-time. When a user changes an option in one tab, all other open DuelingBook tabs are updated immediately.

## Options

The extension has the following options:

- **disableAllOptions**: Master switch to disable all extension features
- **disableHotkeys**: Disable all hotkey functionality
- **skipIntro**: Automatically skip the intro screen
- **autoConnect**: Automatically connect to a duel after skipping intro
- **isNightMode**: Enable dark mode styling

## Storage Location

Options are stored in Chrome Storage Sync at the key `"options"`:

```typescript
chrome.storage.sync["options"] = {
  disableAllOptions: false,
  disableHotkeys: false,
  skipIntro: false,
  autoConnect: false,
  isNightMode: false,
};
```

## Synchronization Flow

### 1. User Changes Option

```
User toggles option in Popup/Options page
    ↓
saveOptionsToStorage(newOptions)
    ↓
setStorage("options", newOptions)
    ↓
chrome.storage.sync.set()
    ↓
Storage updated
```

### 2. Storage Change Event Fires

```
Chrome Storage Sync
    ↓
chrome.storage.onChanged event fires
    ↓
All content scripts with listeners are notified
```

### 3. Content Script Updates

```
Content Script (each active tab)
    ↓
setupOptionsChangeListener() → chrome.storage.onChanged.addListener()
    ↓
Checks if "options" key changed
    ↓
Updates page based on new options:
    ├─ Dark mode: applyDarkMode() / removeDarkMode()
    ├─ Skip intro: skipIntro()
    ├─ Auto connect: autoConnect()
    └─ Hotkeys: Clears or loads hotkey map
```

## Implementation Details

### Saving Options

**Location**: `src/utilities/optionsUtility.ts`

```typescript
export async function saveOptionsToStorage(options: OptionsTypes): Promise<void> {
  await setStorage("options", options);
  await sendMessageToAllTabs({
    type: MessageType.SETTINGS_CHANGED,
    payload: options,
  });
}
```

**Note**: Currently sends a message, but content scripts use storage listeners instead (see below).

### Listening for Changes

**Location**: `src/handlers/optionsManager.ts`

```typescript
export function setupOptionsChangeListener(
  cache: DOMElementCache,
  callbacks: OptionsManagerCallbacks
): void {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && changes.options) {
      const newOptions = changes.options.newValue as OptionsTypes;
      // Apply options to page
    }
  });
}
```

**Why Storage Listeners?**

- Automatically fires when storage changes (even if tab wasn't open)
- Works across all Chrome instances (if user is signed in)
- Simpler than manual messaging
- Storage is the source of truth

### Applying Options

When options change, the content script applies them:

1. **disableAllOptions**:

   - Disables all other options
   - Removes dark mode
   - Clears hotkeys
   - Prevents other options from applying

2. **disableHotkeys**:

   - Clears hotkey map (disables all hotkeys)

3. **skipIntro**:

   - Clicks skip intro button if visible

4. **autoConnect**:

   - Uses MutationObserver to watch skip intro button
   - Clicks enter button when skip intro completes

5. **isNightMode**:
   - Applies or removes dark mode CSS class
   - Toggles styling on configured DOM elements

## Initial Load

When a content script loads, it initializes options:

```typescript
await initializeOptions(cache, callbacks);
```

**Flow**:

1. Injects dark-mode.css stylesheet
2. Loads options from storage (or uses defaults)
3. Applies all enabled options to the page
4. Loads hotkeys if enabled

**Defaults**: If storage is empty, uses defaults from `src/data/defaultOptions.ts`

## disableAllOptions Behavior

When `disableAllOptions` is `true`:

- All other options are set to `false`
- Dark mode is removed
- Hotkeys are cleared
- Other options don't apply (short-circuits option logic)

This acts as a master kill switch for the extension.

## Real-Time vs On-Load

### Real-Time Updates (Storage Listener)

- Dark mode toggles immediately
- Options apply without page refresh
- Works across tabs

### On-Load Application (Initialization)

- Options apply when page loads
- Works even if tab wasn't open when option changed
- Uses storage as source of truth

## Adding a New Option

1. **Add to Type** (`src/utilities/optionsUtility.ts`):

   ```typescript
   export interface OptionsTypes {
     // ... existing options
     myNewOption: boolean;
   }
   ```

2. **Add Default** (`src/data/defaultOptions.ts`):

   ```typescript
   export const DEFAULT_OPTIONS: OptionsTypes = {
     // ... existing defaults
     myNewOption: false,
   };
   ```

3. **Add to Options Config** (`src/data/optionsConfig.ts`):

   - Add option definition for UI

4. **Apply in Content Script** (`src/handlers/optionsManager.ts`):

   - Add logic in `initializeOptions()` to apply on load
   - Add logic in `setupOptionsChangeListener()` to apply on change

5. **Update UI** (`src/pages/OptionsPage.tsx`):
   - Add toggle/control for new option

## Debugging Options

**Common Issues**:

1. **Option not applying**:

   - Check if `disableAllOptions` is enabled (disables everything)
   - Check browser console for errors
   - Verify option is saved to storage (Chrome DevTools → Application → Storage)

2. **Option not syncing across tabs**:

   - Verify storage listener is set up
   - Check if storage events are firing (add console.log)
   - Ensure option change is saved to storage

3. **Option reverts on page reload**:
   - Check if default values are overriding
   - Verify option is saved correctly to storage
   - Check storage quota (rare, but possible)

**Debugging Tools**:

- Chrome DevTools → Application → Storage → Chrome Storage → Sync
- Browser console logs option changes
- Check `initializeOptions()` and `setupOptionsChangeListener()` for errors
