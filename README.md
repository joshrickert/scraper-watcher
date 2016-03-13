This is a simple Node.js server script that will, on a schedule you set, scrape a web URL for one or more strings you specify. If any of the search strings are found, it will send an email notification using Mailgun.

To get started, copy `example.config.js` to `config.js` and update the parameters. The various options are documented in the config file.