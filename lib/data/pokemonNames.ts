export const POKEMON_NAMES: Record<number, string> = {};

export function getPokemonName(dexId: number): string {
  return POKEMON_NAMES[dexId] || `Pokemon #${dexId}`;
}

// Helper to find Pokemon ID by name (case-insensitive)
export function getPokemonIdByName(name: string): number {
  const normalizedName = name.toUpperCase();
  for (const [id, pokemonName] of Object.entries(POKEMON_NAMES)) {
    if (pokemonName.toUpperCase() === normalizedName) {
      return parseInt(id, 10);
    }
  }
  return -1;
}
