var express = require('express'); //used to build router
var _router = express.Router(); // express router object
var multer = require('multer'); // storing the files on the disk

//multer settings, option is used to save on the hard disk

var store = multer.diskStorage({
    destination:function(req, file, cb){ // uploads folder
        cb(null, './uploads'); 
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + '.' + file.originalname);
    }
});

// initialize the multer

var upload = multer({storage:store}).single('file');

// create route to save the file

_router.post('/upload', function(req, res, next){
    upload (req, res, function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename}) // respond with json object with 2 properites
    })
});

//export router

module.exports = _router;