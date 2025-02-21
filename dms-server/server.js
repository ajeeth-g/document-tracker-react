const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(require('cors')());

// Middleware to parse the urlencoded form data for domainName and refNo
app.use(express.urlencoded({ extended: true }));

// Base upload directory
const uploadBaseDir = path.join(__dirname, "DMS/upload/");

// Middleware to ensure the dynamic directory exists
const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Create directory if it doesn't exist
  }
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("testtt: " + req.body.domainName);
    
    // Ensure domainName and refNo exist in the request body
    const domainName = req.body.domainName || "istreams.com"; // Fallback if domainName is missing
    const refNo = req.body.refNo || "1001"; // Fallback if refNo is missing

    // Log the values to verify that we are receiving them properly
    console.log(`Using domain name: ${domainName}`);
    console.log(`Using refNo: ${refNo}`);
    
    // Construct the path for the domain and refNo subdirectories
    const domainDir = path.join(uploadBaseDir, domainName, refNo);
    
    // Ensure the directory exists before storing the file
    ensureDirectoryExistence(domainDir);

    // Store the file in the dynamically created directory
    cb(null, domainDir);
  },
  filename: (req, file, cb) => {
    // Keep the original file name
    cb(null, file.originalname);
  },
});

// Initialize multer upload object
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Use multer middleware to handle the form data
app.post("/upload", upload.array("file", 10), (req, res) => {
  try {
    // Ensure domainName and refNo are available
    console.log("Request Body:", req.body); // Log body to verify domainName and refNo

    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Send response with details of uploaded files
    res.json({
      message: "Files uploaded successfully",
      files: req.files.map((file) => ({
        filename: file.filename,
        refNo: req.body.refNo,
        category: req.body.category,
      })),
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
