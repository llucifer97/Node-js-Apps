const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.json({question:"this is question api!"})})

module.exports = router;

