from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_only = (
        "reviews.review_body",
        "reviews.rating",
        "order_history.id",
        "cart_items.id",
        "first_name",
        "last_name",
        "address",
        "payment_card",
        "id",
        "email",
        "username",
        "phone_number",
    )

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

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"

    @validates("phone_number")
    def validate_phone_number(self, key, phone_number):
        if len(phone_number) != 10:
            raise ValueError("Please enter a valid phone number")
        existing_user = User.query.filter_by(phone_number=phone_number).first()
        if existing_user and existing_user.id != self.id:
            raise ValueError("The phone number already exists")

        return phone_number

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)


class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    serialize_rules = (
        "-reviews.product",
        "-order_history.product",
        "-cart_items.product",
    )

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
    order_history = db.relationship("OrderHistory", back_populates="product")

    def __repr__(self):
        return f"<Product(id={self.id}, title='{self.title}')>"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    serialize_rules = (
        "-product.reviews",
        "-user.reviews",
        "user.username",
    )

    id = db.Column(db.Integer, primary_key=True)
    review_body = db.Column(db.String)
    rating = db.Column(db.Float)

    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    product = db.relationship("Product", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    def __repr__(self):
        return f"<Review(id={self.id}, rating={self.rating})>"


class OrderHistory(db.Model, SerializerMixin):
    __tablename__ = "order_history"

    serialize_rules = (
        "-user.order_history",
        "-product.order_history",
    )

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    order_status = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)

    user = db.relationship("User", back_populates="order_history")
    product = db.relationship("Product", back_populates="order_history")

    def __repr__(self):
        return f"<OrderHistory(id={self.id}, item_name='{self.item_name}')>"


class CartItem(db.Model, SerializerMixin):
    __tablename__ = "cart_items"

    serialize_rules = (
        "-user.cart_items",
        "-product.cart_items",
    )

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    product = db.relationship("Product", back_populates="cart_items")
    user = db.relationship("User", back_populates="cart_items")

    def __repr__(self):
        return f"<CartItem(id={self.id}>"
