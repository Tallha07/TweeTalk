from app.models import db, Tweet, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tweets():
    tweet1 = Tweet(user_id=1, content="This looks like a place i'd want to take my wife for our honeymoon")
    tweet2 = Tweet(user_id=2, content="You think you're hard until you sit on this ride")
    tweet3 = Tweet(user_id=3, content="NY pizza > Chi pizza anyday")

    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.commit()


def undo_tweets():

    if environment == "production":
            
        db.session.execute(f"TRUNCATE table {SCHEMA}.tweets RESTART INDENTITY CASCADE;")
    
    else:
            
        db.session.execute(text("DELETE FROM tweets"))
            
    db.session.commit()

