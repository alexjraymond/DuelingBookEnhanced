# Architecture Overview

## High-Level Structure

DuelingBookEnhanced is a Chrome Extension (Manifest V3) built with TypeScript and React. The extension consists of several key components that work together to enhance the DuelingBook.com experience.

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Chrome Extension                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Popup      │  │   Options    │  │  Background  │      │
│  │   (React)    │  │   (React)    │  │   (Service   │      │
│  │              │  │              │  │   Worker)    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         └──────────────────┼──────────────────┘               │
│                            │                                   │
│                    ┌───────▼────────┐                         │
│                    │ Chrome Storage │                         │
│                    │   (sync API)   │                         │
│                    └───────┬────────┘                         │
│                            │                                   │
│                    ┌───────▼────────┐                         │
│                    │ Content Script │                         │
│                    │   (TypeScript) │                         │
│                    │                │                         │
│                    │  ┌──────────┐  │                         │
│                    │  │ Handlers │  │                         │
│                    │  │ - Hotkey │  │                         │
│                    │  │ - Action │  │                         │
│                    │  │ - Options│  │                         │
│                    │  │ - DOM    │  │                         │
│                    │  └──────────┘  │                         │
│                    └─────────────────┘                         │
│                            │                                   │
│                    ┌───────▼────────┐                         │
│                    │  DuelingBook   │                         │
│                    │  (DOM)         │                         │
│                    └─────────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── entry/              # Entry points for each extension component
│   ├── popup.tsx       # Popup UI entry point
│   ├── options.tsx     # Options page entry point
│   ├── background.ts   # Background service worker
│   └── content_script.tsx  # Content script entry point
│
├── handlers/           # Content script handlers (modularized)
│   ├── hotkeyHandler.ts      # Hotkey event processing
│   ├── actionExecutor.ts     # Game action execution
│   ├── optionsManager.ts     # Options loading/management
│   └── domElementCache.ts    # DOM element caching
│
├── services/           # Service layer abstractions
│   ├── storage/        # Chrome storage abstraction
│   ├── messaging/      # Chrome messaging abstraction
│   └── logging/        # Centralized logging
│
├── utilities/          # Reusable utility functions
│   ├── configUtility.ts      # Hotkey configuration management
│   ├── optionsUtility.ts     # Options management
│   ├── darkModeUtility.ts    # Dark mode styling
│   └── actionsManipulations.ts  # Action string helpers
│
├── components/         # React components (popup/options)
├── pages/              # Page-level React components
├── data/               # Configuration data and constants
├── types/              # TypeScript type definitions
└── styles/             # CSS stylesheets
```

## Key Design Patterns

### 1. Service Layer Pattern

Chrome APIs are abstracted through service layers (`services/storage`, `services/messaging`) to:

- Provide consistent error handling
- Make testing easier (can mock services)
- Enable future API changes without affecting business logic

### 2. Handler Pattern (Content Script)

The content script is modularized into focused handlers:

- **Hotkey Handler**: Processes keyboard events and maps to actions
- **Action Executor**: Executes game actions (card movements, UI interactions)
- **Options Manager**: Manages options loading and real-time updates
- **DOM Cache**: Centralizes DOM element queries for performance

### 3. Data-Driven Configuration

Feature definitions (hotkeys, options, actions) are stored in `data/` directory:

- `actionNames.ts`: Action name constants
- `hotkeySections.ts`: UI organization for hotkey configuration
- `defaultOptions.ts`: Default option values
- `optionsConfig.ts`: Option definitions

## Communication Flow

1. **User Changes Settings** (Popup/Options) → Chrome Storage → Content Scripts (via messages)
2. **Content Script Initialization** → Load options from storage → Apply to page
3. **Hotkey Press** → Hotkey Handler → Action Executor → DOM manipulation
4. **Options Change** → Storage listener → Options Manager → Page update

See [Messaging System](./messaging-system.md) for detailed communication patterns.

## Technology Stack

- **Language**: TypeScript
- **UI Framework**: React 18
- **Build Tool**: Webpack 5
- **Styling**: Tailwind CSS + Custom CSS
- **Extension Platform**: Chrome Extension Manifest V3
