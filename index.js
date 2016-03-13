var config = require('./config.js');
var mailgun = require('mailgun-js')(config.mailgun);
var xray = require('x-ray')();
var schedule = require('node-schedule');

console.log('Scraper Watcher is running...');

schedule.scheduleJob(config.schedule, function() {
  xray(config.url, config.selector)(function (err, contents) {
    if(err) console.error(err);

    if(config.searchStrings.indexOf(contents) > -1) {
      console.log('A match was found!');

      mailgun.messages().send({
        from: config.notifyFrom,
        to: config.notifyEmail,
        subject: 'A match has been found!',
        text: `Scraper Watcher has found a match in: ${contents}`,
      }, function(err, body) {
        if(err) console.error(err);
      });
      
    } else {
      console.log(`No match found in ${contents} at ${new Date()}`);

      if(config.debug) {
        mailgun.messages().send({
          from: config.notifyFrom,
          to: config.notifyEmail,
          subject: 'No match found',
          text: `Scraper Watcher has not found a match in: ${contents}\nTo stop these messages, set debug: false in the configuration.`,
        }, function(err, body) {
          if(err) console.error(err);
        });
      }
    }
  });
});