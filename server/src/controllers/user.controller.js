const UserModel = require("../models/user.model").UserModel;
const jwt = require("jsonwebtoken");
const responseHandler = require("../handlers/response.handler");


const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    const checkUser = UserModel.findOne({ username });
    if (checkUser) {
      return responseHandler.badrequest(res, "User already exists!");
    }

    const user = new UserModel();
    user.username = username;
    user.displayName = displayName;
    user.setPassword(password);
    await user.save();
    const token = jwt.sign({ data: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });
    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }).select(
      "username password salt id displayName"
    );
    if (!user) return responseHandler.badrequest(res, "User not found");
    if (!user.validatePassword(password))
      return responseHandler.badrequest(res, "User does not exist");
    const token = jwt.sign({ data: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });
    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = UserModel.findById(req.user.id).select("password id salt");
    if (!user) return responseHandler.unauthorize(res);
    if (!user.validatePassword(password))
      return responseHandler.badrequest(res, "Wrong password");
    user.setPassword(newPassword);
    await user.save();
    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return responseHandler.notfound(res);
    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};



module.exports = {
    signup,
    signin,
    updatePassword,
    getInfo
}