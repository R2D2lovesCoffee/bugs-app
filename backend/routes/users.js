const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
        .then(user => {
            if (user) {
                res.status(400).send({ message: 'Email already exists.' });
            } else {
                User.create({ email, password, role: 'NOT_SET' })
                    .then(() => res.send({ message: 'Success!' }))
                    .catch(error => {
                        console.log(error);
                        res.status(500).send({ message: 'Something went wrong. Try again later.' })
                    });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Something went wrong. Try again later.' })
        });
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ where: { email, password } })
        .then(user => {
            if (user) {
                const token = jwt.sign({ email, role: user.role }, 'secret');
                res.clearCookie('token');
                res.cookie('token', token);
                res.send({ message: 'Success.' });
            } else {
                res.status(400).send({ message: 'Incorrect username or password.' })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Something went wrong. Try again later.' })
        });
})

module.exports = router;