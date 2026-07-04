from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Simple in-memory user store
fake_db = {}

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_token(username: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(
        {"sub": username, "exp": expire},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

def register_user(username: str, password: str):
    if username in fake_db:
        return None
    fake_db[username] = hash_password(password)
    return create_token(username)

def login_user(username: str, password: str):
    if username not in fake_db:
        return None
    if not verify_password(password, fake_db[username]):
        return None
    return create_token(username)