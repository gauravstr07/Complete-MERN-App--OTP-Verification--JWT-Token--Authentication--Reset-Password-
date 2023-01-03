/** importing dependencies */
const jwt = require("jsonwebtoken");

/** importing routes */
const ENV = require("../config");

/** auth middleware */
exports.Auth = async (req, res, next) => {
  try {
    // access the authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // retrive the user details for the logged in user
    let decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({
      error: "Athentication Failed!",
    });
  }
};
