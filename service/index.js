const Contacts = require("./schemas/mongooseSchema.js");

const listContacts = async () => await Contacts.find();

const getContactById = async (id) => {
  try {
    return Contacts.findOne({ _id: id });
  } catch (error) {
    return false;
  }
};

const removeContact = async (id) => {
  try {
    return Contacts.findByIdAndRemove({ _id: id });
  } catch (error) {
    return false;
  }
};

const addContact = async ({ name, email, phone, favorite }) =>
  Contacts.create({ name, email, phone, favorite });

const updateContact = async (id, body) => {
  try {
    return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true });
  } catch (error) {
    return false;
  }
};

const updateStatusContact = updateContact;

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
