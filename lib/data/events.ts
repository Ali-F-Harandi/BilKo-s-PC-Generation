export interface GameEvent {
  id: number;
  name: string;
  description: string;
  offset: number;
  bit: number;
  category: string;
}

export const GEN1_EVENTS: GameEvent[] = [
  { id: 1, name: 'Pallet Town: Oak\'s Parcel', description: 'Delivered Oak\'s Parcel', offset: 0, bit: 0, category: 'Story' },
  // Add more events as needed
];
