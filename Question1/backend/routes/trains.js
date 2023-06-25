const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Trains = require('../models/Trains');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the trains via GET /train/trains Login required
router.get('/trains', fetchuser, async (req, res) => {
    try {

        const trains = await Trains.find({ user: req.user.id });
        res.json(trains);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error has occured");
    }
});