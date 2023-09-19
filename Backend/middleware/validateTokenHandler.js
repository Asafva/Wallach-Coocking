const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                console.log(err);
                res.status(401);
                throw new Error("User is not authorized or token is invalid")
            };
            req.user = decode.user;
            next();
            console.log(req.user);
        });
        if (!token) {
            res.status(401);
            throw new Error("User is not autorized or token is missing")
        }
    }
})

module.exports = validateToken;