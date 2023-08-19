export enum RoomState {
    CLEANED = 'cleaned',
    RESERVED = 'reserved',
    DIRTY = 'dirty',
    TOCHECK = 'toCheck'
}

export type Room = {
    number: number,
    state: RoomState,
    pricePerDay: number
}