import { SpriteStyle } from '../../types';

export const getPokemonSpriteUrl = (dexId: number, style: SpriteStyle, gameId: string): string => {
    // 1. Official Artwork
    if (style === 'artwork') {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexId}.png`;
    }

    // 2. Game Pixel Style (Gen 1)
    if (style === 'pixel') {
        // Yellow Version
        if (gameId === 'yellow') {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/transparent/${dexId}.png`;
        }
        // Red/Blue (Default for Gen 1)
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${dexId}.png`;
    }

    // 3. Normal (Modern Sprite) - Default fallback
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexId}.png`;
};
