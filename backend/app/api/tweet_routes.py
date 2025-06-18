from flask import Blueprint, request, jsonify
from app.models import Tweet, db
from flask_login import login_required, current_user

tweet_routes = Blueprint("Tweet", __name__, url_prefix="/tweets")

# create a tweet

@tweet_routes.routes("/", method=["POST"])
@login_required
def create_tweet():
    data = request.get_json()
    user_id = data.get("user_id")
    content = data.get("content")
    image_url = data.get("image_url")

    new_tweet = Tweet(user_id=user_id, content=content, image_url=image_url)
    db.session.add(new_tweet)
    db.session.commit()

    return jsonify(new_tweet.to_dict()), 202

# get all the tweets

@tweet_routes.route("/tweet_id", method=["GET"])
def get_all_tweets():
    tweets = Tweet.query.order_by(Tweet.id.desc()).all()
    return jsonify([tweet.to_dict() for tweet in tweets])

# edit a tweet

@tweet_routes.route("/tweet_id", method=["PUT"])
@login_required
def edit_tweet(tweet_id):
    tweet = Tweet.query.get(tweet_id)

    if not tweet:
        return jsonify({"error": "Tweet not Found"}), 404
    
    if tweet.user_id != current_user.id:
        return jsonify({"error": "Cannot edit a tweet you did not leave"}), 402
    
    data = request.get_json()
    tweet.content = data.get("content")
    tweet.image_url = data.get("image_url")
    db.session.commit()

    return jsonify(tweet.to_dict())

# delete a tweet

@tweet_routes.route("/tweet_id", method=["DELETE"])
@login_required
def delete_tweet(tweet_id):
    tweet = Tweet.query.get(tweet_id)

    if not tweet:
        return jsonify({"error": "Tweet Not Found"}), 401
    
    if tweet.user_id != current_user.id:
        return jsonify({"error": "Cannot delete a tweet you did not leave"}), 402
    
    db.session.delete(tweet)
    db.session.commit()
    return jsonify({"message": "Tweet Deleted Successfully"})