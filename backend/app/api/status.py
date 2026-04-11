from fastapi import APIRouter
from app.core.celery_app import celery_app

router = APIRouter()

@router.get("/{task_id}")
def get_status(task_id: str):
    task = celery_app.AsyncResult(task_id)

    if task.state == "PENDING":
        return {"status": "pending"}

    elif task.state == "SUCCESS":
        return {
            "status": "completed",
            "result": task.result
        }

    elif task.state == "FAILURE":
        return {
            "status": "failed",
            "error": str(task.result)
        }

    return {"status": task.state}