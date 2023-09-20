from flask import Flask, jsonify, make_response
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy  # Import SQLAlchemy
from models import Product
from config import app, db, api


class Products(Resource):
    def get(self):
        products = Product.query.all()
        product_list = [product.to_dict() for product in products]
        response_dict = {"products": product_list}
        return make_response(jsonify(response_dict), 200)


api.add_resource(Products, "/products")

if __name__ == "__main__":
    app.run(port=5555)
