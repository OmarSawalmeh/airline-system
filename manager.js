'use strict';
console.log('ynwa');

const {faker} = require('@faker-js/faker');

const events = require('./events');
require('./pilot');

console.log('ynwa');
setInterval(()=>{
    const randomPilots = faker.name.findName();
    const randomID = faker.random.numeric();
    const randomDestinations  = faker.address.country();
    const data = {
        pilots: randomPilots,
        id: randomID,
        destinations: randomDestinations
    }

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

    events.once('flight-arrived', handleFlightArrived);
    function handleFlightArrived(payload){
        console.log(`Manager: we’re greatly thankful for the amazing flight, ${Flight.Flight.Details.pilot}`);
        console.log('---------------------------------------------------------------------------------------');
        return;
    }

    Flight.Flight.event = 'new-flight';
    events.emit('new-flight', Flight);

}, 10000)