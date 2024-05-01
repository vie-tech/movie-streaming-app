const jwt = require("jsonwebtoken");
const responseHandlers = require("../handlers/response.handler");
const UserModel = require("../models/user.model").UserModel;
require("dotenv").config();

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jwt.verify(token, process.env.TOKEN_SECRET);
    } /////
    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  try {
    const tokenDecoded = tokenDecode(res);

    if (!tokenDecoded) return responseHandlers.unauthorize(res);

    const user = await UserModel.findById(tokenDecoded.data);
    if (!user) return responseHandlers.unauthorize(res);

    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { auth, tokenDecode };
