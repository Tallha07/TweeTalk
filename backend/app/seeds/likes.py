from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    like1 = Like(user_id=1, tweet_id=3)
    like2 = Like(user_id=2, tweet_id=2)
    like3 = Like(user_id=3, tweet_id=2)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.commit()

def undo_likes():
    
    if environment == "production":
        
        db.session.execute(f"TRUNCATE table {SCHEMA}.tweets RESTART IDENTITY CASCADE;")
    
    else:
        
        db.session.execute(text("DELETE FROM likes"))
    
    db.session.commit()

