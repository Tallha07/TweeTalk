from .db import add_prefix_for_prod, db, environment, SCHEMA
from datetime import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tweets.id")), nullable=False)
    content =db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

#relationships

    user = db.relationship("User", back_populates="comments")
    tweet = db.relationship("Tweet", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tweet_id": self.tweet_id,
            "content": self.content, 
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
    }
