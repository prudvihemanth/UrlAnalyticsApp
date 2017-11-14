/**
 * @file plugins.js
 * @description This file registers hapi js plugins
 * @author Pruthvi Hemanth
 */


const inert = require('inert');
const vision = require('vision');
const swagger = require('hapi-swagger');
const good = require('good');
const GoodWinston = require('good-winston');
const winston = require('winston');
const moment = require('moment');


const goodWinstonStream = new GoodWinston({ winston, format: moment().format() });

const defaultPlugins = [
  {
    register: inert,
    options: {},
  },

  {
    register: vision,
    options: {},
  },


  {
    register: swagger,
    options: {
      info: {
        title: 'Scout24 Test API Documentation',
        version: '1.0.0',
      },
      pathPrefixSize: 2,
      basePath: '/v1',
      tags: [
        {
          name: 'Users',
          description: "All API's about User Operations",
        },
      ],
    },
  },

  {
    register: good,
    options: {
      ops: false,
      reporters: {
        winston: [goodWinstonStream],
      },
    },
  },

];


/**
 * Module representing the plugins.
 * @module plugins
 * @type {array}
 */

module.exports = defaultPlugins;
