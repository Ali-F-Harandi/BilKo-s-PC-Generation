export interface GameInfo {
    id: string;
    name: string;
    color: string;
}

export const pokemonGames: GameInfo[] = [
    { id: 'red', name: 'Pokemon Red', color: '#ef4444' },
    { id: 'blue', name: 'Pokemon Blue', color: '#3b82f6' },
    { id: 'yellow', name: 'Pokemon Yellow', color: '#eab308' },
];
