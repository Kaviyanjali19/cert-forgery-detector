import numpy as np
from PIL import Image, ImageFilter
import io
import base64

def generate_heatmap(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    
    # Simple edge detection heatmap
    gray = img.convert("L")
    edges = gray.filter(ImageFilter.FIND_EDGES)
    
    # Convert to red heatmap
    edges_array = np.array(edges)
    heatmap = np.zeros((224, 224, 3), dtype=np.uint8)
    heatmap[:,:,0] = edges_array  # Red channel
    
    result = Image.fromarray(heatmap)
    buffer = io.BytesIO()
    result.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode()
    return f"data:image/png;base64,{encoded}"