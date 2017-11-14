const Hapi = require('hapi');
const mongoose = require('mongoose');

const plugins = require('./src/plugins/defaultPlugins/defaultPlugins');
const routes = require('./src/routes/apiRoutes');
const logger = require('./src/utils/loggerConfig');

const db = 'mongodb://127.0.0.1/scout24';
const server = new Hapi.Server();
const connectionObject = { host: '0.0.0.0', port: 8000, routes: { cors: true } };
server.connection(connectionObject);


server.register(plugins, (err) => {
  if (err) {
    logger.error(err);
  }
});
server.route(routes);


server.start((err) => {
  if (err) {
    logger.error(err);
  }
  mongoose.connect(db, {
    useMongoClient: true,
  });
  logger.info(`server running on port ${server.info.uri}`);
});
