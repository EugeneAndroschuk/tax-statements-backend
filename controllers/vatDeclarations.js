const { VatDeclaration } = require("../models");
const { vatDeclarationJoiSchemas } = require("../schemas");
const { HttpError } = require("../utils");

const getAllVatDeclarations = async (req, res, next) => {
  try {
    const { companyId } = req.query;
    const FilterOptions = companyId ? { company: companyId } : {};
    const allVatDeclarations = await VatDeclaration.find(FilterOptions)
      .populate("company")
      .sort({ period: -1 });
    if (!allVatDeclarations) throw HttpError(404, "Not Found");

    const total = await VatDeclaration.countDocuments(FilterOptions);

    res.status(200).json({ total, allVatDeclarations });
  } catch (error) {
    next(error);
  }
};

// const getVatDeclarationsByCompany = async (req, res, next) => {
//   try {
//     const { companyId } = req.query;
//     console.log(companyId);
//     const vatDeclarationsByCompany = await VatDeclaration.find(
//       { company: companyId })
//       .populate("company")
//       .sort({ period: -1 });
//     if (!vatDeclarationsByCompany) throw HttpError(404, "Not Found");

//     const total = await VatDeclaration.countDocuments({ company: id });

//     res.status(200).json({ total, vatDeclarationsByCompany });
//   } catch (error) {
//     next(error);
//   }
// };

const getVatDeclarationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vatDeclarationById = await VatDeclaration.findById(id);
    if (!vatDeclarationById) throw HttpError(404, "Not Found");

    res.status(200).json(vatDeclarationById);
  } catch (error) {
    next(error);
  }
};

const addVatDeclaration = async (req, res, next) => {
    try {
      
    const { error } = vatDeclarationJoiSchemas.addVatDeclarationSchema.validate(req.body);
    if (error) throw HttpError(400, "missing required name field");

    await VatDeclaration.create({ ...req.body });

    res.status(201).json({ message: "Add sucsessful" });
  } catch (error) {
    next(error);
  }
};

const removeVatDeclarationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const removedVatDeclaration = await VatDeclaration.findByIdAndDelete(id);
    if (!removedVatDeclaration) throw HttpError(404, "Not found");

    res.status(200).json({ message: "Remove sucsessful" });
  } catch (error) {
    next(error);
  }
};

const updateVatDeclarationById = async (req, res, next) => {
  try {
    const { error } = vatDeclarationJoiSchemas.addVatDeclarationSchema.validate(req.body);
    if (error) throw HttpError(400, "missing fields");

    const { id } = req.params;
    
    const updatedVatDeclaration = await VatDeclaration.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedVatDeclaration) throw HttpError(404, "Not found");

    res.status(200).json({ message: "Udate sucsessful!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVatDeclarations,
  getVatDeclarationById,
  // getVatDeclarationsByCompany,
  addVatDeclaration,
  removeVatDeclarationById,
  updateVatDeclarationById,
};
