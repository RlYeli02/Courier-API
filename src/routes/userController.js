const router = require('express').Router();
const UserModel = require('../models/user')
var bcrypt = require('bcrypt')
var saltRouds = 10
const PackageModel = require('../models/package')

router.get('/', async (req, res) =>{

    try{
       let foundUserPackages = await UserModel.find()
        res.status(200).json(foundUserPackages)
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
});



router.post("/membership/signup", async (req, res) => {
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

router.post('/membership/login', async (req, res) =>{
    var user ={};
    user.email =req.body.email
     user.password =req.body.password
   
    try {
         await UserModel.findOne({email:user.email})
         .then(profile=>{
            if(!profile){
                res.status(404);
                res.send('incorrect email')
            }
            else{
                bcrypt.compare(
                    user.password,
                    profile.password,
                    async (err, result) => {
                    if (err) {
                      console.log("Error is", err.message);
                  
                    }  else if (result == true) {
                       res.status(200)
                       res.send("User authenticated");
                       
                    }  else {
                        res.status(404)
                       res.send("incorrect password");
                    }
                   }
                );
            }
         })


    } catch (error) {
        console.log(error);
    }
});

router.get('/packages/getPending', async(req, res)=>{
    console.log("get working");
    var user ={};
    user.owner =req.body._id,
    user._id=req.body._id
   
    
    try{
        let found = await PackageModel.find({owner:"604106715e73123c7598e926" })
        res.status(200).json(found)
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
})

module.exports = router;