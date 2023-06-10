const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.getAll);

router.get("/:id", controller.get);

router.delete("/:id", controller.remove);

// router.post("/", controller.create);

// router.put("/:id", controller.update);

// router.patch("/:id/favorite", controller.updateStatus);

module.exports = router;
