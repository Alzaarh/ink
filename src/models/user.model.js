const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: String,
    phone: String,
    password: String,
    province: String,
    city: String,
    age: Number,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
