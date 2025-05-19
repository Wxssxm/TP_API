const Validator = require('better-validator');

module.exports = (req, res, next) => {
  const validate = new Validator();

  validate(req.body)
    .required().object()
    .required('title').string()
    .optional('description').string();

  if (!validate.run()) {
    return res.status(400).json({
      message: 'Champs invalides',
      errors: validate.errors
    });
  }

  next();
};