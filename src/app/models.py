from sqlalchemy import Column, Integer, String, DateTime
# from database import Base
from . import database


class UrlShortenerModel(database.Base):
    __tablename__ = "url_shortener_model"

    id = Column(Integer, primary_key=True, index=True)
    original_url = Column(String(255))
    short_url = Column(String(7), unique=True)
    visit = Column(Integer, default=0)
