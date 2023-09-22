from flask import Flask, jsonify, make_response, request
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy  # Import SQLAlchemy
from models import Product, User
from config import app, db, api


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


class Users(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            username=data["username"],
            _password_hash=data["_password_hash"],
            address=data["address"],
            phone_number=data["phone_number"],
            payment_card=data["payment_card"],
        )

        db.session.add(new_user)
        db.session.commit()

        new_user_dict = new_user.to_dict()

        response = make_response(jsonify(new_user_dict), 201)
        return response

    def get(self):
        all_users = User.query.all()
        user_list = [users.to_dict() for users in all_users]
        response = {"users": user_list}
        return make_response(jsonify(response), 200)


api.add_resource(Users, "/users")


class User_By_Id(Resource):
    def get(self, id):
        user_by_id = User.query.get(id)  # Use query.get to get a user by ID
        if user_by_id is not None:
            user_dict = user_by_id.to_dict()
            return make_response(jsonify(user_dict), 200)
        else:
            return make_response({"message": "User not found"}, 404)

    def delete(self, id):
        user_by_id = User.query.get(id)
        if user_by_id:
            try:
                db.session.delete(user_by_id)
                db.session.commit()
                return make_response(
                    {"message": "The user has been deleted successfully"}, 200
                )
            except Exception as e:
                db.session.rollback()
                return make_response(
                    {"message": "Error deleting user", "error": str(e)}, 500
                )
        else:
            return make_response({"message": "User not found"}, 404)


api.add_resource(User_By_Id, "/users/<int:id>")


if __name__ == "__main__":
    app.run(port=5555)
