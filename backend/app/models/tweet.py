from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Tweet(db.Model):
    __tablename__ = "tweets"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #relationships
    user = db.relationship("User", back_populates="tweets")
    comments = db.relationship("Comment", back_populates="tweet")
    likes = db.relationship("Like", back_populates="tweet")
    images = db.relationship("Image", back_populates="tweet")


    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id, 
            "content": self.content, 
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            }