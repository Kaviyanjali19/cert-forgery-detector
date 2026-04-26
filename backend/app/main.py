from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import detect, auth

app = FastAPI(title="Certificate Forgery Detector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(detect.router, prefix="/api/detect")
app.include_router(auth.router, prefix="/api/auth")