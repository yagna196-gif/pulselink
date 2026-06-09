from fastapi import FastAPI

app = FastAPI(title="PulseLink API")


@app.get("/")
def root():
    return {"message": "Welcome to PulseLink API"}