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


api.add_resource(Users, "/users")

if __name__ == "__main__":
    app.run(port=5555)
