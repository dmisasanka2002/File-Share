document.addEventListener("DOMContentLoaded", () => {
  loadFiles();
  fetchLocalIP();
  fetchQrCode();

  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");

  dropArea.addEventListener("click", () => fileInput.click());

  dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("dragover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
  });

  dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("dragover");
    const files = event.dataTransfer.files;
    fileInput.files = files;
    displayFilePreview(files);
  });

  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    displayFilePreview(files);
  });
});

function displayFilePreview(files) {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  Array.from(files).forEach((file) => {
    const listItem = document.createElement("li");
    const link = document.createElement("span");
    const icon = document.createElement("i");
    icon.className = "fas fa-file-alt"; // File icon from Font Awesome
    link.textContent = file.name;
    listItem.appendChild(icon);
    listItem.appendChild(link);
    fileList.appendChild(listItem);
  });
}

async function loadFiles() {
  try {
    const response = await fetch("/files");
    const data = await response.json();
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";
    data.files.forEach((file) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      const icon = document.createElement("i");
      icon.className = "fas fa-file-alt"; // File icon from Font Awesome
      link.href = `/files/${file}`;
      link.download = file;
      link.textContent = file;
      listItem.appendChild(icon);
      listItem.appendChild(link);
      fileList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error loading files:", error);
  }
}

async function fetchLocalIP() {
  try {
    const response = await fetch("/local-ip");
    const data = await response.json();
    const localIPElement = document.getElementById("localIP");
    localIPElement.textContent = data.localIP;
  } catch (error) {
    console.error("Error fetching local IP:", error);
  }
}

async function fetchQrCode() {
  try {
    const response = await fetch("/qr-code");
    const data = await response.json();
    const qrCodeElement = document.getElementById("qrCode");
    qrCodeElement.src = data.qrCode;
  } catch (error) {
    console.error("Error fetching QR code:", error);
  }
}

async function uploadFiles() {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) {
    alert("Please select files to upload.");
    return;
  }

  const formData = new FormData();
  Array.from(fileInput.files).forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Files uploaded successfully!");
      loadFiles();
    } else {
      alert("File upload failed.");
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    alert("File upload failed.");
  }
}

async function clearCache() {
  try {
    const response = await fetch("/clear-cache", {
      method: "POST",
    });

    if (response.ok) {
      alert("Cache cleared successfully!");
      loadFiles();
    } else {
      alert("Failed to clear cache.");
    }
  } catch (error) {
    console.error("Error clearing cache:", error);
    alert("Failed to clear cache.");
  }
}
