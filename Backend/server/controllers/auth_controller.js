/*
controllers

In an express.js application , a controller refers to a part of your code that
 is reponsible for handling the applications logic.
  Controllers are typically  used to process 
  incomming requests , interact with models
   (data sourcse) , and send 
   responses back to clients.
    They help organize your application 
    by separting concers and following the 
    MVC pattern.(model-view-controller) design pattern. 

*/

const home =async (req,res)=>{
    try{
        res
        .status(200)
        .send("Hello World from controller");    
    }
    catch(err){
        res.status(500).send("Internal Server Error");
    }
}
// *------------------------
// Register Logic 
// *------------------------
const register= async(req,res) =>{
    try{
        console.log(req.body);
        res
        .status(200)
        .json(req.body);
    }
    catch(err){
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {home ,register};