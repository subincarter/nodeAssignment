const router = require('express').Router();
const srfController = require('../controllers/srfRegistration/srfRegister.controller');

router.get('/getRegisterNo', srfController.srfRegister)

module.exports = router;