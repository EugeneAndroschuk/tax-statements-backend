const Joi = require("joi");

const addVatDeclarationSchema = Joi.object({
  period: Joi.date().required(),
  revenue: Joi.number().required(),
  vatPayable: Joi.number().required(),
  company: Joi.string().required(),
});

module.exports = {
  addVatDeclarationSchema,
};
