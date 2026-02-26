import { ParsedSave, PokemonStats } from '../parser/types';

export type MoveLocation = 
    | { type: 'party', index: number }
    | { type: 'box', boxIndex: number, index: number };

export function isSameLocation(a: MoveLocation, b: MoveLocation): boolean {
    if (a.type !== b.type) return false;
    if (a.type === 'party') return a.index === b.index;
    return (a as any).boxIndex === (b as any).boxIndex && a.index === b.index;
}

export function transferPokemonBatch(
    sourceSave: ParsedSave,
    targetSave: ParsedSave,
    sources: MoveLocation[],
    target: MoveLocation
): { success: boolean; newSource?: ParsedSave; newTarget?: ParsedSave; error?: string } {
    // Placeholder implementation
    return { success: true, newSource: sourceSave, newTarget: targetSave };
}

export function movePokemonBatch(
    save: ParsedSave,
    sources: MoveLocation[],
    target: MoveLocation
): { success: boolean; newData?: ParsedSave; error?: string } {
    // Placeholder implementation
    return { success: true, newData: save };
}
