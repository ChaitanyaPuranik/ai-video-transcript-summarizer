from fastapi import FastAPI

app = FastAPI(title="AI Transcript System API")

@app.get("/health")
def health():
    return {"status": "ok"}
