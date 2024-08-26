const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const os = require("os");
const QRCode = require("qrcode");
const port = 3000;

// Function to get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "127.0.0.1"; // Fallback to localhost if no IP found
}

// Configure multer for file uploads with original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Upload endpoint
app.post("/upload", upload.array("files"), (req, res) => {
  res.json({ success: true });
});

// Endpoint to list files
app.get("/files", (req, res) => {
  fs.readdir("uploads/", (err, files) => {
    if (err) {
      res.status(500).send("Error reading files");
    } else {
      res.json({ files });
    }
  });
});

// Endpoint to serve files
app.get("/files/:filename", (req, res) => {
  const filepath = path.join(__dirname, "uploads", req.params.filename);
  res.sendFile(filepath);
});

// Endpoint to get local IP address
app.get("/local-ip", (req, res) => {
  const localIP = getLocalIP();
  res.json({ localIP });
});

// Endpoint to get QR code for local IP
app.get("/qr-code", (req, res) => {
  const localIP = getLocalIP();
  const url = `http://${localIP}:3000`;
  QRCode.toDataURL(url, (err, qrCode) => {
    if (err) {
      res.status(500).send("Error generating QR code");
    } else {
      res.json({ qrCode });
    }
  });
});

// Clear cache endpoint
app.post("/clear-cache", (req, res) => {
  fs.readdir("uploads/", (err, files) => {
    if (err) {
      res.status(500).send("Error reading files");
      return;
    }

    files.forEach((file) => {
      fs.unlink(path.join("uploads", file), (err) => {
        if (err) {
          res.status(500).send("Error deleting files");
          return;
        }
      });
    });

    res.json({ success: true });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
