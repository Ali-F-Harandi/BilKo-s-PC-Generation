
import { SpriteStyle } from '../../context/SettingsContext';
import { GameVersion } from '../parser/types';

/**
 * Normalizes item names for PokeAPI sprite URLs.
 * Example: "Poké Ball" -> "poke-ball"
 */
export const getNormalizedItemSlug = (name: string): string => {
    const map: Record<string, string> = {
        "exp. all": "exp-share",
        "thunderstone": "thunder-stone",
        "elixer": "elixir",
        "max elixer": "max-elixir",
        "paralyz heal": "paralyze-heal",
        "parlyz heal": "paralyze-heal",
        "x defend": "x-defense",
        "guard spec.": "guard-spec",
    };

    const lowerName = name.toLowerCase();
    if (map[lowerName]) return map[lowerName];

    return lowerName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/ /g, '-')
        .replace(/\./g, '')
        .replace(/'/g, '')
        .replace(/[^a-z0-9-]/g, ''); // Remove any other non-alphanumeric chars except hyphen
};

/**
 * Gets the sprite URL for a Pokemon based on style and game version.
 */
export const getPokemonSpriteUrl = (
    dexId: number, 
    style: SpriteStyle, 
    version?: GameVersion
): string => {
    if (dexId === 0) return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

    switch (style) {
        case 'artwork':
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexId}.png`;
        
        case 'normal':
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexId}.png`;
        
        case 'game':
        default:
            const gen1Path = version === 'Yellow' ? 'yellow' : 'red-blue';
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/${gen1Path}/transparent/${dexId}.png`;
    }
};

/**
 * Gets the sprite URL for an item.
 */
export const getItemSpriteUrl = (name: string): string | null => {
    if (name.startsWith('TM') || name.startsWith('HM')) return null;
    const slug = getNormalizedItemSlug(name);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${slug}.png`;
};
