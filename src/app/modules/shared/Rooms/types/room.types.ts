export enum RoomState {
    CLEANED = 'cleaned',
    RESERVED = 'reserved',
    DIRTY = 'dirty',
    TO_CHECK = 'toCheck'
}

export type Room = {
    number: number,
    state: RoomState,
    pricePerDay: number
}