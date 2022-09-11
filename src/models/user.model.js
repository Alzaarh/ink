const crypto = require("crypto");

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
    encryptionKey: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.pre("save", async function () {
  if (!this.encryptionKey) {
    this.encryptionKey = await crypto.randomBytes(32).toString("hex");
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
