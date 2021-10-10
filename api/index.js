const server = require('./src/app.js');
const { db } = require('./src/models/index');
require('dotenv').config();
const { PORT } = require('./src/utils/config/index');
const { ProductType } = require('./src/models/index');

// Syncing all the models at once.
db.sync()
  .then(async (req, res) => {

    const productTypes = await ProductType.findAll();
    if (productTypes.length < 1) {
      let typess = {
        types: [
          {
            Name: 'Technology',
            NameEs: 'Tecnologia',
          },
          {
            Name: 'Furniture',
            NameEs: 'Muebles',
          },
          {
            Name: 'Appliances',
            NameEs: 'Electrodomésticos',
          },
          {
            Name: 'Tools',
            NameEs: 'Herramientas',
          },
          {
            Name: 'Clothing',
            NameEs: 'Indumentaria',
          },
          {
            Name: 'Cars',
            NameEs: 'Automotor',
          },
          {
            Name: 'Sports',
            NameEs: 'Deportes',
          },
          {
            Name: 'Fashion',
            NameEs: 'Moda',
          },
          {
            Name: 'Games',
            NameEs: 'Juegos',
          },
          {
            Name: 'Food',
            NameEs: 'Alimentos',
          },
          {
            Name: 'Service',
            NameEs: 'Servicios',
          },
          {
            Name: 'Pets',
            NameEs: 'Mascotas',
          },
        ],
      };
      const create = await ProductType.bulkCreate(typess.types);
    }

    server.listen(PORT, () => {
      console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((err) => {
    console.error(err);
  });
