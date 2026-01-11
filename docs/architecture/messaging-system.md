# Messaging System

This document describes how different parts of the extension communicate using Chrome's messaging APIs.

## Message Types

All message types are defined in `src/types/messages.ts`:

```typescript
enum MessageType {
  HOTKEYS_CHANGED = "HOTKEYS_CHANGED",
  SETTINGS_CHANGED = "SETTINGS_CHANGED",
}
```

## Communication Patterns

### Pattern 1: Popup/Options → Content Scripts (Broadcast)

**When**: User changes settings or hotkeys in Popup/Options page

**Flow**:

```
Popup/Options Page
    ↓ saveOptionsToStorage() / saveHotkeysConfig()
    ↓ sendMessageToAllTabs()
    ↓ chrome.tabs.query({}) → get all tabs
    ↓ chrome.tabs.sendMessage(tabId, message)
    ↓
Content Script (each active tab)
    ↓ chrome.runtime.onMessage.addListener()
    ↓ Updates local state
```

**Implementation**:

- **Sender**: `src/services/messaging/messageService.ts` → `sendMessageToAllTabs()`
- **Receiver**: `src/entry/content_script.tsx` → `chrome.runtime.onMessage.addListener()`

**Example - Hotkey Change**:

```typescript
// Options page saves hotkeys
await saveHotkeysConfig(newHotkeys);
// → saveHotkeysConfig() calls sendMessageToAllTabs() with HOTKEYS_CHANGED

// Content script receives message
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === MessageType.HOTKEYS_CHANGED) {
    hotkeyHashMap = message.payload as HotkeyEntry[];
  }
});
```

**Example - Settings Change**:

```typescript
// Options page saves settings
await saveOptionsToStorage(newOptions);
// → saveOptionsToStorage() calls sendMessageToAllTabs() with SETTINGS_CHANGED

// Content script receives via storage.onChanged listener
// (Not via messaging - see Pattern 2)
```

### Pattern 2: Storage Changes → Content Scripts (Storage Events)

**When**: Options are saved to Chrome storage

**Flow**:

```
Popup/Options Page
    ↓ saveOptionsToStorage()
    ↓ chrome.storage.sync.set()
    ↓
Chrome Storage (sync)
    ↓ storage.onChanged event fires
    ↓
Content Script (each active tab)
    ↓ setupOptionsChangeListener()
    ↓ chrome.storage.onChanged.addListener()
    ↓ Updates page (dark mode, skip intro, etc.)
```

**Implementation**:

- **Trigger**: `src/utilities/optionsUtility.ts` → `saveOptionsToStorage()`
- **Receiver**: `src/handlers/optionsManager.ts` → `setupOptionsChangeListener()`

**Why Two Patterns?**

- **Pattern 1 (Messaging)**: Used for hotkey changes because they need immediate updates without storage delay
- **Pattern 2 (Storage Events)**: Used for options because they persist and need to apply on page load (even if tab wasn't open when option changed)

### Pattern 3: Background → All Tabs (Future Use)

**Current State**: Background script currently only handles installation events.

**Potential Use Cases**:

- Extension update notifications
- Background data fetching
- Scheduled tasks

## Message Service Abstraction

The messaging system is abstracted through `src/services/messaging/messageService.ts`:

### `sendMessageToAllTabs(message: MessagePayload)`

Sends a message to all open tabs (all tabs, not just DuelingBook tabs).

**Implementation Details**:

- Uses `chrome.tabs.query({})` to get all tabs
- Filters tabs with valid IDs
- Sends message to each tab in parallel using `Promise.all()`
- Silently ignores errors (some tabs like `chrome://` pages can't receive messages)

**Error Handling**:

- Errors for individual tabs are ignored (expected for non-content-script tabs)
- Only rejects if `chrome.tabs.query()` itself fails

## Storage vs Messaging

| Scenario          | Method         | Why                                                     |
| ----------------- | -------------- | ------------------------------------------------------- |
| Hotkey changes    | Messaging      | Immediate updates, no need to persist application state |
| Option changes    | Storage events | Persists across sessions, applies on page load          |
| Real-time updates | Messaging      | Broadcast to all active tabs immediately                |
| State persistence | Storage        | Survives page reloads and browser restarts              |

## Best Practices

1. **Always use the service layer**: Use `sendMessageToAllTabs()` from `messageService.ts` rather than calling Chrome APIs directly
2. **Type safety**: Use `MessageType` enum and `MessagePayload` types
3. **Error handling**: Message service handles errors gracefully - don't try to catch errors from individual tabs
4. **Storage + Messaging**: Consider if you need both storage events AND messaging for immediate updates

## Debugging Messages

To debug messaging:

1. **Check message sending**: Add logging in `sendMessageToAllTabs()`
2. **Check message receiving**: Add logging in content script's `onMessage` listener
3. **Check storage events**: Add logging in `setupOptionsChangeListener()`
4. **Chrome DevTools**: Use background page console for service worker logs, content script console for content script logs
