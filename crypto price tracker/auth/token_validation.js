const jwt = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, "This is secret key", (err, decoded) => {
                if (err) {
                    return res.status(404).json({
                        success: 0,
                        message: "Invalid token" 
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(404).json({
                success: 0,
                message: "Access denied! unauthorized user"
            });
        }
    }
};

