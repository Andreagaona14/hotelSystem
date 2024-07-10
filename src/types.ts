export interface Reservation {
    id: string;
    name: string;
    checkIn: string;
    checkOut: string;
    roomNumber: number;
}

export interface hotelSystem {
    searchReservation(id: string): Reservation;
    getSortReservations(): Reservation[];
    addReservation(reservation: Reservation): void;
    removeReservation(id: string): Reservation;
    getReservations(): Reservation[];
    getAvailableRooms(checkIn: string, checkOut: string): number[];
}