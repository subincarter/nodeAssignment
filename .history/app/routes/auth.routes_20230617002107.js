const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// router.get('/', authController.login)
router.post('/', (req,res)=>{
 res.send('hello');
})

module.exports = router;