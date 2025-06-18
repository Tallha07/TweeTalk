from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    image1 = Image(user_id=1, tweet_id=1, image_url="https://www.zicasso.com/static/f0a152d1bc93dc1a7b2fd97679e949b2/304cc/f0a152d1bc93dc1a7b2fd97679e949b2.jpg")
    image2 = Image(user_id=2, tweet_id=2, image_url="https://i.ytimg.com/vi/Jxv4EUl3vdc/maxresdefault.jpg")
    image3 = Image(user_id=3, tweet_id=3, image_url="https://d1faxni2kverf5.cloudfront.net/forumimgs/Kingwood276435399524.jpg")

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()


def undo_images():

    if environment == "production":

        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")

    else:
        
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()