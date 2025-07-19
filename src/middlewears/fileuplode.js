const multer = require('multer')
let uplodefile = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/facultyTemp');
            // cb(null, path.join(__dirname, '../Public/images')); // Fixed path
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }

    });
    return multer({ storage });

    //   const upload = multer({ storage: storage })
}
module.exports = uplodefile;