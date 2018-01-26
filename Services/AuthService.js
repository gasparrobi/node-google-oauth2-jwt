const jwt = require('jsonwebtoken');


// check if Token exists on request Header and attach token to request as attribute
exports.checkTokenMW = async (req, res, next) => {
    // Get auth header value
    const bearerHeader = await req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        next();
    } else {
        res.sendStatus(403);
    }
};

// Verify Token validity and attach token data as request attribute
exports.verifyToken = async (req, res) => {
    await jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            return req.authData = authData;
        }
    })
};

// Issue Token
exports.signToken = async (req, res) => {
    await jwt.sign({userId: req.user._id}, 'secretkey', {expiresIn:'5 min'}, async (err, token) => {
        if(err){
            res.sendStatus(500);
        } else {
            await res.json({token});
        }
    });
}