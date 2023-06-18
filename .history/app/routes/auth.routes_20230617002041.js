const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// router.get('/', authController.login)
router.get('/', (req,res)=>{
 res.send('hello');
})

module.exports = router;