import cv2, numpy as np
from PIL import Image
import io

async def analyze_certificate(file):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img_np = np.array(img)

    layers = {
        "metadata_check": check_metadata(img),
        "noise_analysis": noise_analysis(img_np),
        "font_consistency": font_check(img_np),
        "seal_verification": seal_check(img_np),
    }

    score = sum(layers.values()) / len(layers)
    verdict = "FORGED" if score > 0.5 else "AUTHENTIC"

    return {
        "verdict": verdict,
        "confidence": round(score * 100, 2),
        "layers": layers,
        "explanation": generate_explanation(layers)
    }

def check_metadata(img): return 0.1
def noise_analysis(img): return 0.2
def font_check(img): return 0.1
def seal_check(img): return 0.1

def generate_explanation(layers):
    return {k: f"Layer '{k}' contributed to forgery score" for k in layers}