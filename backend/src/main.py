import uvicorn
from fastapi import FastAPI

from auth.router import router as auth_router
from projects.router import router as project_router

app = FastAPI(title="UniTeam 🧑‍🎓")
app.include_router(auth_router)
app.include_router(project_router)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
