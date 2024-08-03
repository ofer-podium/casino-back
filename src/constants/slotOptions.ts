export type SlotKey = 'C' | 'L' | 'O' | 'W';

export const SLOT_OPTIONS: Record<SlotKey, { name: string; reward: number }> = {
    C: { name: 'Cherry', reward: 10 },
    L: { name: 'Lemon', reward: 20 },
    O: { name: 'Orange', reward: 30 },
    W: { name: 'Watermelon', reward: 40 }
};