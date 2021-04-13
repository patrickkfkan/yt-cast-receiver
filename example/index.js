const ytcr = require('../lib');
const FakePlayer = require('./fake-player');

let player = new FakePlayer();

let receiver = ytcr.instance(player, {
    port: 8098
});

receiver.on('started', () => {
    console.log('Receiver started');
});

receiver.on('stopped', () => {
    console.log('Receiver stopped');
});

receiver.on('connected', client => {
    console.log(`Connected to ${client.name}`);
});

receiver.on('disconnected', client => {
    console.log(`Disconnected from ${client.name}`);
});

receiver.start();
