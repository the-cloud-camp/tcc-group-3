const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { redisClient } = require("./db/redis");

dotenv.config();
redisClient.connect();

const sequelize = require("./db/postgres");

// auto migrate when start
sequelize.sync({ alter: true }).then(() => {
  console.log("Database migrated");
});

const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// localhost:3000/api/v1/auth
app.use("/api/v1/auth", authRouter);

module.exports = app;
