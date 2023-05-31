const { logger } = require('../../utils/logger');
const { createTableUSers: createTableUSersQuery, createTambola: createTambolaQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(createTableUSersQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
   });
    require('../../config/db.config').query(createTambolaQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Tambola table created!');
        process.exit(0);
    });
})();
