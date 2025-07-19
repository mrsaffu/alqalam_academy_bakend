let express = require("express")
let router = express.Router()
const { handleGetAllFaculty, handleAddFaculty, handleGetFacultyById, handleUpdateFaculty, handleDeleteFaculty, } = require("../controllers/faculty.controller")
const uplodefile = require("../middlewears/fileuplode")
let upload = uplodefile()



// //! add  feculty 
router.post('/addfaculty', upload.single('image'), handleAddFaculty)
router.get('/getfaculty', handleGetAllFaculty)
router.get('/getfaculty/:eid', handleGetFacultyById)
router.put('/update/:eid', upload.single('image'), handleUpdateFaculty);
router.delete('/deletefaculty/:eid', handleDeleteFaculty)


module.exports = router

