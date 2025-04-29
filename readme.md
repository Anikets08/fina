# Fina - Personal Finance Management Tool

Fina is a tool for managing personal finances by processing bank statements, analyzing transactions, and providing insights through an interactive interface.

## Setup & Installation

### Prerequisites

- Python 3.8+
- Node.js and npm
- API keys for:
  - OpenAI
  - Pinecone
  - LangSmith
  - Veryfi (for PDF processing)

## Getting Started

### 1. Generate JSON from PDF Bank Statement

1. Open `pdf2json.py` and add your Veryfi API credentials:

   ```python
   CLIENT_ID = "your_client_id"
   AUTH = "your_auth_token"
   ```

2. Run the PDF to JSON conversion:

   ```bash
   python pdf2json.py
   ```

3. The script will output JSON data. Save this output to a new file in the `/backend/jsons/` directory.

### 2. Start the Backend API

1. Create and configure your environment variables:

   ```bash
   touch .env
   ```

2. Add the following variables to the `.env` file:

   ```
   OPENAI_API_KEY=your_openai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   LANGSMITH_API_KEY=your_langsmith_api_key
   ```

3. Install required Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

   Or if you're using Pipenv:

   ```bash
   pipenv install
   ```

4. Start the FastAPI server:
   ```bash
   fastapi dev backend/main.py
   ```

### 3. Run the Frontend Application

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the application at `http://localhost:3000`

## Project Structure

- `/backend` - FastAPI backend service
  - `/jsons` - Processed bank statement data
  - `/models` - Data models
  - `/routes` - API endpoints
  - `/services` - Business logic services
- `/frontend` - Next.js web application
  - `/app` - Frontend pages
  - `/components` - Reusable UI components
  - `/models` - TypeScript data models
