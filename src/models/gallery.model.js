import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    title: { type: String },
    imageUrl: { type: String, required: true },
    public_id: { type: String }, // Optional Cloudinary public_id
});

const sectionSchema = new mongoose.Schema({

    title: { type: String, required: true },  //ex .Primary Wing Classrooms
    description: { type: String },
    images: [imageSchema],
});

const galleryCategorySchema = new mongoose.Schema({

    title: { type: String, required: true },// Ex :"Classrooms & Learning Spaces"
    description: { type: String },
    sections: [sectionSchema],
}, { timestamps: true });

const GalleryCategory = mongoose.model('GalleryCategory', galleryCategorySchema);

export default GalleryCategory;
