const Joi = require("joi");

const addCompanySchema = Joi.object({
  name: Joi.string().required(),
  regCode: Joi.string().required(),
  taxCode: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = {
  addCompanySchema,
};
