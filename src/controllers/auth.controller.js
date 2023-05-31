const User = require('../models/user.model');
const Tambola = require('../models/tambola.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');
const tambolaData = require("../utils/tambola");
const { logger } = require('../utils/logger');

exports.signup = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.createTambola = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
        token_id = authHeader.substring(7, authHeader.length);
        var tambolaTable = tambolaData.generateTicket();
        var tambolaTableFinal = JSON.stringify(tambolaTable);
        const tambola = new Tambola(token_id, tambolaTableFinal);

        Tambola.create(tambola, (err, data) => {
            if (err) {
                res.status(500).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: "success",
                    data: {
                        data
                    }
                });
            }
        });
    } else {
        res.status(500).send({
            status: "error",
            message: "Missing the token in the header"
        });
    }
};

exports.fetchTambola = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
        token_id = authHeader.substring(7, authHeader.length);
        Tambola.findByTokenId(token_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    status: "error",
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: "success",
                    data: {
                        data
                    }
                });
            }
        });
    } else {
        res.status(500).send({
            status: "error",
            message: "Missing the token in the header"
        });
    }
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}