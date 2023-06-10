const Joi = require("joi");

// validation of POST body
const contactValidation = Joi.defaults(() =>
  Joi.object({
    name: Joi.string().pattern(
      /^([A-ZĄĆĘŁŃÓŚŹŻ]+'?[a-ząćęłńóśźż]+|[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+'?[a-ząćęłńóśźż]+) ([A-ZĄĆĘŁŃÓŚŹŻ]+'?[a-ząćęłńóśźż]+|[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+'?[a-ząćęłńóśźż]+)$/
    ),
    email: Joi.string().email(),
    phone: Joi.string().pattern(
      /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
    ),
    favorite: Joi.boolean(),
  })
);

const schemaRequired = contactValidation
  .object()
  .options({ presence: "required" })
  .required();

const schema = contactValidation
  .object()
  .or("name", "email", "phone", "favorite");

module.exports = {
  schemaRequired,
  schema,
};
