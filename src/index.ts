import hotelSystemImpl from "./hotel";
import { Reservation } from "./types";
import * as readline from 'readline';

const hotelSystem = new hotelSystemImpl(10);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log(`
        1. Buscar reservación por ID
        2. Obtener reservaciones ordenadas
        3. Agregar nueva reservación 
        4. Eliminar reservación por ID
        5. Obtener todas las reservaciones
        6. Obtener habitaciones disponibles 
        7. Salir
    `);

    rl.question('Seleccione una opción: ', (option) => {
        switch (option) {
            case '1':
                rl.question('Ingrese el ID de la reservación: ', (id) => {
                    try {
                        console.log(hotelSystem.searchReservation(id));
                    } catch (e) {
                        if (e instanceof Error) {
                            console.log(e.message);
                        } else {
                            console.log('Error desconocido');
                        }
                    }
                    menu();
                });
                break;

            case '2':
                console.log(hotelSystem.getSortReservations());
                menu();
                break;

            case '3':
                rl.question('Ingrese el ID: ', (id) => {
                    rl.question('Ingrese el nombre: ', (name) => {
                        rl.question('Ingrese la fecha de check-in (dd/mm/yyyy): ', (checkIn) => {
                            rl.question('Ingrese la fecha de check-out (dd/mm/yyyy): ', (checkOut) => {
                                rl.question('Ingrese el número de habitación: ', (roomNumber) => {
                                    const reservation: Reservation = { id, name, checkIn, checkOut, roomNumber: parseInt(roomNumber) };
                                    try {
                                        hotelSystem.addReservation(reservation);
                                        console.log('Reservación agregada');
                                    } catch (e) {
                                        if (e instanceof Error) {
                                            console.log(e.message);
                                        } else {
                                            console.log('Error desconocido');
                                        }
                                    }
                                    menu();
                                });
                            });
                        });
                    });
                });
                break;

            case '4':
                rl.question('Ingrese el ID de la reservación a eliminar: ', (id) => {
                    try {
                        console.log(hotelSystem.removeReservation(id));
                    } catch (e) {
                        if (e instanceof Error) {
                            console.log(e.message);
                        } else {
                            console.log('Error desconocido');
                        }
                    }
                    menu();
                });
                break;

            case '5':
                console.log(hotelSystem.getReservations());
                menu();
                break;

            case '6':
                rl.question('Ingrese la fecha de check-in (dd/mm/yyyy): ', (checkIn) => {
                    rl.question('Ingrese la fecha de check-out (dd/mm/yyyy): ', (checkOut) => {
                        console.log(hotelSystem.getAvailableRooms(checkIn, checkOut));
                        menu();
                    });
                });
                break;

            case '7':
                rl.close();
                break;

            default:
                console.log('Opción no válida');
                menu();
                break;
        }
    });
}

menu();