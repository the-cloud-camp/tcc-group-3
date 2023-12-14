const redis = require("redis");

// Create a Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,
  database: 0,
});

redisClient.on("error", (err) => {
  console.error("Redis Error: " + err);
});
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

exports.redisClient = redisClient;
