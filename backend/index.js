const config = require('./config');
const app = require('./app');
const db = config.db;
const port = config.config.db;

db.sync();

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})