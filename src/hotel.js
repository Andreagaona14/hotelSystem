"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class hotelSystemImpl {
    constructor(rooms) {
        this.reservations = [];
        this.totalRooms = rooms;
    }
    searchReservation(id) {
        const reservation = this.reservations.find(r => r.id === id);
        if (!reservation)
            throw new Error("La reservación no fue encontrada");
        return reservation;
    }
    getSortReservations() {
        return [...this.reservations].sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime());
    }
    addReservation(reservation) {
        if (this.isRoomAvailable(reservation.roomNumber, reservation.checkIn, reservation.checkOut)) {
            this.reservations.push(reservation);
        }
        else {
            throw new Error("La habitación no está disponible");
        }
    }
    removeReservation(id) {
        const index = this.reservations.findIndex(r => r.id === id);
        if (index === -1)
            throw new Error("La reservación que se busca remover no existe");
        return this.reservations.splice(index, 1)[0];
    }
    getReservations() {
        return [...this.reservations];
    }
    getAvailableRooms(checkIn, checkOut) {
        const availableRooms = new Set(Array.from({ length: this.totalRooms }, (_, i) => i + 1));
        this.reservations.forEach(reservation => {
            if (!(new Date(reservation.checkOut) <= new Date(checkIn) || new Date(reservation.checkIn) >= new Date(checkOut))) {
                availableRooms.delete(reservation.roomNumber);
            }
        });
        return Array.from(availableRooms);
    }
    isRoomAvailable(roomNumber, checkIn, checkOut) {
        return this.reservations.every(reservation => reservation.roomNumber !== roomNumber ||
            new Date(reservation.checkOut) <= new Date(checkIn) ||
            new Date(reservation.checkIn) >= new Date(checkOut));
    }
}
exports.default = hotelSystemImpl;
