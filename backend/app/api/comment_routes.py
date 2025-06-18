from flask import Blueprint, request, jsonify
from app.models import Comment, db
from flask_login import login_required, current_user


comment_routes = Blueprint("comment", __name__, url_prefix="/comments")

#create a comment

@comment_routes.route("/tweet_id", method=["POST"])
@login_required
def post_comment(tweet_id):
    data = request.get_json()
    user_id = data.get("user_id")
    content = data.get("content")

    new_comment = Comment(user_id=user_id, tweet_id=tweet_id, content=content)
    db.session.add(new_comment)
    db.session.commit()


# get all comments

@comment_routes.route("/tweet_id", method=["GET"])
def comments(tweets_id):
    comments = Comment.query.filter(Comment.tweets_id == tweets_id).all()
    return jsonify([comment.to_dict() for comment in comments])

#update a comment

@comment_routes.route("/comment_id", method=["PUT"])
@login_required
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({"error": "Comment Not Found"})
    
    if comment.user_id != current_user.id:
        return jsonify({"error": "Cannot edit a comment you did not leave"}), 404
    

    if not isinstance(data["comment"], str) or data["comment"] == "" or len(data["comment"]) > 1000:
        return jsonify({"error": "Comment must be at least 1 character and less than 1000 characters"}), 400
    
    data = request.get_json()
    comment.content = data.get("content", comment.content)
    db.session.commit()

#delete a comment 

@comment_routes.route("/<comment_id", method=["DELETE"])
@login_required
def delete_comment(comment_id):
    comment = comment.query.get(comment_id)

    if not comment:
        return jsonify({"error": "Comment Not Found"}), 401
    
    if comment.user_id != current_user.id:
        return jsonify({"error": "Cannot delete a comment you did not leave"}), 402
    
    db.session.delete(comment)
    db.session.commit

    return jsonify({"message": "Successfully deleted"})