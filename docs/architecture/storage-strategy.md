# Storage Strategy

This document describes how the extension uses Chrome storage for data persistence.

## Storage API

The extension uses **Chrome Storage Sync API** (`chrome.storage.sync`) which:

- Syncs data across user's Chrome instances (if signed in)
- Has a quota limit (~100KB)
- Persists data across browser sessions
- Fires `onChanged` events when data is modified

## Data Structure

### Options (`"options"` key)

```typescript
interface OptionsTypes {
  disableAllOptions: boolean; // Master disable switch
  disableHotkeys: boolean; // Disable all hotkeys
  skipIntro: boolean; // Auto-skip intro screen
  autoConnect: boolean; // Auto-connect to duel
  isNightMode: boolean; // Dark mode enabled
}
```

**Default values**: Defined in `src/data/defaultOptions.ts`

**Storage location**: `chrome.storage.sync["options"]`

### Hotkeys Config (`"hotkeysConfig"` key)

```typescript
interface HotkeyEntry {
  action: string; // Action name (e.g., "View Graveyard")
  hotkey: string; // Keyboard key (e.g., "g")
  disabled: boolean; // Whether this hotkey is disabled
}

type HotkeysConfig = HotkeyEntry[];
```

**Default values**: Returned by `getDefaultHotkeys()` in `src/utilities/configUtility.ts`

**Storage location**: `chrome.storage.sync["hotkeysConfig"]`

## Storage Service Abstraction

Chrome storage operations are abstracted through `src/services/storage/storageService.ts`:

### `getStorage<T>(key: string, defaultValue: T): Promise<T>`

Gets a value from storage, returning the default value if the key doesn't exist.

**Usage**:

```typescript
const options = await getStorage<OptionsTypes>("options", DEFAULT_OPTIONS);
const hotkeys = await getStorage<HotkeyEntry[]>("hotkeysConfig", []);
```

### `setStorage<T>(key: string, value: T): Promise<void>`

Sets a value in storage.

**Usage**:

```typescript
await setStorage("options", newOptions);
await setStorage("hotkeysConfig", newHotkeys);
```

**Error Handling**: Both functions reject the promise if `chrome.runtime.lastError` occurs.

## Storage Flow

### Reading Data

```
Component needs data
    ↓
getStorage<T>(key, defaultValue)
    ↓
chrome.storage.sync.get([key])
    ↓
Returns stored value or default value
```

### Writing Data

```
Component saves data
    ↓
setStorage(key, value)
    ↓
chrome.storage.sync.set({ [key]: value })
    ↓
Storage updated
    ↓
chrome.storage.onChanged event fires (if listener exists)
```

## Initialization Pattern

When components need data on initialization:

1. **Content Script**:

   - Loads options and hotkeys in `initializeOptions()`
   - Uses defaults if storage is empty
   - Sets up `onChanged` listener for real-time updates

2. **Popup/Options Page**:
   - Loads data in `useEffect` on mount
   - Uses defaults if storage is empty
   - Updates UI when data changes

**Pattern**:

```typescript
const data = await getStorage<DataType>(key, DEFAULT_VALUE);
// Use data (which is either stored value or default)
```

## Real-Time Updates

### Storage Change Listeners

Content scripts listen to storage changes for real-time updates:

```typescript
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.options) {
    const newOptions = changes.options.newValue as OptionsTypes;
    // Apply options to page
  }
});
```

**Why use storage events instead of messaging?**

- Storage events fire automatically when storage changes
- Works even if the content script tab wasn't open when the change occurred
- Storage changes are the source of truth

### Combining Storage + Messaging

For hotkeys, we use **both** patterns:

1. **Storage events**: Not used (hotkeys don't use storage listeners)
2. **Messaging**: Used for immediate updates (`HOTKEYS_CHANGED` message)

For options, we use **storage events** only:

- Options apply on page load anyway (from storage)
- Storage events handle real-time updates
- No need for messaging (simpler)

## Data Migration

**Current State**: No migration logic exists.

**Future Considerations**:

- If storage schema changes, add migration in background script's `onInstalled` listener
- Detect old format and migrate to new format
- Example: If `hotkeysConfig` structure changes, detect old format and convert

## Quota Management

Chrome Storage Sync has a ~100KB quota limit.

**Current Usage**:

- Options: ~100 bytes
- Hotkeys Config: ~5-10KB (depends on number of hotkeys)

**Monitoring**: Currently no quota checking, but should be minimal.

**Best Practices**:

- Don't store large data in sync storage
- Use `chrome.storage.local` for larger data (but won't sync across devices)
- Consider compression for large data structures

## Error Handling

Storage operations can fail if:

- User is offline (sync storage requires sync)
- Quota exceeded
- Extension permissions revoked

**Current Error Handling**:

- Service layer rejects promise on `chrome.runtime.lastError`
- Callers should handle errors appropriately
- No retry logic currently implemented

**Future Improvements**:

- Add retry logic for transient failures
- Fall back to local storage if sync fails
- Show user-friendly error messages
