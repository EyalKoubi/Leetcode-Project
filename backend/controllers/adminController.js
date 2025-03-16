const Problem = require("../models/Problem");
const User = require("../models/User");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const ADMIN_EMAIL = "eyal4845@gmail.com";

const sendEmail = async (to, subject, text) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_EMAIL,
      subject,
      text,
      trackingSettings: {
        clickTracking: { enable: false, enableText: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false },
      },
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error(
      "❌ Error sending email:",
      error.response ? error.response.body : error
    );
  }
};

const uploadSolution = async (req, res) => {
  try {
    const { name, description, category, videoUrl, codeUrl } = req.body;

    // בדיקה אם כל הנתונים קיימים
    if (!videoUrl || !codeUrl) {
      return res.status(400).json({ message: "Missing uploaded file URLs" });
    }

    const newProblem = new Problem({
      name,
      description,
      category,
      videoUrl,
      codeUrl,
    });

    await newProblem.save();

    const users = await User.find({});
    const emails = users
      .filter(
        (user) =>
          user.role === "user" &&
          user.email !== ADMIN_EMAIL &&
          user.notificationsEnabled
      )
      .map((user) => user.email);

    if (emails.length > 0) {
      await sendEmail(
        emails,
        "📢 New Problem Added!",
        `A new problem "${name}" has been added to the platform. Check it out!
        Good luck in your job seeking! 🚀`
      );
    }

    res.status(201).json({
      message: "✅ Solution uploaded successfully!",
      problem: newProblem,
    });
  } catch (error) {
    console.error("❌ Upload solution error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find(); // מביא את כל המסמכים מהאוסף
    res.status(200).json(problems);
  } catch (error) {
    console.error("❌ Error fetching problems:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProblem = await Problem.findByIdAndDelete(id);

    if (!deletedProblem) {
      return res.status(404).json({ message: "❌ Problem not found" });
    }

    const users = await User.find({});
    const emails = users
      .filter(
        (user) =>
          user.role === "user" &&
          user.email !== ADMIN_EMAIL &&
          user.notificationsEnabled
      )
      .map((user) => user.email);

    if (emails.length > 0) {
      await sendEmail(
        emails,
        "📢 Problem deleted :(",
        `The problem "${deletedProblem.name}" has been deleted the platform.
        Good luck in your job seeking! 🚀`
      );
    }

    res.status(200).json({ message: "🗑 Problem deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting problem:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      { name, description, category },
      { new: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: "❌ Problem not found" });
    }

    const users = await User.find({});
    const emails = users
      .filter(
        (user) =>
          user.role === "user" &&
          user.email !== ADMIN_EMAIL &&
          user.notificationsEnabled
      )
      .map((user) => user.email);

    if (emails.length > 0) {
      await sendEmail(
        emails,
        "📢 Problem Updated!",
        `A new problem "${updatedProblem.name}" has been updated in the platform. Check it out!
        Good luck in your job seeking! 🚀`
      );
    }

    res.status(200).json({
      message: "✏️ Problem updated successfully!",
      problem: updatedProblem,
    });
  } catch (error) {
    console.error("❌ Error updating problem:", error);
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

module.exports = {
  updateProblem,
  getAllProblems,
  uploadSolution,
  deleteProblem,
  updateNotifications,
};
