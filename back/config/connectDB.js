const { connect } = require("mongoose");
require("colors");
require("dotenv").config();

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log(`MONGODB CONNECTED`.america)
    } catch (error) {
        console.log("error while connecting.");
        console.error(error);
    }
}


module.exports = connectDB