from app.db import db
from sqlalchemy import Column, Integer, String

class User(db.Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    email = Column(String(255))
