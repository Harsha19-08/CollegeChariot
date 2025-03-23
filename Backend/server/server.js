const express =require('express');
const app =express();
const router = require('./router/auth_router');

const connectDB = require('./utils/db');


app.use(express.json());/*middleware: THis line of
 code adds express middleware that parses incoming
  request bodies with JSON payloads. Its imporatnt
   to plcae this before any routes that need to 
   handle json data in the request body.
   The middle ware is responsible for
    parsing json data from requests ,
     and it should be applied at tha 
     begining of your middleware stack to
      ensure its available for all 
   subsequent route handles
   */


app.use("/api/auth",router);


// app.get("/",(req,res)=>{    
//     res.status(200).send("Hello World");
// });
connectDB().then(()=>{
const PORT =5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
});