const { StatusCodes } = require("http-status-codes");

const apiKeyMiddleware = (envKey) => {
  return async (req, res, next) => {
    try {
      const expectedURLKey = process.env[envKey];
      const actualAPIKey = req.headers[envKey.toLowerCase()];

      if (!expectedURLKey || !actualAPIKey) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
      }

      if (actualAPIKey?.toString() !== expectedURLKey?.toString()) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
      }

      next();
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
    }
  };
};

module.exports = apiKeyMiddleware;
