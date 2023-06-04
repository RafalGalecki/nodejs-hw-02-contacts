const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.format({
  root: "/ignored",
  dir: "models",
  base: "contacts.json",
});

const listContacts = async () => {
  return fs.readFile(contactsPath).then((contacts) => {
    return JSON.parse(contacts);
  });
};

const getContactById = async (contactId) => {
  return fs
    .readFile(contactsPath)
    .then((contacts) =>
      JSON.parse(contacts).find((contact) => contact.id === contactId)
    );
};

const removeContact = async (contactId) => {
  let isContact = false;
  const contacts = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) =>
      contacts.filter((contact) => {
        if (contact.id === contactId) {
          isContact = true;
        }
        return contact.id !== contactId;
      })
    );
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return isContact;
};

const addContact = async (body) => {
  const date = new Date();
  const contactId = (
    Math.floor(Math.random() * 100000) + parseInt(date.getTime() / 1000)
  ).toString();
  const contacts = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      body = { id: contactId, ...body };
      return [...contacts, body];
    });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return body;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
