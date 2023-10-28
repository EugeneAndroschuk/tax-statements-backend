const { Schema, model } = require("mongoose");

const vatDeclarationSchema = new Schema(
  {
    period: {
      type: Date,
      required: [true, "Period is required"],
    },
    revenue: {
      type: Number,
      required: [true, "Revenue is required"],
    },
    vatPayable: {
      type: Number,
      required: [true, "VAT payable is required"],
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
    },
  },
  { versionKey: false, timestamps: false }
);

const VatDeclaration = model("vatDeclaration", vatDeclarationSchema);

module.exports = VatDeclaration;
