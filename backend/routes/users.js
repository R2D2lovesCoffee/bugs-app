const router = require('express').Router();
const User = require('../models/User');
const Team = require('../models/Team');
const Project = require('../models/Project');
const Bug = require('../models/Bug');
const Commit = require('../models/Commit');

router.post('/register', (req, res) => {
    const { email, password, role } = req.body;
    User.findOne({ where: { email } })
        .then(user => {
            if (user) {
                res.status(400).send({ message: 'Email already exists.' });
            } else {
                User.create({ email, password, role, alocated: false })
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

router.post('/assign-bug', async (req, res) => {
    const { bugId, userId } = req.body;
    try {
        await Bug.update({ alocated_user_id: userId }, { where: { id: bugId } });
        // bug.alocatedUser = await bug.getAlocatedUser();
        await User.update({ alocated: true }, { where: { id: userId } });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong. Try again later.' })
    }
    res.send();
})

router.post('/solve-bug', async (req, res) => {
    const { userId, bugId, projectId, message } = req.body;
    let solvingCommit = null;
    try {
        solvingCommit = await Commit.create({ message, project_id: projectId, user_id: userId });
        solvingCommit = solvingCommit.dataValues;
        solvingCommit.bugs = [];
        await Bug.update({ solved_with_commit: solvingCommit.id }, { where: { id: bugId } });
        await User.update({ alocated: false }, { where: { id: userId } });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong. Try again later.' })
    }
    res.send({ ...solvingCommit, link: `${solvingCommit.id}_${solvingCommit.user_id}_${solvingCommit.project_id}` });
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ where: { email, password } })
        .then(user => {
            if (user) {
                delete user.password;
                res.send(user);
            } else {
                res.status(400).send({ message: 'Incorrect username or password.' })
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Something went wrong. Try again later.' })
        });
})

router.put('/team', (req, res) => {
    const { teamId, userId } = req.body;
    User.update({ team_id: teamId }, { where: { id: userId } })
        .then(() => res.send({ message: 'Success' }))
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Something went wrong. Try again later.' })
        });
})

router.get('/:id/team', (req, res) => {
    const id = Number(req.params.id);
    User.findOne({
        where: { id },
        attributes: ['team_id'],
    })
        .then(user => {
            Team.findOne({
                where: { id: user.team_id },
                include: [
                    // { model: User, as: 'users', attributes: ['id', 'email'] },
                    { model: Project, as: 'projects', attributes: ['id', 'repo'] },
                ],
            })
                .then(team => res.send(team))
                .catch(error => {
                    console.log(error);
                    res.status(500).send({ message: 'Something went wrong. Try again later.' })
                });
        }).catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Something went wrong. Try again later.' })
        });
})

module.exports = router;