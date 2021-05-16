const { InvalidArgumentError } = require('./errors');


module.exports = {
  stringFieldNotNull: (value, name) => {
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(`You must fill in the field ${name}!`);
  },

  minimumSizeField: (value, name, minimum) => {
    if (value.length < minimum)
      throw new InvalidArgumentError(
        `The ${name} field must be greater than ${minimum} characters!`
      );
  },

  maximumSizeField: (value, name, maximum) => {
    if (value.length > maximum)
      throw new InvalidArgumentError(
        `The ${name} field must be less than ${maximum} characters!`
      );
  }
};
