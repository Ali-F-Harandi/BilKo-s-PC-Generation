# BilKo's PC: Generation 1 Save Editor

A modular, web-based Pokemon save editor interface supporting Generation 1 (.sav) files.

## Project Structure

- `src/App.tsx`: Main application entry point and state manager.
- `src/main.tsx`: Vite entry point.
- `src/components/`: Reusable UI components.
  - `editor/`: Components specific to the save editor dashboard.
  - `home/`: Components for the landing page and file loading.
  - `layout/`: Global layout components like Header and Footer.
  - `ui/`: Generic UI primitives (buttons, cards, etc.).
- `src/context/`: React Context providers (Theme, etc.).
- `src/data/`: Static data like Pokemon names, move lists, and game offsets.
- `src/lib/`: Core logic.
  - `parser/`: Logic for reading binary save files.
  - `writer/`: Logic for writing modified data back to binary.
  - `utils/`: Helper functions for manipulation, sorting, and byte handling.
- `src/types.ts`: Shared TypeScript interfaces and types.
- `src/index.css`: Global styles using Tailwind CSS.

## Features

- **Multi-Tab Support**: Load and edit multiple save files simultaneously.
- **Global Move Mode**: Move Pokemon between different save files or reorder them within a save.
- **Living Dex Generator**: Automatically sort and organize Pokemon across all open saves into a Living Dex.
- **Themed UI**: The interface adapts its colors based on the detected game version (Red, Blue, Yellow).
- **Comprehensive Editor**: Edit Trainer info, Party, PC Boxes, Pokedex, Inventory, and Event Flags.

## Technical Details

- **Framework**: React 18 with TypeScript.
- **Styling**: Tailwind CSS v4.
- **Icons**: Lucide React.
- **Build Tool**: Vite.
