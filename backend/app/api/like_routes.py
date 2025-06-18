from flask  import Blueprint, request, jsonify
from app.models import Like, db
from flask_login import login_required, current_user


like_routes = Blueprint("Like", __name__, url_prefix="/likes")

# create a like 

@like_routes.route("/", method=["POST"])
@login_required
def create_like():
    data = request.get_json()
    user_id = data.get("user_id")
    tweet_id = data.get("tweet_id")

    new_like = Like(user_id=user_id, tweet_id=tweet_id)
    db.session.add(new_like)
    db.session.commit()
    return jsonify(new_like.to_dict()), 202

# get all likes for a tweet

@like_routes.route("/tweet_id", method=["GET"])
def get_likes(tweet_id):
    likes = Like.query.filter(tweet_id=tweet_id.all())
    return jsonify([like.to_dict() for like in likes])

# delete a like

@like_routes.route("/tweet_id", method=["DELETE"])
@login_required
def delete_like(like_id):
    like= Like.query.get(like_id)
    
    if like.user_id != current_user.id:
        return jsonify({"error": "Cannot like a tweet you did not leave"}), 402
    db.session.delete(like)
    db.session.commit()
    return jsonify({"message": "Like removed"})