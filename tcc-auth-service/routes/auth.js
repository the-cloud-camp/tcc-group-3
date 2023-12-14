const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/passport-jwt");
const { register, login, getProfile } = require("../controllers/auth");

// localhost:3000/api/v1/auth/register
router.post("/register", register);

// localhost:3000/api/v1/auth/login
router.post("/login", login);

// localhost:3000/api/v1/auth/profile
router.get("/profile", [authenticate], getProfile);

module.exports = router;
