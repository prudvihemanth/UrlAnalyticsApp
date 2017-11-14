/**
 * @file Logging Configuration
 * @description This file defines the logging through winston module
 * @author Pruthvi Hemanth
 */


const winston = require('winston');

const tsFormat = () => (new Date()).toISOString();


const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: process.env.LOG_LEVEL,
    }),
  ],
});

// logger.debug('Debugging info');
// logger.verbose('Verbose info');
// logger.info('Hello world');
// logger.warn('Warning message');
// logger.error('Error info');

/**
 * Module representing the Winston logger.
 * @module plugins
 * @type {Object}
 */

module.exports = logger;
