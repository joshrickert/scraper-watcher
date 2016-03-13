var config = require('./config.js');
var mailgun = require('mailgun-js')(config.mailgun);
var xray = require('x-ray')();
var schedule = require('node-schedule');

console.log('Starting Scraper Watcher...');

schedule.scheduleJob(config.schedule, function() {
  console.log(`Scraper Watching is checking ${config.url}...`);
  
  xray(config.url, config.selector)(function (err, contents) {
    if(err) {
      console.error(err);

      sendNotification({
        subject: 'Scraper Watcher error',
        text: err,
      }, true);
    }

    if(config.searchStrings.indexOf(contents) > -1) {
      console.log(`A match was found in ${contents} at ${new Date()}!`);

      sendNotification({
        subject: 'A match has been found!',
        text: `Scraper Watcher has found a match in: ${contents}`,
      });      
    } else {
      console.log(`No match found in ${contents} at ${new Date()}`);

      sendNotification({
        subject: 'No match found',
        text: `Scraper Watcher has not found a match in: ${contents}`,
      }, true);
    }
  });
});

/**
 * Send a notification using Mailgun.
 * Logs errors to the console.
 * 
 * @param {Object} options
 * @param {string} options.subject Email subject line.
 * @param {string} options.text Email message.
 * @param {boolean} [debug] If set to true, the notification will only be sent
 *   if `config.debug === true` as well.
 */
function sendNotification(options, debug) {
  if(debug && !config.debug) return;

  var text = debug ? options.text + '\nTo stop these messages, set debug: false in the configuration.' : options.text;

  mailgun.messages().send({
    from: config.notifyFrom,
    to: config.notifyEmail,
    subject: options.subject,
    text: text,
  }, function(err, body) {
    if(err) console.error(err);
  });
}