const router = require('express').Router();
const Team = require('../models/Team');
const User = require('../models/User');

router.get('/', (req, res) => {
    Team.findAll().then(teams => {
        res.send(teams);
    }).catch(error => {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong. Try again later.' })
    });
})

router.post('/', (req, res) => {
    const { teamName, userId } = req.body;
    Team.findOne({ where: { name: teamName } })
        .then(team => {
            if (team) {
                res.status(400).send({ message: 'Team already exists!' })
            } else {
                Team.create({ name: teamName }).then(team => {
                    User.update({ team_id: team.id }, { where: { id: userId } })
                    res.send(team);
                })
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

router.put('/', (req, res) => {
    const { id, name } = req.body;
    Team.put({ name }, { where: { id } }).then(() => res.send({ message: 'Success' }))
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Something went wrong. Try again later.' })
        });
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).send({ message: 'Bad request' });
    } else {
        Team.delete({ where: { id } })
            .catch(error => {
                console.log(error);
                res.status(500).send({ message: 'Something went wrong. Try again later.' })
            });
    }
})

module.exports = router;