let express = require('express');
let router = express.Router();


// import index controller
let indexController = require('../controllers/index');


// ROUTES

// GET - Home page
router.get('/', indexController.displayHomePage);




module.exports = router;