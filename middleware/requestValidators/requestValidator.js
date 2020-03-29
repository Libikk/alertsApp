const { validationResult, matchedData } = require('express-validator');
const { isEqual } = require('lodash');

function throwInvalid(req, res, next) {
  try {
    validationResult(req).throw();
    if (!isEqual(Object.assign(req.body, req.params), matchedData(req))) {
      throw Object.assign(new Error(), { name: 'SCHEMA_VALIDATION_FAILED', options: { input: Object.assign(req.body, req.params) } });
    }
    next();
  } catch (err) {
    const error = err.array ? err.array()[0] : null;
    const options = error ? {
      parameter: error.param,
      value: error.value,
      message: error.msg,
    } : { body: req.body };
    next(Object.assign(new Error(), { name: 'INVALID_VALUE', options }));
  }
}

module.exports = throwInvalid;
