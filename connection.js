const mongoose  = require("mongoose")

let connectMongoDb = async (url)=>{
    return mongoose.connect(url)
}

module.exports={connectMongoDb,}