const { Company } = require("../models");
const { companyJoiSchemas } = require("../schemas");
const { HttpError } = require("../utils");

const getAllCompanies = async (req, res, next) => {
  try {
    const allCompanies = await Company.find();
    if (!allCompanies) throw HttpError(404, "Not Found");

    const total = await Company.countDocuments();

    res.status(200).json({ total, allCompanies });
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const companyById = await Company.findById(id);
    if (!companyById) throw HttpError(404, "Not Found");

    res.status(200).json(companyById);
  } catch (error) {
    next(error);
  }
};

const addCompany = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { error } = companyJoiSchemas.addCompanySchema.validate(req.body);
    if (error) throw HttpError(400, "missing required name field");

    await Company.create({ ...req.body, owner: _id });

    res.status(201).json({ message: "Add sucsessful" });
  } catch (error) {
    next(error);
  }
};

const removeCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const removedCompany = await Company.findByIdAndDelete(id);
    if (!removedCompany) throw HttpError(404, "Not found");

    res.status(200).json({ message: "Remove sucsessful" });
  } catch (error) {
    next(error);
  }
};

const updateCompanyById = async (req, res, next) => {
  try {
    const { error } = companyJoiSchemas.addCompanySchema.validate(req.body);
    if (error) throw HttpError(400, "missing fields");

    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCompany) throw HttpError(404, "Not found");

    res.status(200).json({ message: "Udate sucsessful!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAllCompanies,
  getCompanyById,
  addCompany,
  removeCompanyById,
  updateCompanyById,
};
