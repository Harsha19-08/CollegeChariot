const mongoose =require("mongoose");
const URI = "mongodb://localhost:27017/chariot_admin";
// mongoose.connect(URI);

const connectDB = async()=>{
    try{
        //mongodb connection string
         await mongoose.connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        });
        console.log(`MongoDB connected: ${con.connection.host}`);
    }       
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;