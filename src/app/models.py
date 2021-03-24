from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./url_shortener.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class UrlShortenerModel(database.Base):
    __tablename__ = "url_shortener_model"

    id = Column(Integer, primary_key=True, index=True)
    original_url = Column(String(255))
    short_url = Column(String(7), unique=True)
    visit = Column(Integer, default=0)
