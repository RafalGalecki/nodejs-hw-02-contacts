const Joi = require("joi");
const mongoose = require("mongoose");

// validation of POST body (Joi validation)
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
  
// -------  mongoose model validation ---------- //

const Schema = mongoose.Schema;

const contacts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter contat's name"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contacts = mongoose.model("contacts", contacts);

module.exports = {
  schemaRequired,
  schema,
  Contacts,
};
