const dial = require('peer-dial');
const http = require('http');
const express = require('express');
const EventEmitter = require('events');
const YouTubeApp = require('./app');
const Player = require('./player');

function getDelegate(apps) {
	
	let delegate = {};

	delegate.getApp = (appName) => {
		return apps[appName] || null;
	}

	delegate.launchApp = (appName, launchData, callback) => {
		if (apps[appName]) {
			apps[appName].launch(launchData)
				.then( pid => {
					console.log('dial: returning pid ' + pid);
					callback(pid) 
				})
				.catch( error => callback(null) );
		}
		else {
			callback(null);
		}
	}

	delegate.stopApp = (appName, pid, callback) => {
		if (apps[appName]) {
			apps[appName].stop(pid);
			callback(true);
		}
		else {
			callback(false);
		}
	}

	return delegate;
}

function main(player, options = {}) {
	let _express = express();
	let eventEmitter = new EventEmitter();

	let ytAppOptions = {
		screenName: options.screenName,
		screenApp: options.screenApp,
		debug: options.debug,
		defaultAutoplay: options.defaultAutoplay,
		autoplayLoader: options.autoplayLoader	
	};

	let app = new YouTubeApp(player, ytAppOptions);

	app.on('clientConnected', client => {
		eventEmitter.emit('connected', client);
	});
	app.on('clientDisconnected', client => {
		eventEmitter.emit('disconnected', client);
	});

	let dialOptions = {
		expressApp: _express,
		port: options.port || 3000,
		corsAllowOrigins: options.corsAllowOrigins || false,
		prefix: options.prefix || '/ytcr',
		delegate: getDelegate({
			'YouTube': app
		}),
		bindToInterfaces: options.bindToInterfaces,
		bindToAddresses: options.bindToAddresses,
		friendlyName: options.friendlyName,
		manufacturer: options.manufacturer,
		modelName: options.modelNames
	};
	let ds = new dial.Server(dialOptions);
	let server = http.createServer(_express);

	return {
		start: () => {
			server.listen(dialOptions.port, () => {
				ds.start();
				console.log(`[yt-cast-receiver] Listening on port ${dialOptions.port}`);
				eventEmitter.emit('started');
			});
		},
		stop: async () => {
			await app.stop(null, true);
			ds.stop();
			await server.close();
			console.log(`[yt-cast-receiver] Stopped`);
			eventEmitter.emit('stopped');
		},
		on: (eventName, listener) => {
			eventEmitter.on(eventName, listener);
		},
		off: (eventName, listener) => {
			eventEmitter.off(eventName, listener);
		},
		setDefaultAutoplay: (value) => {
			app.setDefaultAutoplay(value);
		},
		setAutoplayLoader: (loader) => {
			app.setAutoplayLoader(loader);
		},
		setDebug: (value) => {
			app.setDebug(value);
		}
	};
}

module.exports = {
	instance: main,
	Player
};