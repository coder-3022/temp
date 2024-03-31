const mongoose=require("mongoose");
require("dotenv").config();

// db Connection
exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected Successfully"))
    .catch((error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
};