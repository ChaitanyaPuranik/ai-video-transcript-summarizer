from app.core.celery_app import celery_app
from app.services.whisper_service import transcribe_audio_file
from app.services.summarizer_service import summarize_text
from backend.app.api import transcript

@celery_app.task
def process_transcript(file_path: str):
    try:
        transcript = transcribe_audio_file(file_path)
        # summary = summarize_text(transcript)
        return {
            "status": "completed",
            "transcript": transcript,
            # "summary": summary,
        }

    except Exception as e:
        return {
            "status": "failed",
            "error": str(e)
        }