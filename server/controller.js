import express from 'express';
import Petfinder from'./Petfinder'

const router = express.Router();

router.get("/getToken", (req, res) => {
    res.json({token: Petfinder.getAccessToken()})
});

router.get("/getPets", (req, res) => {
    res.json({pets: Petfinder.getPets()})
});

module.exports = router;