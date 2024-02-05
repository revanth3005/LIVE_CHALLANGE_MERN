const user_model = require("../models/userModel");
const json_web_token = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const response = {
    status: 200,
    success: false,
    data: null,
    error: null,
    message: null,
    resource: req.originalUrl,
  };

  if (!name || !email || !password) {
    response.error = "name, email, password id required";
    response.message = "please provide the required details";
    return res.status(400).json(response);
  }

  const user = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const userData = new user_model(user);
    await userData.save();

    response.data = userData;
    response.message = "user created!";
    response.success = true;

    return res.status(200).json(response);
  } catch (error) {
    console.log(error, "while creating user");
    response.data = null;
    response.error = error;
    response.message = error?.message;
    return res.status(500).json(response);
  }
};

exports.logUser = async (req, res) => {
  const { email, password } = req.body;
  const response = {
    status: 200,
    success: false,
    data: null,
    error: null,
    message: null,
    resource: req.originalUrl,
  };
  if (!email || !password) {
    response.error = "name, email is required";
    response.message = "please provide the required details";
    return res.status(400).json(response);
  }

  try {
    const findUser = await user_model.findOne({ email });
    console.log(findUser);
    if (findUser === null) {
      response.message = "user was not found";
      response.data = null;
      response.error = null;
      return res.status(400).json(response);
    }
    //json tokens
    const token = json_web_token.sign(email, "sai-revanth-neelam");
    response.message = "Login Success";
    response.data = findUser;
    response.error = null;
    response.jwt_token = token;
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.data = null;
    response.success = true;
    response.error = error;
    response.message = error?.message;
    return res.status(500).json(response);
  }
};
