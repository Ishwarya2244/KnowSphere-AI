
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main className="home-container">
        <section className="home-hero">
          <span className="home-eyebrow">
            ✦ YOUR KNOWLEDGE, SIMPLIFIED
          </span>

          <h1>
            Your documents.
            <br />
            <span>Your answers.</span>
          </h1>

          <p>
            Turn your documents into useful knowledge.
            Upload files, ask questions, and discover answers
            grounded in the information you provide.
          </p>

          <Link to="/upload" className="home-primary-button">
            Get started <span aria-hidden="true">→</span>
          </Link>

          <div className="home-orb home-orb-one" />
          <div className="home-orb home-orb-two" />
        </section>

        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">EXPLORE KNOWSPHERE</span>
              <h2>What would you like to do?</h2>
            </div>
            <p>Everything you need, in one place.</p>
          </div>

          <div className="home-cards">
            <article className="home-card">
              <div className="home-card-icon upload-icon">↑</div>
              <span className="home-card-number">01 / UPLOAD</span>
              <h3>Upload documents</h3>
              <p>
                Add PDF, DOCX, or TXT files and make their
                information ready to explore.
              </p>
              <Link to="/upload" className="home-card-link">
                Upload files <span aria-hidden="true">↗</span>
              </Link>
            </article>

            <article className="home-card">
              <div className="home-card-icon chat-icon">✳</div>
              <span className="home-card-number">02 / DISCOVER</span>
              <h3>Ask your AI</h3>
              <p>
                Ask questions and get relevant answers
                from the content of your uploaded documents.
              </p>
              <Link to="/chat" className="home-card-link">
                Start asking <span aria-hidden="true">↗</span>
              </Link>
            </article>

            <article className="home-card">
              <div className="home-card-icon docs-icon">▤</div>
              <span className="home-card-number">03 / ORGANIZE</span>
              <h3>My documents</h3>
              <p>
                Browse your uploaded files and open them
                whenever you need their information.
              </p>
              <Link to="/documents" className="home-card-link">
                View documents <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
        </section>

        <footer className="home-footer">
          <span>✦ KNOWSPHERE AI</span>
          <span>Make knowledge easier to find.</span>
        </footer>
      </main>
    </div>
  );
}

export default Home;
