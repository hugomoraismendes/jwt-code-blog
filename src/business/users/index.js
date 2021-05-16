module.exports = {
  routes: require('./user-routes'),
  controller: require('./user-controller'),
  model: require('./user-model'),
  authStrategy: require('./auth-strategy'),
  authMiddlewares: require('./auth-middlewares')
};
