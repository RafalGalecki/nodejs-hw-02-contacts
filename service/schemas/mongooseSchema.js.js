const mongoose = require("mongoose");

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
  Contacts,
};
