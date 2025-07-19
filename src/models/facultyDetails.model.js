const mongoose = require("mongoose");

// Faculty Schema
const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true


    },
    imagePublicId: String, //  required for deletion
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required:true,


    },
    experience: {
        type: String,
        required:true,


    },
    expertise: {

        type: String,
        required:true,
    },
    qualification: {
        type: String,
        required:true,


    },

    department: {
        type: String,
        required:true,


    },
    description: {
        type: String,
        required:true,


    },
    biography: {
        type: String,
        required:true,


    },
    education: {
        type: [String],
        default: [],
        required:true,


    },


    possition: {
        type: String,
        required:true,

        enum: [
            "Director",
            "Principal",
            "Vice principal",
            "Coordinator",
            "Primary Teacher", // Primary Teacher
            "Assistant Teacher",
            "Mathematics Teacher",
            "Science Teacher",
            "Socialscience Teacher",
            "Librarian",
            "Computer Teacher",
            "Counselor",
            "Admin Staff",
            "Accountant",
            "Receptionist",

        ],

    },
    socialMedia: {
        linkedin: {
            type: String,
            default: '',


        },

        twitter: {
            type: String,
            default: '',


        },
        facebook: {
            type: String,
            default: '',


        },
        instagram: {
            type: String,
            default: ''
        },
        youtube: {
            type: String,
            default: ''
        },
        other: {
            type: String,
            default: ''
        }
    }



});

const Faculty = mongoose.model("Faculty", facultySchema);

// Exporting Models
module.exports = Faculty;
