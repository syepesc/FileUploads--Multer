let express = require('express');
let path = require('path');
let router = express.Router();
let multer = require('multer');



// import index controller
let indexController = require('../controllers/index');

// MULTER Config
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: '../../public/uploads/',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
  }).single('myImage');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
            return cb(null,true);
        } else {
            cb('Error: Images Only!');
    }
  }
  

// ROUTES

// GET - Home page
router.get('/', indexController.displayHomePage);

// POST - upload file
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
        res.render('home', {
            msg: err
        });
        } else {
        if(req.file == undefined){
            res.render('home', {
            msg: 'Error: No File Selected!'
            });
        } else {
            res.render('home', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`
            });
        }
        }
    });
});



module.exports = router;