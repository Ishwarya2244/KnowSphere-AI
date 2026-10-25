
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter both your email and password.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // This checks the form only. Real authentication
    // requires verifying credentials on a backend.
    setError("");
    navigate("/home");
  }

  return (
    <main className="login-container">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />

      <header className="login-brand">
        <div className="brand-symbol">✳</div>
        <h1>
          KnowSphere <span>AI</span>
        </h1>
        <p>AI-Powered Knowledge Assistant</p>

        <div className="brand-divider" />

        <h2>Transform documents into answers.</h2>
        <p className="brand-description">
          Upload your documents. Ask questions.
          Discover the knowledge within.
        </p>

        <div className="brand-features">
          <div className="brand-feature">
            <span>01</span>
            <div>
              <strong>Upload documents</strong>
              <small>PDF, DOCX and TXT files</small>
            </div>
          </div>

          <div className="brand-feature">
            <span>02</span>
            <div>
              <strong>Ask questions</strong>
              <small>Find relevant information</small>
            </div>
          </div>

          <div className="brand-feature">
            <span>03</span>
            <div>
              <strong>Get grounded answers</strong>
              <small>Answers with document sources</small>
            </div>
          </div>
        </div>
      </header>

      <section className="login-card">
        <div className="login-card-sparkle">✦</div>

        <p className="login-eyebrow">YOUR KNOWLEDGE SPACE</p>
        <h2>Welcome back</h2>
        <p className="login-subtitle">
          Sign in to continue to KnowSphere AI
        </p>

        <form onSubmit={handleLogin} noValidate>
          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              required
            />
          </div>

          <label className="remember-option">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            <span>Remember me</span>
          </label>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button className="login-button" type="submit">
            Login <span aria-hidden="true">→</span>
          </button>
        </form>

        <div className="login-card-footer">
          <span className="footer-star">✦</span>
          Built for smarter document discovery
        </div>
      </section>

      <footer className="login-footer">
        KNOWSPHERE AI <span>•</span> YOUR DOCUMENTS, YOUR KNOWLEDGE
      </footer>
    </main>
  );
}

export default Login;
