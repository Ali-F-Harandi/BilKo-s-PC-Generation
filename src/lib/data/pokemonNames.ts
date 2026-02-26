export const POKEMON_NAMES: Record<number, string> = {};

export function getPokemonName(dexId: number): string {
  return POKEMON_NAMES[dexId] || `Pokemon #${dexId}`;
}
