from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)
    address = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)
    payment_card = db.Column(db.String, nullable=False)

    reviews = db.relationship("Review", back_populates="user")
    order_history = db.relationship("OrderHistory", back_populates="user")
    cart_items = db.relationship("CartItem", back_populates="user")


class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.Float)
    discount_percentage = db.Column(db.Float)
    stock = db.Column(db.Integer)
    brand = db.Column(db.String)
    category = db.Column(db.String)
    image = db.Column(db.String)
    rating = db.Column(db.Float)

    reviews = db.relationship("Review", back_populates="product")
    cart_items = db.relationship("CartItem", back_populates="product")


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    review_body = db.Column(db.String)
    rating = db.Column(db.Float)

    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    product = db.relationship("Product", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")
