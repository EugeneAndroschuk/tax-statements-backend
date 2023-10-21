const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      // required: !this.googleId,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: String,
    avatarURL: String,
    googleId: { type: String, default: "" },
  },
  { versionKey: false, timestamps: false }
);

const User = model("user", userSchema);

module.exports = User;
