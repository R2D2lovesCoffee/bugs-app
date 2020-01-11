const router = require('express').Router();
const Project = require('../models/Project');
const Commit = require('../models/Commit');
const Bug = require('../models/Bug');

router.post('/', (req, res) => {
    const { user_id, project_id, message } = req.body;
    if (user_id && project_id && message) {
        Commit.create({ user_id, project_id, message })
            .then(commit => commit.dataValues).then(commit => {
                commit.link = `${commit.id}_${commit.user_id}_${commit.project_id}`;
                commit.bugs = [];
                res.send(commit);
            }).catch(error => {
                console.log(error);
                res.status(500).send({ message: 'Something went wrong. Try again later.' })
            });
    }
})

router.post('/:id/bugs', (req, res) => {
    const commit_id = Number(req.params.id);
    if (isNaN(commit_id)) {
        res.status(400).send({ message: 'Bad request!' })
    } else {
        const { severity, priority, description } = req.body;
        if (Number(severity) && Number(priority) && description) {
            Bug.create({ commit_id, ...req.body, allocated_user_id: null, solved: false, solved_with_commit: null })
                .then(bug => res.send(bug))
                .catch(error => {
                    console.log(error);
                    res.status(500).send({ message: 'Something went wrong. Try again later.' })
                });
        } else {
            res.status(400).send({ message: 'Bad request!' });
        }
    }
})

module.exports = router;