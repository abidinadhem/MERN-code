const jwt = require("jsonwebtoken");
const AuthSchema = require("../Models/UserSchema");
const secretKey = "blackcats";

exports.isAthentificated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
     return res.status(401).send("Invalid token");
    } else {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).send("Invalid token");
        } else {
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong with auth");
  }
};