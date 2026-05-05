import uvicorn
from fastapi import FastAPI

from auth.router import router as auth_router
from projects.router import router as project_router
from password_reset.router import router as password_reset_router
from users.router import router as user_router

app = FastAPI(title="UniTeam 🧑‍🎓")
app.include_router(auth_router)
app.include_router(project_router)
app.include_router(password_reset_router)
app.include_router(user_router)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
