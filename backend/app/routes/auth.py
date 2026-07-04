from fastapi import APIRouter
from app.models.user import UserRegister, UserLogin, Token
from app.services.auth_service import register_user, login_user

router = APIRouter()

@router.post("/register")
async def register(user: UserRegister):
    token = register_user(user.username, user.password)
    if not token:
        return {"error": "Username already exists"}
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
async def login(user: UserLogin):
    token = login_user(user.username, user.password)
    if not token:
        return {"error": "Invalid credentials"}
    return {"access_token": token, "token_type": "bearer"}

@router.get("/health")
async def health():
    return {"status": "ok"}