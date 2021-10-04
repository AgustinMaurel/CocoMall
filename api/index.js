const server = require('./src/app.js');
const { db } = require('./src/models/index');
require('dotenv').config();
const { PORT } = require('./src/utils/config/index');

// Syncing all the models at once.
<<<<<<< HEAD
db.sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
=======
db.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
        });
    })
    .catch((err) => {
        console.error(err);
>>>>>>> bb7fc35f2153389cb5d1179585885c9f768be307
    });
