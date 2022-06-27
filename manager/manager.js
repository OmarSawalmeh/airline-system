// 'use strict';
// console.log('ynwa');

// const {faker} = require('@faker-js/faker');

// const events = require('../events/events');
// require('../pilot');


// console.log('ynwa');
// setInterval(()=>{
//     const randomPilots = faker.name.findName();
//     const randomID = faker.random.numeric();
//     const randomDestinations  = faker.address.country();
//     const data = {
//         pilots: randomPilots,
//         id: randomID,
//         destinations: randomDestinations
//     }

//     const Flight = {
//         Flight : {
//          event: '',
//             time: new Date(),
//             Details: {
//             airLine: 'London Heathrow Airport',
//             destination: randomDestinations,
//             pilot: randomPilots,
//             flightID: randomID
//             }
//         }
//     }

//     events.once('flight-arrived', handleFlightArrived);
//     function handleFlightArrived(payload){
//         console.log(`Manager: we’re greatly thankful for the amazing flight, ${Flight.Flight.Details.pilot}`);
//         console.log('---------------------------------------------------------------------------------------');
//         return;
//     }

//     Flight.Flight.event = 'new-flight';
//     events.emit('new-flight', Flight);

// }, 10000)

'use strict';
require('dotenv').config();

const {faker} = require('@faker-js/faker');

// Generate data
const randomPilots = faker.name.findName();
const randomID = faker.random.numeric();
const randomDestinations  = faker.address.country();

const Flight = {
    Flight : {
     event: '',
        time: new Date(),
        Details: {
        airLine: 'London Heathrow Airport',
        destination: randomDestinations,
        pilot: randomPilots,
        flightID: randomID
        }
    }
}

const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}/`;
const connection = io.connect(host);
connection.on('Manager', handleMa);
function handleMa(payload){
     console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload}`);
}
setInterval(()=>{

    console.log(`Manager: new flight with ID ${randomID} have been scheduled`);
    Flight.Flight.Details.flightID = randomID;
    Flight.Flight.Details.pilot = randomPilots;
    Flight.Flight.Details.destination = randomDestinations;
    connection.emit('new-flight', Flight);
    setTimeout(async function() {
        console.log(`Manager: we’re greatly thankful for the amazing flight, ${randomPilots}`);

    }, 9999);

 }, 10000);
