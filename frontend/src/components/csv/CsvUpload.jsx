import React, { useState } from "react";

function CsvUpload() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("csvFile");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message || "Upload complete");
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div>
      <h2>Upload CSV to Simulate Calls</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" id="csvFile" accept=".csv" required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CsvUpload;
