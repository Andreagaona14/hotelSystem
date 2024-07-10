"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_1 = __importDefault(require("./hotel"));
const readline = __importStar(require("readline"));
const hotelSystem = new hotel_1.default(10);
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
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            console.log(e.message);
                        }
                        else {
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
                                    const reservation = { id, name, checkIn, checkOut, roomNumber: parseInt(roomNumber) };
                                    try {
                                        hotelSystem.addReservation(reservation);
                                        console.log('Reservación agregada');
                                    }
                                    catch (e) {
                                        if (e instanceof Error) {
                                            console.log(e.message);
                                        }
                                        else {
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
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            console.log(e.message);
                        }
                        else {
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
