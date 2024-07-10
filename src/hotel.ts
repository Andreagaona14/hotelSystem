import { Reservation, hotelSystem } from "./types";

class hotelSystemImpl implements hotelSystem {
    private reservations: Reservation[] = [];
    private totalRooms: number;

    constructor(rooms: number) {
        this.totalRooms = rooms;
    }

    searchReservation(id: string): Reservation {
        const reservation = this.reservations.find(r => r.id === id);
        if (!reservation) throw new Error("La reservación no fue encontrada");
        return reservation;
    }

    getSortReservations(): Reservation[] { // Asegúrate de que el nombre del método esté correcto
        return [...this.reservations].sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime());
    }

    addReservation(reservation: Reservation): void {
        if (this.isRoomAvailable(reservation.roomNumber, reservation.checkIn, reservation.checkOut)) {
            this.reservations.push(reservation);
        } else {
            throw new Error("La habitación no está disponible");
        }
    }

    removeReservation(id: string): Reservation {
        const index = this.reservations.findIndex(r => r.id === id);
        if (index === -1) throw new Error("La reservación que se busca remover no existe");
        return this.reservations.splice(index, 1)[0];
    }

    getReservations(): Reservation[] {
        return [...this.reservations];
    }

    getAvailableRooms(checkIn: string, checkOut: string): number[] {
        const availableRooms = new Set<number>(Array.from({ length: this.totalRooms }, (_, i) => i + 1));
        this.reservations.forEach(reservation => {
            if (!(new Date(reservation.checkOut) <= new Date(checkIn) || new Date(reservation.checkIn) >= new Date(checkOut))) {
                availableRooms.delete(reservation.roomNumber);
            }
        });
        return Array.from(availableRooms);
    }

    private isRoomAvailable(roomNumber: number, checkIn: string, checkOut: string): boolean {
        return this.reservations.every(reservation =>
            reservation.roomNumber !== roomNumber ||
            new Date(reservation.checkOut) <= new Date(checkIn) ||
            new Date(reservation.checkIn) >= new Date(checkOut)
        );
    }
}

export default hotelSystemImpl;