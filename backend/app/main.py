from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import transcript, status

app = FastAPI(title="AI Transcript System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transcript.router, prefix="/transcript", tags=["Transcript"])
app.include_router(status.router, prefix="/status", tags=["Status"])

@app.get("/health")
def health():
    return {"status": "ok"}