const express = require('express');
const routes = express.Router();

const GymRecordsController = require('../controllers/GymRecordsController');

routes
    .get('/', (_req, res) => res.json({ message: "Welcome the Gym manager" }))

    .get('/records', GymRecordsController.show)
    .post('/create', GymRecordsController.create)
    .patch('/edit', GymRecordsController.edit)
    .patch('/trash', GymRecordsController.trash)

module.exports = routes