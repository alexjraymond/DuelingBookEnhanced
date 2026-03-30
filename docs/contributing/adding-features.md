# Adding Features

This guide explains how to add new features to DuelingBookEnhanced.

## Feature Types

The extension supports several types of features:

1. **Hotkey Actions**: Keyboard shortcuts that trigger game actions
2. **Options/Settings**: User-configurable preferences
3. **UI Features**: Popup or options page enhancements
4. **Content Script Features**: DOM manipulation or page enhancements

## Adding a Hotkey Action

See [Hotkey System](../features/hotkey-system.md#adding-a-new-hotkey-action) for detailed steps.

**Quick Summary**:

1. Add action name to `src/data/actionNames.ts`
2. Add default hotkey to `getDefaultHotkeys()` in `src/utilities/configUtility.ts`
3. Add to UI sections in `src/data/hotkeySections.ts`
4. Implement action function in `src/handlers/actionExecutor.ts`
5. Add to action map in `createActionFunctionMap()`
6. Update DOM cache if needed

## Adding an Option

See [Options Synchronization](../features/options-sync.md#adding-a-new-option) for detailed steps.

**Quick Summary**:

1. Add to `OptionsTypes` interface in `src/utilities/optionsUtility.ts`
2. Add default value to `src/data/defaultOptions.ts`
3. Add option config to `src/data/optionsConfig.ts`
4. Apply option in `src/handlers/optionsManager.ts` (initialize + change listener)
5. Add UI control to `src/pages/OptionsPage.tsx`

## Adding a Content Script Feature

Content script features run on DuelingBook pages and interact with the DOM.

### Step 1: Plan the Feature

- What DOM elements are needed?
- What events trigger the feature?
- Does it need options/settings?
- Does it need hotkeys?

### Step 2: Update DOM Cache (if needed)

If the feature needs DOM elements:

**File**: `src/handlers/domElementCache.ts`

```typescript
// Add to DOMElementCache interface
export interface DOMElementCache {
  // ... existing elements
  myNewElement: HTMLElement | null;
}

// Add to initializeDOMCache()
export function initializeDOMCache(): DOMElementCache {
  return {
    // ... existing elements
    myNewElement: document.getElementById("my-element-id"),
  };
}
```

### Step 3: Implement Feature Logic

Create a new handler file or add to existing handler:

**Option A: New Handler File**

Create `src/handlers/myFeatureHandler.ts`:

```typescript
import { DOMElementCache } from "./domElementCache";

export function setupMyFeature(cache: DOMElementCache): void {
  // Implementation
}
```

Export from `src/handlers/index.ts`:

```typescript
export * from "./myFeatureHandler";
```

**Option B: Add to Existing Handler**

Add function to appropriate handler file (e.g., `actionExecutor.ts`, `optionsManager.ts`).

### Step 4: Initialize Feature

**File**: `src/entry/content_script.tsx`

```typescript
import { setupMyFeature } from "../handlers";

window.onload = async function () {
  const cache = initializeDOMCache();

  // ... existing initialization

  // Initialize new feature
  setupMyFeature(cache);
};
```

### Step 5: Add Options (if needed)

Follow [Adding an Option](#adding-an-option) steps.

### Step 6: Add Hotkeys (if needed)

Follow [Adding a Hotkey Action](#adding-a-hotkey-action) steps.

## Adding a UI Feature (Popup/Options)

UI features enhance the popup or options page.

### Step 1: Create Component (if needed)

**File**: `src/components/MyComponent.tsx`

```typescript
import React from "react";

interface MyComponentProps {
  // Props
}

export const MyComponent: React.FC<MyComponentProps> = (
  {
    /* props */
  }
) => {
  return <div>{/* Component JSX */}</div>;
};
```

Export from `src/components/index.ts`:

```typescript
export * from "./MyComponent";
```

### Step 2: Add to Page

**Popup**: `src/entry/popup.tsx`
**Options**: `src/pages/OptionsPage.tsx`

```typescript
import { MyComponent } from "../components";

// Use component in JSX
<MyComponent />;
```

### Step 3: Add Styling

Use Tailwind CSS classes (preferred) or add to CSS files in `src/styles/`.

## Feature Checklist

When adding a feature, ensure:

- [ ] Code follows existing patterns and structure
- [ ] TypeScript types are defined (no `any` types)
- [ ] JSDoc comments added for exported functions
- [ ] Error handling implemented (where appropriate)
- [ ] Options added to options page (if configurable)
- [ ] Default values defined (if needed)
- [ ] UI follows existing design patterns
- [ ] Feature works on DuelingBook pages (if content script feature)
- [ ] Feature doesn't break existing functionality
- [ ] Code passes linting (`npm run lint`)
- [ ] Code is formatted (`npm run format`)

## Code Organization

### Where to Put Code

- **Handlers**: `src/handlers/` - Content script logic
- **Utilities**: `src/utilities/` - Reusable functions
- **Services**: `src/services/` - Service layer abstractions
- **Components**: `src/components/` - React components
- **Pages**: `src/pages/` - Page-level components
- **Data**: `src/data/` - Configuration data and constants
- **Types**: `src/types/` - TypeScript type definitions

### Naming Conventions

- **Files**: camelCase for utilities, PascalCase for components
- **Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE (for exported constants)

### File Structure

Each file should:

- Have a file header comment (JSDoc-style)
- Export public APIs
- Use named exports (preferred over default exports)
- Group related functionality

## Testing Features

### Manual Testing

1. **Build**: `npm run build` or `npm start`
2. **Reload Extension**: Chrome → Extensions → Reload
3. **Test Feature**: Use feature on DuelingBook page
4. **Check Console**: Look for errors or logs
5. **Test Edge Cases**: Test with different options, states, etc.

### Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Options save/load correctly (if applicable)
- [ ] Feature works with other features enabled/disabled
- [ ] Feature doesn't break existing functionality
- [ ] Edge cases handled (null elements, missing data, etc.)

## Documentation

When adding a feature:

1. **Code Comments**: Add JSDoc comments for exported functions
2. **Type Documentation**: Document complex types/interfaces
3. **Feature Documentation**: Update relevant docs in `docs/` if feature is complex
4. **User Documentation**: Update user-facing README if feature is user-visible

## Common Patterns

### DOM Manipulation

```typescript
// Use DOM cache for element access
if (cache.myElement) {
  cache.myElement.click();
}
```

### Storage Operations

```typescript
import { getStorage, setStorage } from "../services";

// Read
const value = await getStorage<MyType>("key", defaultValue);

// Write
await setStorage("key", newValue);
```

### Message Passing

```typescript
import { sendMessageToAllTabs } from "../services";
import { MessageType } from "../types";

await sendMessageToAllTabs({
  type: MessageType.MY_MESSAGE_TYPE,
  payload: data,
});
```

### Event Listeners

```typescript
// Add listener
const handler = (e: Event) => {
  /* ... */
};
element.addEventListener("click", handler);

// Cleanup (return cleanup function)
return () => {
  element.removeEventListener("click", handler);
};
```

## Getting Help

- Check existing code for similar patterns
- Review [Architecture Overview](../architecture/overview.md)
- Check [Feature Documentation](../features/)
- Ask questions in issues or discussions
