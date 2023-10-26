const { Schema, model } = require("mongoose");

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    regCode: {
      type: String,
      required: [true, "Registration code is required"],
      unique: true,
    },
    taxCode: {
      type: String,
      required: [true, "Tax code is required"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  { versionKey: false, timestamps: false }
);

const Company = model("company", companySchema);

module.exports = Company;
