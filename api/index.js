const express = require("express");
const router = express.Router();
const controller = require("../../controller/index");

router.get("/", controller.get);

router.get("/:id", controller.getById);

router.delete("/:id", controller.removeById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.patch("/:id/favorite", controller.updateStatus);

module.exports = router;
