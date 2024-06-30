const express = require('express');
const router = express.Router();
// const {home} = require('../controllers/auth_controller');
// const {register} = require('../controllers/auth_controller');
const authControllers = require('../controllers/auth_controller');




// router.get("/",(req,res)=>{
//     res.status(200).send("Hello World usign router cool kjfhksdfh");
// });

//acttion is the destination where we want to go or description of what u want to do,
//dispatch is the function which sends you to the action or the fucntion that carries out that action
router.route("/").get(authControllers.home);

router.route("/register").post(authControllers.register);

module.exports = router;