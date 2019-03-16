const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	const data = req.body;
	res.json(data);
});

module.exports = router;
