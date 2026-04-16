export interface TrainerInfo {
    name: string;
    id: string;
    money: number;
    coins: number;
    playTime: string;
    badges: number;
    rivalName: string;
    pikachuFriendship: number;
    gender: 'Male' | 'Female';
}

export const TYPE_COLORS: Record<string, string> = {
    Normal: '#A8A77A',
    Fire: '#EE8130',
    Water: '#6390F0',
    Electric: '#F7D02C',
    Grass: '#7AC74C',
    Ice: '#96D9D6',
    Fighting: '#C22E28',
    Poison: '#A33EA1',
    Ground: '#E2BF65',
    Flying: '#A98FF3',
    Psychic: '#F95587',
    Bug: '#A6B91A',
    Rock: '#B6A136',
    Ghost: '#735797',
    Dragon: '#6F35FC',
    Steel: '#B7B7CE',
    Fairy: '#D685AD'
};

export const REGION_BADGES: Record<number, Array<{ name: string }>> = {
    1: [
        { name: 'Boulder Badge' },
        { name: 'Cascade Badge' },
        { name: 'Thunder Badge' },
        { name: 'Rainbow Badge' },
        { name: 'Soul Badge' },
        { name: 'Marsh Badge' },
        { name: 'Volcano Badge' },
        { name: 'Earth Badge' }
    ]
};
