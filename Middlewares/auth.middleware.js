const jwt = require('jsonwebtoken');
const { promisify } = require('util');

let auth = (req, res, next) => {
    // destruct authorization from request headers
    const {authorization} = req.headers;
    // extract token from authorization
    const token = authorization && authorization.split(' ')[1];
    // if no token provided res error
    if(!token) return res.status(401).json({error: 'Access denied. No token provided.'});
    try {
        // verify the token
        const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded;
        // if valid pass
        next();
    } catch (error) {
        // if not valid res error
        res.status(401).json({error});
    }
}
module.exports = {auth}