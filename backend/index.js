const config = require('./config');
const app = require('./app');
const db = config.db;
const port = config.config.port;

const Project = require('./models/Project');
const Commit = require('./models/Commit');
const User = require('./models/User');
const Team = require('./models/Team');
const Bug = require('./models/Bug');

Team.hasMany(User, {
    as: 'users',
    foreignKey: 'team_id'
});
User.belongsTo(Team, {
    as: 'team',
    foreignKey: 'team_id'
});

User.hasMany(Commit, {
    as: 'commits',
    foreignKey: 'user_id'
});
Commit.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

Team.hasMany(Project, {
    as: 'projects',
    foreignKey: 'team_id'
});
Project.belongsTo(Team, {
    as: 'team',
    foreignKey: 'team_id'
});

Project.hasMany(Commit, {
    as: 'commits',
    foreignKey: 'project_id'
});
Commit.belongsTo(Project, {
    as: 'project',
    foreignKey: 'project_id'
});

Commit.hasMany(Bug, {
    as: 'bugs',
    foreignKey: 'commit_id',
});
Bug.belongsTo(Commit, {
    as: 'commit',
    foreignKey: 'commit_id'
})

Bug.belongsTo(User, {
    as: 'alocatedUser',
    foreignKey: 'alocated_user_id'
})

Bug.belongsTo(Commit, {
    as: 'solvedCommit',
    foreignKey: 'solved_with_commit'
})

db.sync();

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})