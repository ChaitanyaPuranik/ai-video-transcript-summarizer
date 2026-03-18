from fastapi import FastAPI
from app.core.redis_client import redis_client

app = FastAPI(title="AI Transcript System API")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/health/redis")
def health_redis():
    try:
        redis_client.ping()
        return {"redis": "ok"}
    except Exception as e:
        return {"redis": "error", "detail": str(e)}