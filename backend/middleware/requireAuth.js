const jwt = require('jsonwebtoken')
const user = require('../models/user_model')

const requireAuth = async function(req,res,next) {
    // verify authorization
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: 'You must be logged in.'});
    }
    const token = authorization.replace('Bearer ', '');
    try{
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await user.findOne({_id}).select('_id')
        next()
    } catch(err){
        return res.status(401).json({error: err});
    }
}

module.exports = requireAuth