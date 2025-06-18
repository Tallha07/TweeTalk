from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(user_id=2, tweet_id=1, content="why don't you get a wife first")
    comment2 = Comment(user_id=3, tweet_id=1, content="make sure you dont get lost in the tiny streets of Greece")
    comment3 = Comment(user_id=1, tweet_id=2, content="that ride aint got none on Ant")

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    
    if environment == "production":
        
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    
    else:
        
        db.session.execute(text("DELETE FROM comments"))
    
    db.session.commit()
