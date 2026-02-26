# BilKo's PC: Generation 1 Save Editor - Project Documentation

## Overview
**BilKo's PC** is a high-end, web-based Pokemon save file editor. It is designed with a modular, themable architecture and currently focuses on Generation 1 (Red, Blue, Yellow) save files, with infrastructure in place for multi-generation support.

The application provides a "mission control" style interface for managing multiple save files simultaneously through a tabbed system. It allows users to modify almost every aspect of their save data, including trainer information, party members, PC storage, inventory, and pokedex progress.

## Project Structure

### Root Directory
- `App.tsx`: The main application component. Manages global state, tab management, file processing queue, and the overall layout.
- `index.tsx`: The entry point for the React application. Sets up the `ThemeProvider` and mounts the `App`.
- `index.html`: The base HTML template.
- `types.ts`: Global TypeScript type definitions.
- `metadata.json`: Application metadata (name, description).
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `vite.config.ts`: Vite build tool configuration.
- `.gitignore`: Specifies files and directories to be ignored by Git.

### `/components` - UI Components
Organized by functional area:
- **`/editor`**: Components for the main editing interface.
    - `EditorDashboard.tsx`: The main container for the editor views (Trainer, Party, PC, etc.).
    - `PCStorage.tsx`: Interface for managing Pokemon in PC boxes.
    - `PartyList.tsx`: Interface for managing the current party.
    - `TrainerCard.tsx`: Displays and allows editing of trainer information (Name, ID, Money, etc.).
    - `Inventory.tsx`: Management of items in the Bag and PC.
    - `Pokedex.tsx`: Interface for viewing and editing Pokedex completion.
    - `EventFlagsManager.tsx`: Advanced tool for toggling game events and flags.
    - `HallOfFame.tsx`: View for Hall of Fame records.
    - `BattleGuide.tsx`: Utility for battle-related information.
    - `EncounterDatabase.tsx`: Reference for Pokemon encounters.
    - `EditorTools.tsx`: Sidebar tools for sorting and mass-manipulation.
    - `LoadSaveModal.tsx`: Modal for uploading save files.
    - `ExportModal.tsx`: Modal for downloading modified save files.
    - `SortSettingsModal.tsx`: Configuration for the auto-sort feature.
    - **`/pokemon`**: Sub-components specifically for individual Pokemon display and editing.
- **`/home`**: Components for the landing page.
    - `Hero.tsx`: The main welcome section.
    - `DropZone.tsx`: The drag-and-drop area for loading files.
    - `Features.tsx`: Highlights the app's capabilities.
    - `GameVersionSelector.tsx`: Prompt for selecting the game version if detection is ambiguous.
- **`/layout`**: Structural components.
    - `Header.tsx`: Top navigation and theme toggle.
    - `Footer.tsx`: Bottom information bar.
- **`/ui`**: Reusable low-level UI elements.
    - `Autocomplete.tsx`: Custom searchable dropdown.
    - `PokemonBadges.tsx`: Visual representation of gym badges.
    - `PokemonDetailView.tsx`: Detailed modal/view for a single Pokemon's stats and moves.
    - `SettingsModal.tsx`: Modal for configuring application preferences (Sprite Style, etc.).

### `/context` - State Management
- `ThemeContext.tsx`: Manages the application's theme (Light/Dark), game-specific color palettes, and sprite style preferences.

### `/data` - Static Data
- `games.ts`: Definitions for supported Pokemon games and their metadata.

### `/lib` - Core Logic
- **`/parser`**: Logic for reading raw `.sav` or `.srm` files and converting them into a structured JavaScript object.
    - `index.ts`: The main parsing entry point.
    - `types.ts`: Type definitions for the parsed save data.
- **`/writer`**: Logic for converting the structured data back into binary format for saving.
    - `gen1.ts`: Binary writer specifically for Generation 1 saves.
- **`/utils`**: Helper functions and business logic.
    - `byteHelpers.ts`: Low-level binary data manipulation.
    - `textDecoder.ts`: Handles the proprietary character encoding used in Pokemon games.
    - `statCalculator.ts`: Logic for calculating Pokemon stats from IVs/EVs.
    - `experience.ts`: Logic for experience point and level calculations.
    - `manipulation.ts`: Functions for moving Pokemon between boxes/saves.
    - `sortManager.ts`: Implementation of the advanced sorting and "Living Dex" logic.
    - `encounterGenerator.ts`: Logic for generating legal Pokemon encounters.
    - `io.ts`: File input/output helpers.
    - `sprites.ts`: Utility for generating Pokemon sprite URLs based on selected style and game version.

## Key Features
1. **Multi-Tab Support**: Edit multiple save files at once and transfer Pokemon between them.
2. **Advanced Sorting**: Automatically organize PC boxes by ID, Type, Level, or Name.
3. **Living Dex Generator**: Automatically pulls Pokemon from all open saves to create a complete collection in the active save.
4. **Themable Interface**: The UI changes colors based on the active game version (Red, Blue, Yellow).
5. **Comprehensive Editing**: Full control over Pokemon stats, moves, DVs, and trainer progress.
6. **Safe Writing**: Re-calculates checksums to ensure generated save files are valid and loadable on hardware/emulators.
7. **Customizable Appearance**: Choose between Game Pixel, Normal, or Official Artwork sprite styles.
