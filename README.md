# KnowSphere AI — Document-Based Knowledge Assistant

## About the Project

KnowSphere AI is an AI-powered document question-answering application that helps users retrieve information from their uploaded documents. It uses Retrieval-Augmented Generation (RAG) to find relevant content and generate answers grounded in document information.

Unlike a general-purpose chatbot, KnowSphere AI is designed to answer questions using the content available in uploaded documents. If relevant information cannot be found, it informs the user instead of making up an answer.

## Features

- Upload PDF, DOCX, and TXT documents.
- Extract and process text from uploaded files.
- Split document text into smaller chunks.
- Retrieve relevant content using semantic search and embeddings.
- Ask questions about uploaded documents.
- Generate answers using Google's Gemini API.
- Display source document names for answers when available.
- View and open uploaded documents.
- Responsive React-based user interface.

## Technology Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Python
- FastAPI
- Sentence Transformers
- ChromaDB
- Google Gemini API

**Document Processing**
- PyPDF
- python-docx

## How It Works

1. The user uploads a document.
2. The backend extracts its text.
3. The text is split into smaller chunks.
4. Embeddings are generated and stored in ChromaDB.
5. When the user asks a question, relevant document chunks are retrieved.
6. The language model generates an answer using the retrieved information.
7. The application returns the answer and available source information.

## Project Structure

```text
KnowSphere-AI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
├── backend/
│   ├── main.py
│   ├── uploads/
│   └── requirements.txt
└── README.md
```

*Note: The structure above is a general overview. Actual files and folders may vary.*

## Running the Project

### 1. Start the Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Activate your Python virtual environment if you use one, install the dependencies listed in `requirements.txt`, and configure the required environment variables in a `.env` file.

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend API documentation:

http://127.0.0.1:8000/docs

### 2. Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

http://localhost:5173

## Environment Configuration

Configure the required API key and model settings in the backend `.env` file according to the application code.

**Security:** Never commit API keys, passwords, or other secrets to GitHub.

## Future Enhancements

- User authentication and account management.
- Support for multiple documents and larger files.
- Improved retrieval accuracy and response evaluation.
- Additional document formats.
- Deployment to a cloud platform.

## Author

Developed as an AI and Data Science portfolio project to explore document intelligence, semantic search, and Retrieval-Augmented Generation (RAG).
