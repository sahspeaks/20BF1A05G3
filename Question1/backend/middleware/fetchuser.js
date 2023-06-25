const jwt = require('jsonwebtoken');
const JWT_SECRET = "Top secret";

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Invalid token" });

    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
}
module.exports = fetchuser;