const isEmpty = require("./isEmpty");

const Validator = require("validator");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";

  if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = "Username must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.handle = "Username is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL!";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL!";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL!";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL!";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL!";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
