/**
 * @file UrlAnalytics Routes
 * @description This file defines the routes for urlApp project
 * @author Pruthvi Hemanth
 */

const Joi = require('joi');
const urlController = require('../controllers/urlController');

const routes = [
  {
    method: 'POST',
    path: '/v1/getUrlData',
    config: {
      description: 'Api service to analyse and save url analytics data in db.',
      tags: ['api'],
      validate: {
        payload: {
          url: Joi.string().required(),
        },
      },
    },
    handler: urlController.getUrlData,
  },
  {
    method: 'GET',
    path: '/v1/getallUrlsData',
    config: {
      description: 'Api service to get all urls with data.',
      notes: 'get user detailss',
      tags: ['api'],
      validate: {
        params: {},
      },
    },
    handler: urlController.getallUrlsData,
  }];

  /**
 * Module representing the Api Endpoints.
 * @module plugins
 * @type {Array}
 */
module.exports = routes;
