module.exports = {
  searchStrings: [
  	'XXXXXXXXX'
  ],
  url: 'http://example.com',
  selector: '.my-class',
  mailgun: {
  	apiKey: 'key-XXXXXXXXXXXXXXXXXXXXXXX',
  	domain: 'mydomain.mailgun.org'
  },
  notifyEmail: 'you@yourdomain.com',
  notifyFrom: 'Scraper Watcher <scraperwatcher@yourdomain.com>',
  schedule: '* */5 * * * *',
  debug: false,
};