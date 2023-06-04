const express = require("express");
const router = express.Router();
// const Joi = require('joi');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
      return;
    }
    res.status(404).json({
      status: "Not found",
      code: 404,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactRemoved = await removeContact(contactId);
    if (contactRemoved) {
      res.json({
        status: "success",
        code: 200,
      });
    } else {
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = await req.body;
    const contact = await addContact({ name, email, phone });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
