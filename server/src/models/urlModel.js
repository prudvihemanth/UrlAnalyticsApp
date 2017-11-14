/**
 * @file Mongoosemodel.js
 * @description This file defines schema with proposed fields
 * @author Pruthvi Hemanth
 */

const Mongoose = require('mongoose');
const { Schema } = require('mongoose');


const UrlSchema = new Schema({
  headings: {
    h1: { type: String, required: true },
    h2: { type: String, required: true },
    h3: { type: String, required: true },
    h4: { type: String, required: true },
    h5: { type: String, required: true },
    h6: { type: String, required: true },
  },
  links: {
    internal: { type: String, required: true },
    external: { type: String, required: true },
    unaccessable: { type: String, required: true },
  },
  url: { type: String, required: true },
  errorStatus: { type: String, required: true },
  errorMessage: { type: String, required: true },
  title: { type: String, required: true },
  htmlVersion: { type: String, required: true },
  created: { type: Date, default: Date.now },
  loginFormExists: { type: String },
});

const urlAnalytics = Mongoose.model('url', UrlSchema);

/**
 * Module representing the Winston logger.
 * @module Mongoose Model
 * @type {Object}
 */
module.exports = urlAnalytics;
