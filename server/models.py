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
    serialize_rules = ("-password_hash",)

    reviews = db.relationship("Review", back_populates="user")
    order_history = db.relationship("OrderHistory", back_populates="user")
    cart_items = db.relationship("CartItem", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"


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
    serialize_rules = ("-reviews",)

    reviews = db.relationship("Review", back_populates="product")
    cart_items = db.relationship("CartItem", back_populates="product")

    def __repr__(self):
        return f"<Product(id={self.id}, title='{self.title}')>"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    review_body = db.Column(db.String)
    rating = db.Column(db.Float)
    serialize_rules = ("-user_id",)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    product = db.relationship("Product", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    def __repr__(self):
        return f"<Review(id={self.id}, rating={self.rating})>"


class OrderHistory(db.Model, SerializerMixin):
    __tablename__ = "order_history"
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String)
    item_price = db.Column(db.Float)
    quantity = db.Column(db.Integer)
    order_date = db.Column(db.DateTime, onupdate=db.func.now())
    order_status = db.Column(db.Boolean)
    serialize_rules = ("-user_id",)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="order_history")

    def __repr__(self):
        return f"<OrderHistory(id={self.id}, item_name='{self.item_name}')>"


class CartItem(db.Model, SerializerMixin):
    __tablename__ = "cart_items"
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    item_price = db.Column(db.Float)
    item_name = db.Column(db.String)
    image = db.Column(db.String)
    serialize_rules = ("-user_id", "-product_id")
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    product = db.relationship("Product", back_populates="cart_items")
    user = db.relationship("User", back_populates="cart_items")

    def __repr__(self):
        return f"<CartItem(id={self.id}, item_name='{self.item_name}')>"
