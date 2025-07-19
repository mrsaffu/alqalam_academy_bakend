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
const port = 8000


connectMongoDb(process.env.MONGODB_URL).then(() => {
    console.log('MongoDb connected Sucessfully ');
})


app.use('/api/faculty', facultyRouter);
app.use('/api/gallery',galleryRouter)

app.listen(process.env.PORT, (error) => {
    if (error) throw error
    console.log(`app is running on port : ${port}`);
})

