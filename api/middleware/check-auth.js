const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;//add new field to request which exracts decoded user data
        next();//continue 
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};