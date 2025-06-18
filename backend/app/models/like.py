from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tweets.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    # Relationships
    user = db.relationship("User", back_populates="likes")
    tweet = db.relationship("Tweet", back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id, 
            "user_id": self.user_id, 
            "tweet_id": self.tweet_id,             
            "created_at": self.created_at.isoformat(),
        }