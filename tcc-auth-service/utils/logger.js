const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "auth-service" },
  transports: [new winston.transports.Console()],
});

exports.logger = logger;
