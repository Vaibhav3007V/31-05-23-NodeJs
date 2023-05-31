const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTambola = `
CREATE TABLE IF NOT EXISTS tambola (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tokenId VARCHAR(500) NOT NULL UNIQUE, 
    tambolaTable VARCHAR(1000) NULL
)
`;

const saveTable = `
INSERT INTO tambola VALUES(null, ?, ?)
`;

const fetchTable = `
SELECT * FROM tambola WHERE tokenid = ?
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createTambola,
    saveTable,
    fetchTable,
    createNewUser,
    findUserByEmail
};
