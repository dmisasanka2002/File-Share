# FileShare v1.0.3

![FileShare Logo](path/to/logo.png)

## Overview

**FileShare** is a simple and efficient web application that enables users to share files seamlessly between a PC and multiple mobile devices. This app eliminates the need for cables or data charges, offering a hassle-free way to transfer files. Built with a focus on ease of use and speed, FileShare supports multiple file uploads simultaneously, making it a perfect solution for quick file sharing.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Seamless File Sharing:** Easily transfer files between your PC and mobile devices without using cables or incurring data charges.
- **Multiple File Uploads:** Support for uploading multiple files at once, streamlining the sharing process.
- **User-Friendly Interface:** Simple and intuitive design to enhance user experience.
- **Scalable:** Built using modular architecture, allowing easy updates and scalability.

## Technologies Used

- **Backend:** Node.js, Express.js
- **File Handling:** Multer for handling `multipart/form-data`
- **Frontend:** HTML, CSS, JavaScript
- **Version:** 1.0.3

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/fileshare.git
   cd fileshare
   ```
2. **Install Dependencies::**
   ```Navigate to the project directory and install the required dependencies using npm
   npm install
   ```
3. **Run the Server:**
   ```Start the Express server by running
   node server.js
   ```
4. **Open in Browser:**

   ```Open your web browser and go to
   http://localhost:3000

   ```

## Usage

1. **Upload Files:**

Access the application from your PC's browser.
Choose files to upload using the file selection interface.
Click the upload button to start transferring files.

2. **Access Files on Mobile:**

Open the same URL (http://localhost:3000) or scan the QR code on your mobile device browser.
Access the uploaded files and download them to your mobile device.

## Project Structure
```
.
├───node_modules # Dependencies installed via npm
├───public # Frontend files (HTML, CSS, JavaScript)
│ ├───index.html # Main HTML file
│ ├───style.css # Custom CSS styles
│ └───script.js # Custom JavaScript
├───uploads # Directory to store uploaded files
├───server.js # Main server file for Express
└───package.json # Project configuration and dependencies
```

## Contributing

Contributions are welcome! If you have suggestions, improvements, or find any bugs, please feel free to open an issue or submit a pull request. To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.
