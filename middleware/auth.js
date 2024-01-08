const jwt = require("jsonwebtoken");
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const auth = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]

        if (!token) {
          return res
            .status(401)
            .json({ message: "Unauthorized - No token provided" });
        }

        const isCustomAuth = token.length < 500
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, SECRET_KEY)
            req.userId = decodedData?.id
        } else {
            // decodedData = jwt.decode(token)
            // req.userId = decodedData?.id;
            // res.json({ message: 'unauthorized access'})
            console.log("unauthorized access")
        }

        next()
    } catch (error) {
        console.log(error)
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
    }

}

module.exports = auth
