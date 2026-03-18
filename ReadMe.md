AI Video Transcript and Summarization System

Monorepo containing:
- Next.js frontend
- FastAPI backend
- Celery worker (future)

Tech Stack:
- Next.js
- FastAPI
- Whisper
- PostgreSQL
- Redis


Startup Order

# Terminal 1 — Redis
memurai-cli ping

# Terminal 2 — Backend
cd backend
.\.venv\Scripts\activate
python -m uvicorn app.main:app --reload

# Terminal 3 — Frontend
cd frontend
npm run dev