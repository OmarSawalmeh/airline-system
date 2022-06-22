'use strict';

const events = require('./events');
require('./system');
require('./manager');


events.on('new-flight', handleNewFlight);

function handleNewFlight(payload){
    console.log(`Manager: New flight with ID ${payload.Flight.Details.flightID} has been scheduled`);
    console.log(payload);

    setTimeout(async function() {
        payload.Flight.event = 'took-off';
        await events.emit('took-off', payload);
    }, 4000);

    setTimeout(async function() {
        payload.Flight.event = 'Arrived';
        await events.emit('Arrived', payload);
    }, 7000);
    
    setTimeout(async function() {
        await events.emit('flight-arrived', payload.pilot);
    }, 9000);
    
}

