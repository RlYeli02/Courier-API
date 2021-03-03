const router = require('express').Router();
const package = require ('./package')

router.get('/', async(req, res)=>{
    console.log("get working");
    try{
        res.send("hhhhh")
        const pack = await package.getPackage;
        res.status(200).json(pack)
    }
    catch (error){
        res.status(404).json({message: error.message});
    }
})
router.post('/add', async (req, res) =>{
    const package = req.body;

    try {
        const addpack = await package.addPackage(package)
        res.status(201).json(addpack);

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
});
module.exports = router;