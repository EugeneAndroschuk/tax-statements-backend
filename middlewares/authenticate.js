const {HttpError} = require("../utils");
const jwt = require('jsonwebtoken');
const {User} = require("../models");
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") next(HttpError(401, "Not authorized - no Bearer"));
    try { 
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);

        if(!user.isConfirmed) next(HttpError(401, "Not authorized - not confirmed"));
    
        if (!user || !user.token || user.token !== token) next(HttpError(401, "Not authorized - no token"));
        
        req.user = user;
        next();
    }
    catch {next(HttpError(401, "Not authorized - error"));}
}

module.exports = authenticate;