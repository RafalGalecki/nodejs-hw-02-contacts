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
  await fs
    .readFile(contactsPath)
    .then((data) => {
      const contacts = parseContacts(data);
      return contacts;
    })
    .then((contacts) => {
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);

        fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
          if (error) {
            console.log(error.message);
          }
        });
        console.log(`Contact with the id ${contactId} has been removed.`.green);
      } else {
        console.log(`There is no contact with the id: ${contactId}.`.red);
      }
    })
    .catch((error) => console.log(error.message));
};

const addContact = async (body) => {
  body = {
    id: (
      Math.floor(Math.random() * 100000) + contactsDataBase.length
    ).toString(),
    name,
    email,
    phone,
  };

  if (name === undefined || email === undefined || phone === undefined) {
    console.log(
      "Please set all arguments (name, email, phone) to add contact".red
    );
    return;
  }

  contactsDataBase.push(body);

  const contactsUpdate = JSON.stringify(contactsDataBase);

  fs.writeFile(contactsPath, contactsUpdate, (error) => {
    if (error) {
      console.log("Oops, something went wrong:".red, error.message);
    }
  });
  console.log(`${name} has been added to your contacts`.green);
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
