from flask import Flask, jsonify, make_response, request, session, redirect, url_for
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_sqlalchemy import SQLAlchemy  # Import SQLAlchemy
from models import Product, User, CartItem, Review
from config import app, db, api
import bcrypt
import logging

logging.basicConfig(level=logging.DEBUG)


class Products(Resource):
    def get(self):
        products = Product.query.all()
        product_list = [product.to_dict() for product in products]
        response_dict = {"products": product_list}
        return make_response(jsonify(response_dict), 200)


api.add_resource(Products, "/products")


class Product_By_Id(Resource):
    def get(self, id):
        product_by_id = Product.query.get(id)
        if product_by_id is not None:
            product_dict = product_by_id.to_dict()
            return make_response(jsonify(product_dict), 200)
        else:
            return make_response(jsonify({"message": "product not found"}), 404)

    def delete(self, id):
        product_by_id = Product.query.get(id)
        if product_by_id:
            try:
                db.session.delete(product_by_id)
                db.session.commit()
                return make_response(
                    {"message": "The product has been deleted successfully"}, 200
                )
            except Exception as e:
                db.session.rollback()
                return make_response(
                    {"message": "Error deleting product", "error": str(e)}, 500
                )
        else:
            return make_response({"message": "Product not found"}, 404)


api.add_resource(Product_By_Id, "/products/<int:id>")


def check_for_values(data):
    errors = []
    for key, value in data.items():
        if not value:
            errors.append(f"{key} is invalid or already exists")
    return errors


class Users(Resource):
    def post(self):
        data = request.get_json()

        # Remove leading and trailing whitespaces from data values
        cleaned_data = {
            key: value.strip() if isinstance(value, str) else value
            for key, value in data.items()
        }

        errors = check_for_values(cleaned_data)
        if len(errors) > 0:
            return {"errors": errors}, 422
        try:
            # Now use cleaned_data instead of data for further processing
            first_name = cleaned_data.get("first_name")
            last_name = cleaned_data.get("last_name")
            email = cleaned_data.get("email")
            username = cleaned_data.get("username")
            password_hash = cleaned_data.get("password")
            address = cleaned_data.get("address")
            phone_number = cleaned_data.get("phone_number")
            payment_card = cleaned_data.get("payment_card")

            user = User(
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
                address=address,
                phone_number=phone_number,
                payment_card=payment_card,
            )

            user.password_hash = password_hash

            db.session.add(user)
            db.session.commit()

            return user.to_dict(), 201

        except IntegrityError as e:
            error_message = str(e)

            return {"error": error_message}, 400

        except Exception as e:
            error_message = "An error occurred while processing your request"
            return {"error": error_message}, 500

    def get(self):
        all_users = User.query.all()
        user_list = [users.to_dict() for users in all_users]
        response = {"users": user_list}
        return make_response(jsonify(response), 200)


api.add_resource(Users, "/users")


class User_By_Id(Resource):
    def get(self, id):
        user_by_id = User.query.get(id)
        if user_by_id is not None:
            user_dict = user_by_id.to_dict()
            return make_response(jsonify(user_dict), 200)
        else:
            return make_response({"message": "User not found"}, 404)

    def delete(self, id):
        user_by_id = User.query.get(id)
        if user_by_id:
            try:
                # Delete cart items associated with the user
                CartItem.query.filter_by(user_id=id).delete()

                # Delete reviews posted by the user
                # Review.query.filter_by(user_id=id).delete()

                db.session.delete(user_by_id)
                db.session.commit()
                return make_response(
                    {
                        "message": "The user, their cart items, and reviews have been deleted successfully"
                    },
                    200,
                )
            except Exception as e:
                db.session.rollback()
                return make_response(
                    {"message": "Error deleting user", "error": str(e)}, 500
                )
        else:
            return make_response({"message": "User not found"}, 404)


api.add_resource(User_By_Id, "/users/<int:id>")


class CartItems(Resource):
    def post(self, product_id):
        if not session.get("user_id"):
            return make_response(jsonify({"message": "Not logged in"}), 401)

        user_id = session["user_id"]

        product = Product.query.get(product_id)

        if product:
            new_cart_item = CartItem(user_id=user_id, product_id=product_id, quantity=1)

            db.session.add(new_cart_item)
            db.session.commit()

            return make_response(jsonify({"message": "Product added to cart"}), 201)
        else:
            return make_response(jsonify({"message": "Product not found"}), 404)


api.add_resource(CartItems, "/cart/items/<int:product_id>")


class UserCart(Resource):
    def get(self):
        if not session.get("user_id"):
            return make_response(jsonify({"message": "Not logged in"}), 401)

        user_id = session["user_id"]

        cart_items = CartItem.query.filter_by(user_id=user_id).all()
        cart_items_list = [item.to_dict() for item in cart_items]

        response = {"cart_items": cart_items_list}
        return make_response(jsonify(response), 200)


api.add_resource(UserCart, "/cart/user")


class CartItemById(Resource):
    def delete(self, cart_item_id):
        if not session.get("user_id"):
            return make_response(jsonify({"message": "Not logged in"}), 401)

        user_id = session["user_id"]

        cart_item = CartItem.query.filter_by(id=cart_item_id, user_id=user_id).first()

        if cart_item:
            try:
                db.session.delete(cart_item)
                db.session.commit()
                return make_response(
                    {"message": "The cart item has been deleted successfully"}, 200
                )
            except Exception as e:
                db.session.rollback()
                return make_response(
                    {"message": "Error deleting cart item", "error": str(e)}, 500
                )
        else:
            return make_response({"message": "Cart item not found"}, 404)


api.add_resource(CartItemById, "/cart/items/<int:cart_item_id>")


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        session["user_id"] = user.id
        return user.to_dict(), 200
    else:
        return {"errors": ["username or password incorrect"]}, 401


@app.route("/logout", methods=["GET"])
def logout():
    session.clear()
    return jsonify(message="Logout successful"), 200


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter_by(id=user_id).first()
            if user:
                return user.to_dict(), 200
            else:
                return {"message": "User not found"}, 404
        else:
            return {"message": "Not logged in"}, 401


api.add_resource(CheckSession, "/check_session")


if __name__ == "__main__":
    app.run(port=5555)
