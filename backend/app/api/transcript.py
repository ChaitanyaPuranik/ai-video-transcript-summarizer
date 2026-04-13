import os
import shutil
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.tasks.transcription_task import process_transcript
from app.core.database import get_db
from app.models.job import TranscriptJob

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "..", "..", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    file_path = os.path.abspath(file_path)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    task = process_transcript.delay(file_path)

    job = TranscriptJob(
        task_id=task.id,
        filename=file.filename,
        status="pending"
    )
    db.add(job)
    db.commit()

    return {
        "task_id": task.id,
        "status": "processing"
    }