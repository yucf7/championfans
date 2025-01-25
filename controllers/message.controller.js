const messageHelper = require('../helpers/message.helper');

module.exports.create = async (req, res)=>{
    try{
        const message = await messageHelper.create(req.body);
        return res.status(201).json(message);
    }catch(error){
        return res.status(500).json({message: error.message ? error.message : error});
    }
}

module.exports.getAll = async (req, res)=>{
    try{
        const message = await messageHelper.getAll(req.body);
        return res.status(201).json(message);
    }catch(error){
        return res.status(500).json({message: error.message ? error.message : error});
    }
}