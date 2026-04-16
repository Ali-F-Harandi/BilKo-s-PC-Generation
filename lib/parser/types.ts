export type GameVersion = 'Red' | 'Blue' | 'Yellow';
export type Generation = 1;

export interface PokemonStats {
    pid: number;
    speciesId: number;
    dexId: number;
    speciesName: string;
    nickname: string;
    isNicknamed: boolean;
    form: number;
    originalTrainerName: string;
    originalTrainerId: number;
    secretId: number;
    originalTrainerGender: 'Male' | 'Female';
    level: number;
    exp: number;
    friendship: number;
    hp: number;
    maxHp: number;
    attack: number;
    defense: number;
    speed: number;
    special: number;
    spAtk: number;
    spDef: number;
    type1: number;
    type2: number;
    type1Name: string;
    type2Name: string;
    status: string;
    catchRate: number;
    moves: string[];
    moveIds: number[];
    movePp: number[];
    movePpUps: number[];
    isParty: boolean;
    isEgg: boolean;
    isShiny: boolean;
    gender: 'Male' | 'Female' | 'Genderless';
    pokerus: number;
    iv: { hp: number; attack: number; defense: number; speed: number; special: number; spAtk: number; spDef: number };
    ev: { hp: number; attack: number; defense: number; speed: number; special: number; spAtk: number; spDef: number };
    raw: Uint8Array;
    startOffset: number;
    nicknameRaw: Uint8Array;
    otNameRaw: Uint8Array;
}

export interface Item {
    id: number;
    name: string;
    count: number;
}

export interface HallOfFamePokemon {
    speciesId: number;
    dexId: number;
    speciesName: string;
    nickname: string;
    level: number;
    types: string[];
}

export interface HallOfFameTeam {
    id: number;
    pokemon: HallOfFamePokemon[];
}

export interface GameOptions {
    textSpeed: 'Fast' | 'Normal' | 'Slow';
    battleAnimation: 'On' | 'Off';
    battleStyle: 'Shift' | 'Set';
    sound: 'Mono' | 'Stereo' | 'Earphone1' | 'Earphone2' | 'Earphone3';
}

export interface ParsedSave {
    generation: number;
    gameVersion: GameVersion;
    originalFilename: string;
    fileSize: number;
    isValid: boolean;
    trainer: {
        name: string;
        id: string;
        money: number;
        coins: number;
        playTime: string;
        badges: number;
        rivalName: string;
        pikachuFriendship: number;
        gender: 'Male' | 'Female';
    };
    options: GameOptions;
    map: {
        currentMapId: number;
        x: number;
        y: number;
        lastMapId: number;
        warpedFromMap: number;
    };
    daycare: PokemonStats[];
    playerStarterId: number;
    rivalStarterId: number;
    pokedexOwned: number;
    pokedexSeen: number;
    pokedexOwnedFlags: boolean[];
    pokedexSeenFlags: boolean[];
    eventFlags: boolean[];
    partyCount: number;
    party: PokemonStats[];
    currentBoxId: number;
    currentBoxCount: number;
    currentBoxPokemon: PokemonStats[];
    pcBoxes: PokemonStats[][];
    hallOfFame: HallOfFameTeam[];
    items: Item[];
    pcItems: Item[];
    rawData: Uint8Array;
}

export interface ParserResult {
    success: boolean;
    data?: ParsedSave;
    error?: string;
}
