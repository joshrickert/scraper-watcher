module.exports = {
  /**
   * Strings to search for in the target
   * @type {Array.<string>}
   */
  searchStrings: [
  	'XXXXXXXXX'
  ],

  /**
   * Target URL to load
   * @type {string}
   */
  url: 'http://example.com',

  /**
   * CSS selector to scrape content from and
   * compare to each member of `searchStrings`
   * @type {string}
   */
  selector: '.my-class',

  /**
   * Mailgun API credentials and domain
   * @type {Object}
   */
  mailgun: {
  	apiKey: 'key-XXXXXXXXXXXXXXXXXXXXXXX',
  	domain: 'mydomain.mailgun.org'
  },

  /**
   * Email to send notifications to
   * @type {string}
   */
  notifyEmail: 'you@yourdomain.com',

  /**
   * Email to send notifications from
   * @type {string}
   */
  notifyFrom: 'Scraper Watcher <scraperwatcher@yourdomain.com>',

  /**
   * Run the scraper on this schedule.
   * Accepts any valid schedule to pass into `node-schedule` module.
   * @see https://github.com/node-schedule/node-schedule
   * @type {mixed}
   */
  schedule: '* */5 * * * *',

  /**
   * Whether to send notifications if the target
   * does NOT match any `searchStrings`
   * @type {boolean}
   */
  debug: false,
};