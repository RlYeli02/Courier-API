
// const { json } = require('body-parser');
// const UserModel = require('../models/user')

// let userController = {
//     getUser: async(req, res)=>{
//         let found = await UserModel.find();
//         res.json(found);
//     },
//     createUser: async (req, res) => {
//         let newUser = new UserModel(req.body)
//         let savedUser = await newUser.save();
//         res.json(savedUser)
        
//     },
//     getPackagesByUser: async(req, res)=>{
//         let foundUserPackages = await UserModel.find({name: req.params.username}.populate("packages"))
//         res.json(foundUserPackages)
//     }
// }

// module.exports= userController;