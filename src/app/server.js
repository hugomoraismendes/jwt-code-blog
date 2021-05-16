require('dotenv').config()

const app = require('./app');
const port = 3000;
const db = require('../infra/db/sqlite/database');
require('../infra/db/redis/blacklist');

const routes = require('../infra/routes');
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
