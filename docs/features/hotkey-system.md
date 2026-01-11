# Hotkey System

This document explains how the hotkey system works, from configuration to execution.

## Overview

The hotkey system allows users to map keyboard keys to game actions. Hotkeys are configurable in the Options page, stored in Chrome storage, and executed by the content script when keys are pressed on DuelingBook pages.

## Data Flow

```
User Configures Hotkey (Options Page)
    ↓
Hotkey saved to Chrome Storage (hotkeysConfig)
    ↓
Message sent to all content scripts (HOTKEYS_CHANGED)
    ↓
Content script updates local hotkey map
    ↓
User presses key on DuelingBook page
    ↓
Hotkey Handler processes keydown event
    ↓
Action Executor runs the mapped action
    ↓
DOM manipulation → DuelingBook responds
```

## Components

### 1. Configuration Data (`src/data/`)

**Action Names** (`actionNames.ts`):

- Constants for all action names (e.g., `VIEW_GRAVEYARD`, `TO_HAND`)
- Single source of truth for action names
- Used throughout codebase to avoid typos

**Hotkey Sections** (`hotkeySections.ts`):

- UI organization for hotkey configuration page
- Groups actions by category (Deck Actions, Card Actions, etc.)
- Used by Options page to display hotkeys in sections

**Default Hotkeys** (`configUtility.ts` → `getDefaultHotkeys()`):

- Default key mappings for all actions
- Used when user hasn't configured hotkeys
- Returned if storage is empty

### 2. Storage (`src/utilities/configUtility.ts`)

**Load Hotkeys**:

```typescript
loadHotkeysConfig(): Promise<HotkeyEntry[]>
```

- Gets hotkeys from Chrome storage
- Returns defaults if storage is empty
- Used by content script and options page

**Save Hotkeys**:

```typescript
saveHotkeysConfig(hotkeys: HotkeyEntry[]): Promise<void>
```

- Saves hotkeys to Chrome storage
- Sends `HOTKEYS_CHANGED` message to all tabs
- Used by options page when user changes hotkeys

### 3. Content Script Handler (`src/handlers/hotkeyHandler.ts`)

**Setup**:

```typescript
setupHotkeyListeners(cache, state): () => void
```

- Creates action function map
- Sets up keydown/keyup event listeners (debounced)
- Returns cleanup function to remove listeners

**Key Processing**:

1. **Keydown Event**:

   - Ignores keys when typing in input fields (except Enter)
   - Gets all actions mapped to the pressed key
   - Checks if actions are disabled
   - Executes enabled actions via action function map

2. **Keyup Event**:
   - Used specifically for "Thumbs Up" release
   - Releases the thumbs up button when key is released

**Debouncing**:

- Keydown: 150ms delay (prevents rapid repeated execution)
- Keyup: 160ms delay (slightly longer to allow keydown to process first)

### 4. Action Execution (`src/handlers/actionExecutor.ts`)

**Action Function Map**:

- Maps action names to execution functions
- Created by `createActionFunctionMap(cache, state)`
- Contains all action implementations

**Action Types**:

1. **Simple Actions** (click a button):

   - `THINK`: Clicks think button
   - `TOGGLE_CHAT_BOX`: Focuses/blurs chat input
   - `SUB_LP` / `ADD_LP`: Clicks LP buttons and focuses LP input

2. **View Actions** (toggle menus):

   - `VIEW_GRAVEYARD`: Toggles graveyard view
   - `VIEW_BANISH`: Toggles banished view
   - `VIEW_MAIN_DECK` / `VIEW_EXTRA_DECK`: Opens deck view menu

3. **Card Actions** (require hovering over card):

   - `PLAY_CARD`: Searches card menu for matching action text
   - Handles multiple action names (fallback support)
   - Example: `TO_GRAVE/TO_GRAVEYARD` tries both names

4. **Special Actions**:
   - `THUMBS_UP`: Presses button on keydown, releases on keyup
   - `MILL_1` through `MILL_6`: Sends chat command (`/mill 1`, etc.)

## Hotkey Configuration

### Data Structure

```typescript
interface HotkeyEntry {
  action: string; // Action name (from ACTION_NAMES)
  hotkey: string; // Keyboard key (lowercase, e.g., "g", "escape")
  disabled: boolean; // Whether this hotkey is disabled
}
```

### Multiple Actions per Key

**Supported**: Multiple actions can be mapped to the same key.

**Example**:

```typescript
[
  { action: "TO_HAND", hotkey: "h", disabled: false },
  { action: "TO_EXTRA_DECK", hotkey: "h", disabled: false },
];
```

Pressing 'h' will execute both actions.

### Action Aliases

Some actions support multiple names (aliases):

- `TO_GRAVE` / `TO_GRAVEYARD` / `DETACH` → All use `playCard()` with fallback logic
- Handled by `splitActions()` utility which splits `/`-delimited action names

## Adding a New Hotkey Action

1. **Add Action Name** (`src/data/actionNames.ts`):

   ```typescript
   export const ACTION_NAMES = {
     // ... existing actions
     MY_NEW_ACTION: "My New Action",
   };
   ```

2. **Add Default Hotkey** (`src/utilities/configUtility.ts` → `getDefaultHotkeys()`):

   ```typescript
   { action: ACTION_NAMES.MY_NEW_ACTION, hotkey: "x", disabled: false }
   ```

3. **Add to UI Sections** (`src/data/hotkeySections.ts`):

   ```typescript
   actions: [
     // ... existing actions
     "My New Action",
   ];
   ```

4. **Implement Action** (`src/handlers/actionExecutor.ts`):

   ```typescript
   export function myNewAction(cache: DOMElementCache): void {
     // Implementation
   }
   ```

5. **Add to Action Map** (`createActionFunctionMap()`):

   ```typescript
   [ACTION_NAMES.MY_NEW_ACTION]: () => myNewAction(cache),
   ```

6. **Update DOM Cache** (if needed) (`src/handlers/domElementCache.ts`):
   - Add element to `DOMElementCache` interface
   - Query element in `initializeDOMCache()`

## Disabling Hotkeys

Hotkeys can be disabled in two ways:

1. **Individual Hotkey**: Set `disabled: true` for specific hotkey entry
2. **All Hotkeys**: Set `disableHotkeys: true` in options (clears hotkey map)

When a hotkey is disabled, it's skipped during key processing (no action executed).

## Debugging Hotkeys

**Common Issues**:

1. **Hotkey not working**:

   - Check if hotkey is disabled (`disabled: true`)
   - Check if `disableHotkeys` option is enabled
   - Check browser console for errors
   - Verify action name matches exactly

2. **Action not executing**:

   - Check if action function exists in `createActionFunctionMap()`
   - Check if DOM element exists (for DOM-based actions)
   - Check if card is hovered (for card actions)

3. **Multiple actions firing**:
   - Expected if multiple actions share the same key
   - Check hotkey configuration for duplicate mappings

**Debugging Tools**:

- Browser console logs key presses and actions
- Check `hotkeyHashMap` in content script console
- Verify action function map in `setupHotkeyListeners()`
