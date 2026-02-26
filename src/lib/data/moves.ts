export const MOVES_LIST: Record<number, string> = {};
export const MOVES_PP: Record<number, number> = {};
export const MOVES_TYPE: Record<number, number> = {};

export function getMoveName(moveId: number): string {
  return MOVES_LIST[moveId] || `Move #${moveId}`;
}
