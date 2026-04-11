def summarize_text(text: str) -> str:
    # Temporary placeholder (replace later with LLM)
    if len(text) <= 200:
        return text
    return text[:200] + "..."