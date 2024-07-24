const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected Successfully with ${mongoose.connection.name} @ ${mongoose.connection.host}`);
    } catch (error) {
        console.log("error in database", error);
    }
}

module.exports  = ConnectDB