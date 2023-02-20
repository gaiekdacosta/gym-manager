const express = require("express");
const cors = require('cors')
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes)

app.use((error, _req, res, _next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})

const port = 3333;

app.listen(port, () => {
    console.log(`Running in http://localhost:${port}/`);
})