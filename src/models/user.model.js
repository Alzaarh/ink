const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongooseHidden = require("mongoose-hidden")();

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    phone: String,
    password: { type: String, hide: true },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseHidden);

userSchema.pre("save", async function () {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
