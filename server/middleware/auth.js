const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token || req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error("JWT VERIFY ERROR:", err.message);
                return res.status(403).json("Token is not valid or expired!");
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated! No token provided.");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.id === req.params.userId || req.user.isAdmin) {
            next();
        } else {
            console.warn(`AUTH DENIED: User ${req.user.id} attempted unauthorized access.`);
            res.status(403).json("You are not allowed to do that! Authorization failed.");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            console.warn(`ADMIN DENIED: User ${req.user.id} attempted admin action without admin role.`);
            res.status(403).json("Access Denied: Admin privileges required.");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
};
