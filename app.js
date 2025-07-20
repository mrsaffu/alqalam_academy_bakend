const express = require('express')
const { connectMongoDb } = require("./connection")
const facultyRouter = require("./src/routes/faculty.routes")
const cors = require('cors')
const galleryRouter = require("./src/routes/gallery.routes")
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.static("./public/facultyTemp"))
app.use(express.json())
const port = process.env.PORT || 8000;

const uri = process.env.MONGODB_URL;
if (!uri && process.env.NODE_ENV !== "production") {
    throw new Error(" MONGODB_URL is not set");

}
console.log("Using MongoDB URI:", uri ? " Loaded" : " Missing");

connectMongoDb(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDb connected Sucessfully ');
}).catch((err) => {
    console.error("MongoDB connection failed:", err);
});


app.use('/api/faculty', facultyRouter);
app.use('/api/gallery', galleryRouter)


app.get('/', (req, res) => {
    req.send('welcome to alqalam academy Server')
})
app.listen(port, (error) => {
    if (error) throw error
    console.log(`app is running on port : ${port}`);
})

