
export interface GameCartridge {
  id: string;
  name: string;
  generation: number;
  color: string;
  accentColor: string; // Used for stickers/details
  textColor: string;
}

export const pokemonGames: GameCartridge[] = [
  // Gen 1 Only
  { id: 'red', name: 'RED', generation: 1, color: '#FF3B3B', accentColor: '#FFcccc', textColor: '#000' },
  { id: 'blue', name: 'BLUE', generation: 1, color: '#3B4CCA', accentColor: '#ccccFF', textColor: '#000' },
  { id: 'yellow', name: 'YELLOW', generation: 1, color: '#FFD733', accentColor: '#FFFFE0', textColor: '#000' },
];

export type ThemeMode = 'light' | 'dark';
export type ThemeColor = 'default' | 'blue' | 'green'; // For future theming extensibility
export type SpriteStyle = 'normal' | 'artwork' | 'game';

export interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  activeGameId: string | null;
  setActiveGameId: (id: string | null) => void;
  getGameTheme: () => GameCartridge | undefined;
  spriteStyle: SpriteStyle;
  setSpriteStyle: (style: SpriteStyle) => void;
  getSpriteUrl: (dexId: number) => string;
}
