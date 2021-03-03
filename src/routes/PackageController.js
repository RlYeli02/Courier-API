const PackageModel = require('../models/package')
const router = require('express').Router();

router.get('/', async(req, res)=>{
    console.log("get working");
    try{
        let found = await PackageModel.findById({name:req.params.username}).populated('owner').execPopulated()
        res.status(200).json(found)
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
})
router.post('/newpackages', async (req, res) =>{
     const newpackage = new PackageModel({owner:req.body._id})
     try{

        let savedPackage = await newpackage.save();
        res.status(200).json(savedPackage)
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
});
module.exports = router;