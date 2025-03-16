const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ADMIN_EMAIL = "eyal4845@gmail.com";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: function () {
      return this.email === ADMIN_EMAIL ? "admin" : "user";
    },
  },
  notificationsEnabled: {
    type: Boolean,
    default: false,
  },
});

// הצפנת סיסמה לפני שמירת משתמש
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
