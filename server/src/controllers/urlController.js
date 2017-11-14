/**
 * @file customerController.js
 * @description This is the controller for  urlAnalytics
 * @author Pruthvi Hemanth
 */

const Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));
const UrlModel = require('../models/urlModel');
const logger = require('../utils/loggerConfig');
const urlanalysis = require('urlanalysis');


const urlController = class {
  constructor() {
    this.name = 'prudhvi hemanth';
  }
  /**
       * @static
       * @param {any} req
       * @param {any} reply
       * @description This function is intended to give the url as input and saves its result in db
       * @returns {Boolean} returns true or false based on success/error
       */

  static getUrlData(req, reply) {
    urlanalysis(req.payload.url)
      .then((data) => {
        const urlObject = new UrlModel({
          url: req.payload.url,
          htmlVersion: data.htmlVersion,
          title: data.title,
          headings: {
            h1: data.headings.h1, h2: data.headings.h2, h3: data.headings.h3, h4: data.headings.h4, h5: data.headings.h5, h6: data.headings.h6,
          },
          links: { internal: data.internallinks, external: data.externallinks, unaccessable: data.unaccessibleLinks },
          loginFormExists: data.loginFormExists,
          errorStatus: data.errorStatusCode,
          errorMessage: data.errorMessage,
        });

        urlObject.save()
          .then(() => {
            logger.info('getallUrldata db call is successful');
            reply(true);
          })
          .catch((err) => {
            logger.warn(err);
            reply(false);
          });
      })
      .catch((err) => {
        logger.warn(err);
        reply(false);
      });
  }

  /**
       * @static
       * @param {any} req
       * @param {any} reply
       * @description This function is intended to fetch all url analysis from the db.
       * @returns {Array} returns array of objects
       */

  static getallUrlsData(req, reply) {
    UrlModel.find()
      .then((data) => {
        logger.info('getallUrls db call is successful');
        reply(data);
      })
      .catch((err) => {
        logger.warn(err);
        reply(false);
      });
  }
};

/**
 * Module representing the customerController.
 * @module urlController
 * @type {Class}
 */
module.exports = urlController;

