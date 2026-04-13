import os
import datetime
from app.core.celery_app import celery_app
from app.core.database import SessionLocal
from app.models.job import TranscriptJob
from app.services.whisper_service import transcribe_audio_file
from app.services.summarizer_service import summarize_text

@celery_app.task
def process_transcript(file_path: str):
    db = SessionLocal()
    task_id = process_transcript.request.id

    try:
        transcript = transcribe_audio_file(file_path)
        summary = summarize_text(transcript)

        job = db.query(TranscriptJob).filter(
            TranscriptJob.task_id == task_id
        ).first()

        if job:
            job.status = "completed"
            job.transcript = transcript
            job.summary = summary
            job.completed_at = datetime.datetime.utcnow()
            db.commit()

        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception:
            pass

        return {
            "status": "completed",
            "transcript": transcript,
            "summary": summary,
        }

    except Exception as e:
        job = db.query(TranscriptJob).filter(
            TranscriptJob.task_id == task_id
        ).first()

        if job:
            job.status = "failed"
            db.commit()

        return {
            "status": "failed",
            "error": str(e)
        }

    finally:
        db.close()