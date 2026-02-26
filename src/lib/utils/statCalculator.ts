import { PokemonStats } from '../parser/types';

export function calculateGen1Stat(base: number, iv: number, ev: number, level: number, isHp: boolean): number {
  return 10;
}

export function deriveBaseStats(dexId: number) {
    return { hp: 0, atk: 0, def: 0, spe: 0, spc: 0 };
}

export function recalculateStats(mon: PokemonStats): PokemonStats {
    return mon;
}
