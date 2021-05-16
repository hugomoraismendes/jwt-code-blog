const usersController = require('./user-controller');
const authMiddlewares = require('./auth-middlewares');

module.exports = app => {
  app
    .route('/user/login')
    .post(authMiddlewares.local, usersController.login);

  app
    .route('/user/logout')
    .get(authMiddlewares.bearer, usersController.logout);

  app
    .route('/user')
    .post(usersController.addUser)
    .get(usersController.listUser);

  app
    .route('/user/:id')
    .delete(authMiddlewares.bearer, usersController.deleteUser);
};
