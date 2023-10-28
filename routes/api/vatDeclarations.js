const express = require("express");
const { ctrlVatDeclarations } = require("../../controllers");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlVatDeclarations.getAllVatDeclarations);

router.get("/:id", authenticate, isValidId, ctrlVatDeclarations.getVatDeclarationById);

router.post("/", authenticate, ctrlVatDeclarations.addVatDeclaration);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  ctrlVatDeclarations.removeVatDeclarationById
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  ctrlVatDeclarations.updateVatDeclarationById
);

module.exports = router;
