const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.get('/', authController.login)

module.exports = router;