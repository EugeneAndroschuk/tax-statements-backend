const express = require("express");
const { ctrlCompanies } = require("../../controllers");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/:id", authenticate, isValidId, ctrlCompanies.getCompanyById);

router.post("/", authenticate, ctrlCompanies.addCompany);

router.delete("/:id", authenticate, isValidId, ctrlCompanies.removeCompanyById);

router.put("/:id", authenticate, isValidId, ctrlCompanies.updateCompanyById);

module.exports = router;
