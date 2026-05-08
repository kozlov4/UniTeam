import os
import cloudinary
from core.config import settings
import uvicorn
from fastapi import FastAPI

from auth.router import router as auth_router
from projects.router import router as project_router
from password_reset.router import router as password_reset_router
from users.router import router as user_router
from uploads.router import router as upload_router
from admin.router import router as admin_router

os.environ["CLOUDINARY_URL"] = settings.cloudinary_url

cloudinary.config(secure=True)
app = FastAPI(title="UniTeam 🧑‍🎓")
app.include_router(auth_router)
app.include_router(project_router)
app.include_router(password_reset_router)
app.include_router(user_router)

app.include_router(upload_router)

app.include_router(admin_router)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
