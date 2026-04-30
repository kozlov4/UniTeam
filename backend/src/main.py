import uvicorn
from fastapi import FastAPI

from auth.router import router as auth_router

app = FastAPI(title="UniTeam 🧑‍🎓")
app.include_router(auth_router)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
