export interface EventPokemonData {
    id: string;
    name: string;
    level: number;
    moves: string[];
}

export const EVENT_DISTRIBUTIONS: EventPokemonData[] = [];
export const eventDistributions = EVENT_DISTRIBUTIONS;
