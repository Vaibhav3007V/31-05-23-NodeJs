const db = require('../config/db.config');
const { saveTable: saveTableQuery, fetchTable: fetchTableQuery} = require('../database/queries');
const { logger } = require('../utils/logger');

class Tambola {
    constructor(token_id, tambolaTable) {
        this.token_id = token_id;
        this.tambolaTable=tambolaTable
    }

    static create(newTambola, cb) {
        db.query(saveTableQuery,
            [
                newTambola.token_id,
                newTambola.tambolaTable
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    tokenId: newTambola.token_id,
                    tambolaTable: newTambola.tambolaTable
                });
            });
    }

    static findByTokenId(token_id, cb) {
        db.query(fetchTableQuery, token_id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = Tambola;