from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, length

class CommentForm(FlaskForm):
    content = TextAreaField(
        "Comment",
        validators=[
            DataRequired(message="Comment cannot be empty."),
            length(5, 500, message="Comment must be between 1 and 500 characters.")
        ]
    )