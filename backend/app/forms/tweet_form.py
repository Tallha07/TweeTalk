from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, FieldList
from wtforms.validators import DataRequired, Length

class TweetForm(FlaskForm):
    content = TextAreaField(
        "content", 
        validators=[
            DataRequired(), 
            Length(10, 1000, message="Tweet must be between 10 and 1000 characters.")            
        ]         
    )
    featured_image = StringField("Feature Image", validators=[DataRequired()])
    preview_image = StringField("Preview Image", validators=[DataRequired()])
    image_urls = FieldList(
        StringField("Image URL", validators=[]),
        min_entries=1,
        label="Image URLs"
    )