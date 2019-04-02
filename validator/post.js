const isEmpty = require("./isEmpty");

const Validator = require("validator");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.post = !isEmpty(data.post) ? data.post : "";

  if (!Validator.isLength(data.post, { min: 10, max: 400 })) {
    errors.post = "Post must be between 10 and 400 characters";
  }

  if (Validator.isEmpty(data.post)) {
    errors.post = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
