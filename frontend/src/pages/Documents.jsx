
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Documents.css";

function getFileType(filename = "") {
  const extension = filename.split(".").pop().toLowerCase();

  if (extension === "pdf") return "PDF";
  if (extension === "docx" || extension === "doc") return "DOC";
  if (extension === "txt") return "TXT";

  return "FILE";
}

function formatFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDocuments() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/documents"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            typeof data.detail === "string"
              ? data.detail
              : "Could not load documents."
          );
        }

        setDocuments(
          Array.isArray(data.documents) ? data.documents : []
        );
      } catch (err) {
        setError(
          err.message === "Failed to fetch"
            ? "Could not connect to the backend. Please check that it is running."
            : err.message || "Could not load documents."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  function handleOpen(document) {
    if (!document.stored_name) {
      setError("This document cannot be opened because its stored filename is missing.");
      return;
    }

    const url =
      "http://127.0.0.1:8000/documents/open/" +
      encodeURIComponent(document.stored_name);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <Navbar />

      <main className="documents-page">
        <section className="documents-heading">
          <span className="documents-eyebrow">YOUR KNOWLEDGE LIBRARY</span>
          <h1>My Documents</h1>
          <p>
            All your uploaded documents in one place. Open a file or
            return to Ask AI to explore its contents.
          </p>
        </section>

        <section className="documents-summary">
          <div className="documents-summary-icon">▤</div>
          <div>
            <span>Total documents</span>
            <h2>{loading ? "—" : documents.length}</h2>
          </div>
          <a href="/upload" className="documents-upload-link">
            + Upload Document
          </a>
        </section>

        <section className="documents-library">
          <div className="documents-library-heading">
            <div>
              <h2>Your library</h2>
              <p>Files available in your KnowSphere AI workspace.</p>
            </div>
            {!loading && !error && (
              <span className="documents-count">
                {documents.length} {documents.length === 1 ? "file" : "files"}
              </span>
            )}
          </div>

          {loading && (
            <div className="documents-state">
              <div className="documents-loading-icon">↻</div>
              <h3>Loading your documents...</h3>
              <p>Please wait while we retrieve your files.</p>
            </div>
          )}

          {!loading && error && (
            <div className="documents-state documents-error" role="alert">
              <div className="documents-state-icon">!</div>
              <h3>Unable to load documents</h3>
              <p>{error}</p>
              <button
                type="button"
                className="documents-primary-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && documents.length === 0 && (
            <div className="documents-state">
              <div className="documents-empty-icon">▤</div>
              <h3>Your library is empty</h3>
              <p>
                Upload a PDF, DOCX, or TXT document to start building
                your knowledge library.
              </p>
              <a href="/upload" className="documents-primary-button">
                Upload Your First Document →
              </a>
            </div>
          )}

          {!loading && !error && documents.length > 0 && (
            <div className="documents-list">
              {documents.map((document, index) => {
                const fileType = getFileType(document.filename);

                return (
                  <article
                    className="documents-file-card"
                    key={`${document.stored_name}-${index}`}
                  >
                    <div className={`documents-file-icon file-${fileType.toLowerCase()}`}>
                      {fileType}
                    </div>

                    <div className="documents-file-info">
                      <h3>{document.filename || "Untitled document"}</h3>

                      <div className="documents-file-meta">
                        <span>{formatFileSize(document.size_bytes)}</span>
                        <span className="documents-meta-dot">•</span>
                        <span>
                          {document.uploaded_at
                            ? new Date(
                                document.uploaded_at * 1000
                              ).toLocaleString()
                            : "Date unavailable"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="documents-open-button"
                      onClick={() => handleOpen(document)}
                    >
                      Open Document <span>↗</span>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <div className="documents-footer-tip">
          <span>✦</span>
          <p>
            <strong>Need information from a file?</strong> Open Ask AI
            to ask questions about your uploaded documents.
          </p>
          <a href="/chat">Ask AI →</a>
        </div>
      </main>
    </>
  );
}

export default Documents;
