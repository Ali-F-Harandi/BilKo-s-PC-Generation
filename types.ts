
export interface GameCartridge {
  id: string;
  name: string;
  generation: number;
  color: string;
  accentColor: string; // Used for stickers/details
  textColor: string;
}

export type ThemeMode = 'light' | 'dark';
export type ThemeColor = 'default' | 'blue' | 'green'; // For future theming extensibility

export interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  activeGameId: string | null;
  setActiveGameId: (id: string | null) => void;
  getGameTheme: () => GameCartridge | undefined;
}
