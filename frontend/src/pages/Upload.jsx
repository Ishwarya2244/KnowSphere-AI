
import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedExtensions = [".pdf", ".docx", ".txt"];
    const fileName = selectedFile.name.toLowerCase();
    const isValid = allowedExtensions.some((extension) =>
      fileName.endsWith(extension)
    );

    if (!isValid) {
      setFile(null);
      setMessage("Please select a PDF, DOCX, or TXT file.");
      setUploadResult(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a document before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");
    setUploadResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          typeof data.detail === "string"
            ? data.detail
            : "Upload failed. Please try again."
        );
        return;
      }

      setUploadResult(data);
      setMessage(data.message || "Document uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage(
        "Could not connect to the backend. Please check that your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="upload-page">
        <section className="upload-heading">
          <span className="upload-eyebrow">YOUR KNOWLEDGE SPACE</span>
          <h1>Upload Documents</h1>
          <p>
            Bring your documents into KnowSphere AI and get ready to
            explore their information with AI-powered question answering.
          </p>
        </section>

        <section className="upload-card">
          <div className="upload-card-heading">
            <div className="upload-icon">↑</div>
            <div>
              <h2>Add a new document</h2>
              <p>Upload a file to start building your knowledge space.</p>
            </div>
          </div>

          <label
            className={`upload-dropzone ${dragging ? "dragging" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              handleFile(event.dataTransfer.files?.[0]);
            }}
          >
            <input
              className="upload-file-input"
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(event) =>
                handleFile(event.target.files?.[0])
              }
            />

            <span className="upload-cloud-icon">⇧</span>
            <strong>Click to browse or drag your file here</strong>
            <span className="upload-drop-description">
              Supported formats: PDF, DOCX and TXT
            </span>
            <span className="upload-browse-button">
              Choose a document
            </span>
          </label>

          {file && (
            <div className="selected-file">
              <div className="selected-file-icon">▤</div>
              <div className="selected-file-details">
                <strong>{file.name}</strong>
                <span>
                  {file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(1)} KB`
                    : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                </span>
              </div>
              <button
                type="button"
                className="remove-file-button"
                onClick={() => {
                  setFile(null);
                  setMessage("");
                  setUploadResult(null);
                }}
                disabled={loading}
                aria-label="Remove selected file"
              >
                ×
              </button>
            </div>
          )}

          <button
            type="button"
            className="upload-submit-button"
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? "Uploading document..." : "Upload Document"}
            {!loading && <span> →</span>}
          </button>

          {message && (
            <p
              className={`upload-message ${
                uploadResult ? "success-message" : "error-message"
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          {uploadResult && (
            <div className="upload-success-card">
              <div className="success-check">✓</div>
              <div className="success-content">
                <h3>Document processed successfully!</h3>
                <p>
                  <strong>Filename:</strong>{" "}
                  {uploadResult.filename || file?.name || "Uploaded document"}
                </p>
                <p>
                  <strong>Chunks stored:</strong>{" "}
                  {uploadResult.chunks_added ?? "Not provided"}
                </p>
                <p>
                  Your document is ready to use for question answering.
                </p>
                <a href="/chat" className="ask-ai-link">
                  Go to Ask AI →
                </a>
              </div>
            </div>
          )}
        </section>

        <section className="upload-tips">
          <div className="upload-tip">
            <span>01</span>
            <div>
              <strong>Upload your file</strong>
              <p>Select a PDF, DOCX or TXT document.</p>
            </div>
          </div>
          <div className="upload-tip">
            <span>02</span>
            <div>
              <strong>Let AI process it</strong>
              <p>KnowSphere prepares the document for retrieval.</p>
            </div>
          </div>
          <div className="upload-tip">
            <span>03</span>
            <div>
              <strong>Ask questions</strong>
              <p>Get answers based on your uploaded content.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Upload;
