
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";
import "../styles/Chat.css";

function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const userQuestion = question.trim();

    if (!userQuestion || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: userQuestion },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Unable to get an answer. Please try again."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "ai",
          text: data.answer || "No answer was returned.",
          sources: Array.isArray(data.sources) ? data.sources : [],
        },
      ]);
    } catch (error) {
      console.error("Ask AI error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "error",
          text:
            error.message === "Failed to fetch"
              ? "Could not connect to the backend. Please check that KnowSphere AI's backend is running."
              : error.message,
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="chat-page">
        <section className="chat-heading">
          <span className="chat-eyebrow">
            YOUR PERSONAL DOCUMENT ASSISTANT
          </span>
          <h1>Ask your documents.</h1>
          <p>
            Find information from your uploaded files with KnowSphere AI.
            Ask a question and explore what your documents contain.
          </p>
        </section>

        <section className="chat-panel">
          <header className="chat-panel-header">
            <div className="chat-assistant-icon">✳</div>

            <div className="chat-assistant-info">
              <h2>KnowSphere AI</h2>
              <p>
                <span className="chat-status-dot"></span>
                Document assistant
              </p>
            </div>

            <span className="chat-grounded-label">
              Document-based answers
            </span>
          </header>

          <div className="chat-box" aria-live="polite">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-icon">✦</div>
                <h3>What would you like to know?</h3>
                <p>
                  Ask questions about the documents you have uploaded.
                  Answers depend on the information available in those files.
                </p>

                <div className="chat-suggestions">
                  <span>Try asking</span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuestion("Summarize the uploaded document")
                    }
                  >
                    Summarize my document
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setQuestion("What are the key points in the document?")
                    }
                  >
                    Find the key points
                  </button>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.role === "user"
                    ? "chat-message-user"
                    : message.role === "error"
                    ? "chat-message-error"
                    : "chat-message-ai"
                }`}
              >
                <div className="chat-avatar">
                  {message.role === "user" ? "Y" : "✳"}
                </div>

                <div className="chat-message-content">
                  <span className="chat-message-author">
                    {message.role === "user"
                      ? "You"
                      : message.role === "error"
                      ? "Connection issue"
                      : "KnowSphere AI"}
                  </span>

                  <div className="chat-answer">
                    {message.role === "ai" ? (
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    ) : (
                      message.text
                    )}
                  </div>

                  {message.role === "ai" &&
                    message.sources.length > 0 && (
                      <div className="chat-sources">
                        <span className="chat-sources-title">
                          <span>▤</span> Sources
                        </span>

                        <ul>
                          {message.sources.map((source, sourceIndex) => {
                            const filename =
                              typeof source === "string"
                                ? source
                                : source?.filename || "Uploaded document";

                            return (
                              <li key={`${filename}-${sourceIndex}`}>
                                {filename}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message chat-message-ai">
                <div className="chat-avatar">✳</div>
                <div className="chat-message-content">
                  <span className="chat-message-author">KnowSphere AI</span>
                  <div className="chat-thinking">
                    <span></span>
                    <span></span>
                    <span></span>
                    <small>Searching your documents...</small>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            className="chat-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              aria-label="Ask a question about your documents"
              placeholder="Ask something about your uploaded documents..."
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !question.trim()}
              aria-label="Send question"
            >
              {loading ? "Sending..." : "Ask AI"}
              {!loading && <span> ↑</span>}
            </button>
          </form>

          <p className="chat-disclaimer">
            Answers are based on retrieved document content. Always check
            the displayed sources when verifying important information.
          </p>
        </section>
      </main>
    </>
  );
}

export default Chat;
