export type GameVersion = 'Red' | 'Blue' | 'Yellow';

export type SpriteStyle = 'pixel' | 'normal' | 'artwork';

export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    activeGameId: string | null;
    setActiveGameId: (id: string | null) => void;
    getGameTheme: () => { color: string; name: string } | undefined;
    spriteStyle: SpriteStyle;
    setSpriteStyle: (style: SpriteStyle) => void;
}
