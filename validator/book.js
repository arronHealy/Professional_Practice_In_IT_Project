const isEmpty = require("./isEmpty");

const Validator = require("validator");

module.exports = function validateBookInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  data.condition = !isEmpty(data.condition) ? data.condition : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = "Author field is required";
  }

  if (Validator.isEmpty(data.condition)) {
    errors.condition = "Condition field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};