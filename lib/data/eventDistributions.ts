export interface EventPokemonData {
    id: string;
    name: string;
    level: number;
    moves: string[];
    title: string;
    tags: string[];
    bytes: number[];
    generation: number;
    description: string;
    previewDexId: number;
    credit?: string;
    creditLink?: string;
}

export const EVENT_DISTRIBUTIONS: EventPokemonData[] = [];
export const eventDistributions = EVENT_DISTRIBUTIONS;
