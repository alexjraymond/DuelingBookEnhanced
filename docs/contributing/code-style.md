# Code Style Guide

This document outlines coding standards and conventions for DuelingBookEnhanced.

## TypeScript

### Type Safety

- **Always use types**: Avoid `any` type
- **Use interfaces**: For object shapes
- **Use type aliases**: For unions, intersections, complex types
- **Strict mode**: Enabled in `tsconfig.json` - follow strict rules

### Type Definitions

- **Centralized types**: Put shared types in `src/types/`
- **Local types**: Use interfaces/types in files where they're only used
- **Export types**: Export types that are used across files

**Example**:

```typescript
// src/types/myFeature.ts
export interface MyFeatureConfig {
  enabled: boolean;
  settings: MySettings;
}

// src/utilities/myUtility.ts
import { MyFeatureConfig } from "../types";

export function processFeature(config: MyFeatureConfig): void {
  // ...
}
```

## Code Formatting

### Prettier

Code is formatted with Prettier. Run before committing:

```bash
npm run format
```

**Configuration**: Uses Prettier defaults (no custom config currently).

### Formatting Rules

- **Semicolons**: Yes (Prettier default)
- **Quotes**: Double quotes (Prettier default)
- **Trailing commas**: ES5 (Prettier default)
- **Tab width**: 2 spaces
- **Print width**: 80 characters (Prettier default)

## Linting

### ESLint

Code is linted with ESLint. Fix issues:

```bash
npm run lint:fix
```

**Configuration**: `.eslintrc.json` (TypeScript + React rules).

### Linting Rules

- **TypeScript**: Strict type checking
- **React**: React and React Hooks rules
- **Best practices**: ESLint recommended rules
- **No console.log**: Use Logger service instead (where applicable)

## Naming Conventions

### Files

- **Components**: PascalCase (e.g., `HotkeySection.tsx`)
- **Utilities/Handlers**: camelCase (e.g., `configUtility.ts`, `hotkeyHandler.ts`)
- **Types**: camelCase (e.g., `hotkeys.ts`, `messages.ts`)
- **Data files**: camelCase (e.g., `actionNames.ts`)

### Variables and Functions

- **Variables**: camelCase (e.g., `hotkeyHashMap`, `chatInputFocused`)
- **Functions**: camelCase (e.g., `loadHotkeysConfig()`, `setupHotkeyListeners()`)
- **Constants**: UPPER_SNAKE_CASE for exported constants (e.g., `ACTION_NAMES`)
- **Private/Internal**: No prefix needed (TypeScript handles visibility)

### Types and Interfaces

- **Interfaces**: PascalCase (e.g., `HotkeyEntry`, `DOMElementCache`)
- **Types**: PascalCase (e.g., `MessagePayload`, `OptionsTypes`)
- **Enums**: PascalCase (e.g., `MessageType`)

### React Components

- **Component names**: PascalCase (e.g., `HotkeySection`)
- **Props interfaces**: `ComponentNameProps` (e.g., `HotkeySectionProps`)
- **Component files**: Match component name (e.g., `HotkeySection.tsx`)

## File Organization

### Imports

Order imports as follows:

1. External dependencies (React, lodash, etc.)
2. Internal services/utilities
3. Internal types
4. Internal components
5. Relative imports (same directory)

**Example**:

```typescript
import { debounce } from "lodash";
import { Logger } from "../services";
import { HotkeyEntry } from "../types";
import { DOMElementCache } from "./domElementCache";
```

### Exports

- **Named exports**: Preferred over default exports
- **Barrel exports**: Use `index.ts` files for clean imports
- **Export all**: Export related items from same file

**Example**:

```typescript
// src/handlers/myHandler.ts
export function myFunction(): void {}
export interface MyInterface {}

// src/handlers/index.ts
export * from "./myHandler";
```

## Comments and Documentation

### JSDoc Comments

Add JSDoc comments for:

- **Exported functions**: All exported functions
- **Public APIs**: Functions used across modules
- **Complex logic**: Non-obvious code
- **Type definitions**: Interfaces and types (where helpful)

**Format**:

```typescript
/**
 * Description of what the function does.
 *
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws Error description if applicable
 *
 * @example
 * // Usage example
 * const result = myFunction(value);
 */
export function myFunction(paramName: string): ReturnType {
  // ...
}
```

### Inline Comments

Use inline comments for:

- **Non-obvious code**: Complex logic that needs explanation
- **Magic numbers**: Document why specific values are used
- **Workarounds**: Document browser/DOM quirks
- **TODO/FIXME**: Mark future improvements (use sparingly)

**Avoid**:

- Obvious comments that duplicate code
- Comments that are outdated (remove or update)

## Code Structure

### Functions

- **Single responsibility**: One function does one thing
- **Small functions**: Keep functions focused and readable
- **Pure functions**: Prefer pure functions where possible
- **Async/await**: Use async/await instead of promises (where appropriate)

**Example**:

```typescript
// Good: Focused, clear purpose
export function loadHotkeysConfig(): Promise<HotkeyEntry[]> {
  return getStorage<HotkeyEntry[]>("hotkeysConfig", []).then((stored) =>
    stored.length > 0 ? stored : getDefaultHotkeys()
  );
}

// Bad: Does too much
export function loadAndSaveAndNotifyHotkeys(): void {
  // ... multiple responsibilities
}
```

### Error Handling

- **Async errors**: Handle errors in async functions
- **Chrome APIs**: Check `chrome.runtime.lastError`
- **User feedback**: Show errors to users (where applicable)
- **Logging**: Use Logger service for errors

**Example**:

```typescript
export async function myAsyncFunction(): Promise<void> {
  try {
    await chromeAPI();
    if (chrome.runtime.lastError) {
      throw new Error(chrome.runtime.lastError.message);
    }
  } catch (error) {
    logger.error("Error in myAsyncFunction", error);
    throw error;
  }
}
```

## React Code Style

### Components

- **Functional components**: Use function components (not class components)
- **TypeScript**: Use TypeScript for all components
- **Props interface**: Define props interface above component
- **Export**: Export component as named export

**Example**:

```typescript
interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};
```

### Hooks

- **Custom hooks**: Use `use` prefix (e.g., `useHotkeys()`)
- **Dependencies**: Include all dependencies in dependency arrays
- **Cleanup**: Return cleanup functions from useEffect when needed

### Styling

- **Tailwind CSS**: Preferred for styling
- **CSS modules**: Use for component-specific styles (if needed)
- **Global CSS**: Use sparingly (e.g., dark-mode.css)

## Best Practices

### Code Quality

- **DRY**: Don't repeat yourself - extract common code
- **KISS**: Keep it simple - avoid over-engineering
- **SOLID**: Follow SOLID principles where applicable
- **Readable**: Code should be self-documenting (with comments where needed)

### Performance

- **DOM caching**: Cache DOM element queries (see `domElementCache.ts`)
- **Debouncing**: Use debouncing for frequent events (e.g., keyboard events)
- **Lazy loading**: Consider lazy loading for large features (future)
- **Bundle size**: Keep bundle size reasonable (monitor with webpack)

### Security

- **XSS prevention**: Sanitize user input (if applicable)
- **Chrome APIs**: Use Chrome APIs correctly (check permissions)
- **Storage**: Don't store sensitive data in Chrome storage
- **Content Security Policy**: Follow CSP requirements

## Git Conventions

### Commit Messages

Use conventional commit format:

```
type(scope): description

Body (optional)
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance tasks

**Example**:

```
feat(hotkeys): add new hotkey action for deck view

Adds support for viewing the main deck with hotkey 'v'.
Includes default hotkey configuration and UI updates.
```

### Branch Naming

- **Feature**: `feature/description`
- **Bugfix**: `bugfix/description`
- **Hotfix**: `hotfix/description`

## Checklist

Before submitting code:

- [ ] Code follows TypeScript best practices
- [ ] Code is formatted with Prettier
- [ ] Code passes ESLint
- [ ] JSDoc comments added for exported functions
- [ ] Types are defined (no `any`)
- [ ] Code is tested manually
- [ ] No console errors
- [ ] Follows existing code patterns
- [ ] Commit message follows conventions
