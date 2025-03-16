const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Eyal0509596599Koubi!@#";
const ADMIN_EMAIL = "eyal4845@gmail.com";

// הרשמה
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 👇 שים לב - אין `bcrypt.hash` כאן כי זה כבר קורה ב-User.js!
    const newUser = new User({ fullName, email, password });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔍 Attempting login for:", email);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // ✅ חיפוש המשתמש פעם אחת בלבד
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ User found:", user.email);
    console.log("🔐 Hashed password in DB:", user.password);
    console.log("🔑 Password provided:", password);

    // ✅ השוואה נכונה של הסיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, fullName: user.fullName },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: user.role, userId: user._id });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { notificationsEnabled } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { notificationsEnabled },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `Notifications have been ${
        notificationsEnabled ? "enabled" : "disabled"
      } successfully.`,
      user,
    });
  } catch (error) {
    console.error("❌ Error updating notifications:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      notificationsEnabled: user.notificationsEnabled || false, // ברירת מחדל אם לא קיים
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateNotifications,
  getUserProfile,
};
