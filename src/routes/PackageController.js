const PackageModel = require('../models/package')
const router = require('express').Router();

router.get('/task/:id', async(req, res)=>{
    console.log("get working");
    try{
        let found = await PackageModel.findOne({ _id, owner: req.user._id })
        res.status(200).json(found)
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
})
router.post('/newpackages', async (req, res) =>{
     const newpackage = new PackageModel({...req.body,owner:req.user._id})
     try{

        let savedPackage = await newpackage.save();
        res.status(200).json(savedPackage)
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
});
module.exports = router;