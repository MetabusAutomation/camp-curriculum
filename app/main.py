from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

# Import debugpy for remote debugging
import debugpy  # type: ignore

from app.routes import router

# Initialize FastAPI app
app: FastAPI = FastAPI(title="My FastAPI App")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routes
app.include_router(router)

if __name__ == "__main__":
    # Enable hot reload by default in development
    reload: bool = os.environ.get("ENVIRONMENT", "production").lower() == "development"
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=reload) 