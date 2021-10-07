const server = require('./src/app.js');
const { db } = require('./src/models/index');
require('dotenv').config();
const { PORT } = require('./src/utils/config/index');

// Syncing all the models at once.
db.sync({force:true})
    .then(() => {
        server.listen(PORT, () => {
            console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
        });
    })
    .catch((err) => {
        console.error(err);
    });
