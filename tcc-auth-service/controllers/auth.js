const User = require("../models/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../db/redis");
const { logger } = require("../utils/logger");

exports.register = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  logger.info("user created: " + newUser.id);

  const channel = "user_created";
  const message = JSON.stringify({ data: { id: newUser.id } });

  redisClient.publish(channel, message).then((res) => {
    logger.info("message published to " + channel + ": " + message);
  });

  return res.status(200).json({
    message: "Register Success",
    user: {
      id: newUser.id,
      fullname: newUser.fullname,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // check user exists
  const user = await User.findOne({ where: { email } });
  if (!user)
    return res.status(400).json({ message: "Email or Password not correct" });

  // check password is correct
  const isPasswordCorrect = await argon2.verify(user.password, password);
  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Email or Password not correct" });

  // generate token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY
  );
  logger.info("user login: " + user.id);

  return res.status(200).json({
    message: "Login User",
    accessToken: token,
  });
};

exports.getProfile = async (req, res, next) => {
  const user = await User.findByPk(req.user.userId);
  logger.info("get user profile: " + user.id);

  return res.status(200).json({
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  });
};
