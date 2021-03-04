const router = require('express').Router();
const UserModel = require('../models/user')
var bcrypt = require('bcrypt')
var saltRouds = 10


router.get('/', async (req, res) =>{

    try{
       let foundUserPackages = await UserModel.find()
        res.status(200).json(foundUserPackages)
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
});

// router.get('/packages/user', async (req, res) =>{

//     try{
//        let foundAll = await UserModel.find()
//         res.status(200).json(foundAll)
//     }
//     catch (error){
//         res.status(404).json({message: error.message});
//     }
// });

router.post("/signup", async (req, res) => {
  var newUser = new UserModel({
      name: req.body.name,
    email: req.body.email,
    password: req.body.password
    
  });

  await UserModel.findOne({ email: newUser.email })
    .then(async profile => {
      if (!profile) {
        bcrypt.hash(newUser.password, saltRouds, async (err, hash) => {
          if (err) {
            console.log("Error is", err.message);
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                res.status(200).send(newUser);
              })
              .catch(err => {
                console.log("Error is ", err.message);
              });
           }
        });
      } else {
        res.send("User already exists...");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

router.post('/login', async (req, res) =>{
    var user ={};
    user.email =req.body.email
    user.password =req.body.password
   
    try {
         await UserModel.findOne({email:user.email, password:user.password})
         .then(profile=>{
            if(!profile){
                res.send("user doesn't exist")
                
                
            }
            else{
                bcrypt.compare (
                    user.password,
                    profile.password,
                    async (err, result) => {
                    if (err) {
                      console.log("Error is", err.message);
                    }  else if (result == true) {
                       res.status(200)
                       res.send("User authenticated");
                       
                    }  else {
                       res.send("User Unauthorized Access");
                    }
                   }
                );
            }
         })


    } catch (error) {
        console.log(error);
    }
});

module.exports = router;