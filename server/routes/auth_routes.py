# server/routes/auth_routes.py
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from bson import ObjectId
from datetime import timedelta

from database import users_collection
from models import UserCreate, UserInDB, Token
from auth import get_password_hash, verify_password, create_access_token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/signup", status_code=201)
async def signup(user: UserCreate):
    # Check if email already exists
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed_pw = get_password_hash(user.password)
    user_doc = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_pw,
    }

    result = await users_collection.insert_one(user_doc)
    return {"message": "User created successfully", "user_id": str(result.inserted_id)}


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # OAuth2PasswordRequestForm sends "username" instead of "email"
    email = form_data.username
    password = form_data.password

    user_doc = await users_collection.find_one({"email": email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password",
        )

    if not verify_password(password, user_doc["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password",
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user_doc["_id"])},
        expires_delta=access_token_expires,
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserInDB)
async def get_me(current_user = Depends(get_current_user)):
    return UserInDB(
        id=current_user["id"],
        name=current_user["name"],
        email=current_user["email"],
    )
