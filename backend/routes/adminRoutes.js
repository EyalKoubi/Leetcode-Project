const express = require("express");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const {
  uploadSolution,
  getAllProblems,
  deleteProblem,
  updateProblem,
  updateNotifications,
} = require("../controllers/adminController");

dotenv.config();
const router = express.Router();

// אתחול S3Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// אתחול multer כדי לעבוד עם buffer במקום עם קובץ בדיסק
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadFileToS3(file) {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
}

router.post(
  "/upload",
  upload.fields([{ name: "video" }, { name: "code" }]),
  async (req, res) => {
    try {
      if (!req.files || !req.files.video || !req.files.code) {
        return res
          .status(400)
          .json({ message: "Video and code file are required" });
      }

      // העלאה ל-S3
      const videoUrl = await uploadFileToS3(req.files.video[0]);
      const codeUrl = await uploadFileToS3(req.files.code[0]);

      req.body.videoUrl = videoUrl;
      req.body.codeUrl = codeUrl;

      // קריאה לפונקציית הוספת פתרון
      await uploadSolution(req, res);
    } catch (error) {
      console.error("❌ Upload error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }
);

router.get("/problems", getAllProblems);

router.delete("/problems/:id", deleteProblem);

router.put("/problems/:id", updateProblem);

router.put("/notifications/:userId", updateNotifications);

module.exports = router;
