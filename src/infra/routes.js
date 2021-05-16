const posts = require('../business/posts');
const user = require('../business/users');

module.exports = app => {
  app.get('/', (req, res) => {res.send('Olá pessoa!')});
  
  posts.routes(app);
  user.routes(app);
};