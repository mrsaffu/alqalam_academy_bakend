// const mongoose  = require("mongoose")

// let connectMongoDb = async (url)=>{
//     return mongoose.connect(url)
// }

// module.exports={connectMongoDb,}

const mongoose = require("mongoose");

const connectMongoDb = async (url) => {
    return mongoose.connect(url, {
        ssl: true,
        serverSelectionTimeoutMS: 5000, // Avoids long hangs
    });
};

module.exports = { connectMongoDb };
