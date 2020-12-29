const jwt= require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send('Access denied, no token.');

    try{
        const decoded = jwt.verify(token, 'privateKey');
        req.user=decoded;
        next();
    }
    catch(ex) { 
        res.redirect('/login');
    }
}

