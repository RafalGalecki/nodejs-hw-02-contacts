const service = require("../service/index");
const Schema = require("../service/schema/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await service.getContactById(id);
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
    console.error(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDelete = await service.removeContact(id);
    if (isDelete) {
      res.json({
        status: "contact deleted",
        code: 200,
      });
    } else {
      res.status(404).json({
        message: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAll,
  get,
  remove,
};
