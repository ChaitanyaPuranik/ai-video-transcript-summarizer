import os
import shutil
from fastapi import APIRouter, UploadFile, File
from app.tasks.transcription_task import process_transcript

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    task = process_transcript.delay(file_path)

    return {
        "task_id": task.id,
        "status": "processing"
    }