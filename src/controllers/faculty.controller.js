let Faculty = require("../models/facultyDetails.model.js");
const { uplodeFileClodinary, deleteFileFromCloudinary } = require("../utils/cloudinary");
const uplodefile = require("../middlewears/fileuplode")



// ! post faculty  details function

let handleAddFaculty = async (req, res, next) => {


    try {

        //! file uplode 
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No image file provided" });
        }
        // Upload to Cloudinary
        const cloudinaryResponse = await uplodeFileClodinary(file.path);

        if (!cloudinaryResponse) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const imageUrl = cloudinaryResponse.secure_url;
        const imagePublicId = cloudinaryResponse.public_id; //  capture public_id




        let { name, age, email, experience, expertise, qualification, department, description, biography, education, possition, socialMedia } = req.body

        console.log(req.body);
        // Parse stringified fields if needed
        if (typeof socialMedia === "string") {
            socialMedia = JSON.parse(socialMedia);
        }

        if (typeof education === "string") {
            education = JSON.parse(education);
        }


        let newFaclty = new Faculty({ name, age, email, experience, expertise, qualification, image: imageUrl, imagePublicId, department, description, biography, education, possition, socialMedia })

        await newFaclty.save()
        console.log(newFaclty);
        res.status(200).json({ message: "faculty details add  sucessfully", data: newFaclty })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error ", data: null })


    }
}

// ! get all details function

async function handleGetAllFaculty(req, res, next) {
    try {

        let facaulties = await Faculty.find()
        if (facaulties && facaulties.length > 0) {
            return res.status(200).json({ message: "faculties details fatch  sucessfully ", data: facaulties })

        }
        return res.status(404).json({ error: true, message: " faculty not found", data: null })


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "server error ", data: null })
        next(error)


    }


}
// ! get details by id function

let handleGetFacultyById = async (req, res, next) => {
    try {
        let { eid } = req.params;
        console.log(eid);

        let faculty = await Faculty.findById(eid)

        if (faculty) {
            res.status(200).json({ error: false, message: "faculty details fatch suceccfully by id ", data: faculty })
        } else {
            res.status(404).json({ error: true, message: "faculty not found to given id", data: null })

        }


    } catch (error) {
        next(error)
        console.log("bakend error ", error);

    }


}

// ! update faculty details 

// let handleUpdateFaculty = async (req, res, next) => {
//     try {
//         let { eid } = req.params;
//         let updatedfaculty = req.body


//         if (req.file) {
//             updatedfaculty.image = `/uploads/${req.file.filename}`;
//         }

//         let faculty = await Faculty.findById(eid)

//         if (faculty) {
//             let update = await Faculty.findByIdAndUpdate(eid, updatedfaculty, { new: true, runValidators: true })
//             return res.status(200).json({ error: false, message: "Faculty updated sucessfully", data: update })
//         }
//         res.status(404).json({ error: true, message: "Faculty not found", data: null })

//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error ' })
//         next(error)
//         console.log(error);

//     }

// }

let handleUpdateFaculty = async (req, res, next) => {
  try {
    const { eid } = req.params;
    let updatedfaculty = req.body;

    // Parse stringified fields if needed (for formData requests)
    if (typeof updatedfaculty.education === "string") {
      updatedfaculty.education = JSON.parse(updatedfaculty.education);
    }

    if (typeof updatedfaculty.socialMedia === "string") {
      updatedfaculty.socialMedia = JSON.parse(updatedfaculty.socialMedia);
    }

    const faculty = await Faculty.findById(eid);
    if (!faculty) {
      return res.status(404).json({ error: true, message: "Faculty not found", data: null });
    }

    // Handle image upload if new image is provided
    if (req.file) {
      //  Delete old image from Cloudinary
      if (faculty.imagePublicId) {
        await deleteFileFromCloudinary(faculty.imagePublicId);
      }

      //  Upload new image to Cloudinary
      const cloudinaryResponse = await uplodeFileClodinary(req.file.path);
      if (!cloudinaryResponse) {
        return res.status(500).json({ message: "Image upload to Cloudinary failed" });
      }

      //  Update image fields
      updatedfaculty.image = cloudinaryResponse.secure_url;
      updatedfaculty.imagePublicId = cloudinaryResponse.public_id;
    }

    //  Update document
    const updated = await Faculty.findByIdAndUpdate(eid, updatedfaculty, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      error: false,
      message: "Faculty updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

// ! delete  faculty details 

let handleDeleteFaculty = async (req, res, next) => {
    try {
        let { eid } = req.params;
        let faculty = await Faculty.findById(eid)
        if (faculty) {
            let deletedFaculty = await Faculty.findByIdAndDelete(eid)

            // Delete image from Cloudinary
            if (faculty.imagePublicId) {
                await deleteFileFromCloudinary(faculty.imagePublicId);
            }

            console.log('Deleted faculty:', deletedFaculty);


            return res.status(200).json({ error: false, message: "Faculty deleted successfully", data: faculty })
        }
        res.status(404).json({ error: true, message: "faculty not found ", data: null })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, message: "error in server " })
        next(error)
    }

}


module.exports = { handleAddFaculty, handleGetAllFaculty, handleGetFacultyById, handleUpdateFaculty, handleDeleteFaculty }