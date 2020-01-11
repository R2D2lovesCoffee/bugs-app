const router = require('express').Router();
const Project = require('../models/Project');
const Commit = require('../models/Commit');
const Bug = require('../models/Bug');
const User = require('../models/User');

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).send({ message: 'Bad request!' });
    } else {
        Project.findOne({
            where: { id },
            include: [
                {
                    model: Commit, as: 'commits', include: [
                        {
                            model: Bug, as: 'bugs', include: [
                                { model: User, as: 'alocatedUser' },
                                { model: Commit, as: 'solvedCommit' }
                            ]
                        }
                    ]
                }
            ]
        }).then(project => project.dataValues).then(project => {
            if (project) {
                project.commits = project.commits.map(commit => commit.dataValues).map(commit => {
                    commit.bugs = commit.bugs.map(bug => {
                        if (bug.solvedCommit) {
                            bug.solvedCommit.link = `${bug.solvedCommit.id}_${bug.solvedCommit.user_id}_${bug.solvedCommit.project_id}}`
                        }
                        return bug;
                    })
                    return { ...commit, link: `${commit.id}_${commit.user_id}_${commit.project_id}` }
                })
                res.send(project);
            } else {
                res.status(404).send({ message: 'Project not found!' });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Something went wrong. Try again later.' })
        });
    }
})

module.exports = router;