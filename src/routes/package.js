const Package = require('../models/package')

const package = {
    getPackage: async()=>{
        return await Package.find();
    },
     addPackage: async (package) => {
        const newPackage = new Package(package)
        await newPackage.save();
        return newPackage;
    },
    getHelloWorld: async()=>{
        return "hello world"
    }
}

module.exports= package;