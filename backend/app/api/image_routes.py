from flask import Blueprint, request, jsonify
from app.models import Image, db
from flask_login import login_required, current_user



image_routes = Blueprint("image", __name__, url_prefix="/images")

# get all images on a tweet
@image_routes.route("/tweet/<tweet_id>", methods=["GET"])
def images(tweet_id: int):

    images = Image.query.filter(Image.tweet_id == tweet_id).all()
    return jsonify([image.to_dict() for image in images])


# add an image to a tweet


@image_routes.route("/tweet/<tweet_id>", methods=["POST"])
@login_required
def add_image(tweet_id):
    data = request.get_json()
    user_id = data.get("user_id")
    tweet_id = data.get("tweet_id")
    image_url = data.get("url")

    if not image_url:
        return jsonify({"error": "Image URL is required"}), 404

    new_image = Image(user_id=user_id, tweet_id=tweet_id, image_url=image_url)
    db.session.add(new_image)
    db.session.commit()

    return jsonify(new_image.to_dict()), 201


# delete an image


@image_routes.route("/<image_id>", methods=["DELETE"])
@login_required
def delete_image(image_id):
    image = Image.query.get(image_id)

    if not image:
        return jsonify({"error": "Image not found"}), 404

    if image.owner_id != current_user.id:
        return {"error": {"message": "unauthorized"}}, 404

    db.session.delete(image)
    db.session.commit()

    return jsonify({"message": "Image deleted successfully"})