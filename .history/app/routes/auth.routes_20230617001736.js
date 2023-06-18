const router = require('express').Router();
const srfController = require('../controllers/auth.controller');

router.get('/login', srfController.srfRegister)

module.exports = router;