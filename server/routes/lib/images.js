const router = require('express').Router();
const multer = require("multer");
const middleware = require('./../../middleware').route;
const helper = require('./helper');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, req.params.userid)
    },
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

var upload = multer({ 
        storage: storage,
        limits:{ fileSize: 1024 * 1024 * 5 }, 
        fileFilter: fileFilter
});


router.post('/user/:userid',upload.single('userImage'),(req, res, err) => {
        if(err)
            res.status(500).send(err);
        else {
            if(req.file == undefined)
                res.status(404).send('No File Selected!');
            else {
                res.status(200).send('File Uploaded!');
            res.render('index', {
                msg: 'File Uploaded!',
                file: `uploads/${req.file.filename}`
            });
            }
        }
  });

router.get('/user/:userid')

module.exports = router;