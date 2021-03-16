import models
from datetime import datetime, timezone
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from pydantic import HttpUrl
from hashlib import md5
from models import UrlShortenerModel
from fastapi.responses import RedirectResponse

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_url(original_url: str, timestamp: float, db: Session = Depends(get_db)):
    data = f"{original_url}{timestamp}"
    short_url = md5(data.encode()).hexdigest()[:7]

    # obj = db.query(UrlShortenerModel).filter_by(short_url=short_url).first()
    # if obj:
    #    return hash_url(original_url,timestamp)
    return short_url

@app.post("/api/url_shortener")
def url_shortener(url: HttpUrl, db: Session = Depends(get_db)):
    timestamp = datetime.now().replace(tzinfo=timezone.utc).timestamp()
    short_url = hash_url(url,timestamp)
    
    short_url_obj = UrlShortenerModel(original_url=url, short_url=short_url)
    db.add(short_url_obj)
    db.commit()

    return {"short_url": short_url}

@app.get("/api/get_shortened_urls")
def get_shortened_urls(db: Session = Depends(get_db)):
    return db.query(UrlShortenerModel).all()

@app.get("/api/{short_url}")
def redirect_url(short_url: str, db: Session = Depends(get_db)):
    url_obj = db.query(UrlShortenerModel).filter_by(short_url=short_url).first()

    if not url_obj:
        raise HTTPException(status_code=404, detail="Url does not exist!!!")
    return RedirectResponse(url = url_obj.original_url)
