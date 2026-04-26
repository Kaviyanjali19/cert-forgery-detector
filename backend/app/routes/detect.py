from fastapi import APIRouter, UploadFile, File
from app.services.forgery_service import analyze_certificate

router = APIRouter()

@router.post("/")
async def detect_forgery(file: UploadFile = File(...)):
    result = await analyze_certificate(file)
    return result