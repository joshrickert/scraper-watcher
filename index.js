var config = require('./config.js');
var xray = require('x-ray')();
var mailgun = require('mailgun-js')(config.mailgun);

xray(config.url, config.selector)(function (err, contents) {
	if(err) {
		console.log(err);
	}

	if(config.searchStrings.indexOf(contents) > -1) {
		console.log('winner!');
		mailgun.messages().send({
			from: 'Scraper Watcher',
			to: config.notifyEmail,
			subject: 'A match has been found!',
			text: 'Scraper Watcher has found a match in:\n' + contents
		}, function(err, body) {
			if(err) {
				console.log(err);
			}
		});
	} else {
		// Do nothing
	}
});