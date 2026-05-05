from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    database_url: str

    mail_username: str
    mail_password: str
    mail_from: str

    secret_key: str
    algorithm: str

    jwt_private_key: str
    jwt_public_key: str

    access_token_expire_minutes: int = 20

    model_config = SettingsConfigDict(env_file=BASE_DIR / ".env", extra="ignore")


settings = Settings()
