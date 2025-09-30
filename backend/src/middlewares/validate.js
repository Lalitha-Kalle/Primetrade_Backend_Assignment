const { validationResult } = require("express-validator");
const ApiResponse = require("../utils/ApiResponse");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((v) => v.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        new ApiResponse(400, errors.array(), "Validation error")
      );
    }

    next();
  };
};

module.exports = validate;
