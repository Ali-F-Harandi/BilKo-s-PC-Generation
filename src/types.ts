
/**
 * Represents a Pokemon game cartridge with its visual properties for the UI.
 */
export interface GameCartridge {
  /** Unique identifier for the game (e.g., 'red', 'blue', 'yellow') */
  id: string;
  /** Display name of the game */
  name: string;
  /** Pokemon generation (1-5) */
  generation: number;
  /** Primary color of the cartridge */
  color: string;
  /** Accent color for UI details and stickers */
  accentColor: string;
  /** Text color that contrasts well with the primary color */
  textColor: string;
}

/** Supported theme modes */
export type ThemeMode = 'light' | 'dark';

/** Theme color variations for future extensibility */
export type ThemeColor = 'default' | 'blue' | 'green';

/**
 * Context type for managing application-wide theme and game-specific styling.
 */
export interface ThemeContextType {
  /** Current UI mode (light or dark) */
  mode: ThemeMode;
  /** Toggles between light and dark modes */
  toggleMode: () => void;
  /** Current theme variation */
  theme: ThemeColor;
  /** Sets the theme variation */
  setTheme: (theme: ThemeColor) => void;
  /** The ID of the currently active game (determines UI colors) */
  activeGameId: string | null;
  /** Sets the active game ID */
  setActiveGameId: (id: string | null) => void;
  /** Helper to get the full cartridge configuration for the active game */
  getGameTheme: () => GameCartridge | undefined;
}
