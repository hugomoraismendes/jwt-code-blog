const postsController = require('./posts-controller');
const { authMiddlewares } = require('../users');

module.exports = app => {
  app
    .route('/post')
    .get(postsController.listPosts)
    .post(
      authMiddlewares.bearer,
      postsController.addPosts
    );
};
