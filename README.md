# phase-5-project-final

## The E-Commerce Full-stack App

Welcome to the Online Shopping Web Application! This application allows users to browse, shop for products, manage their user profiles, interact with product reviews and more. It's built using React for the frontend and flask-sqlalchemy for the backend.

# Front-end Features

- Product Browsing: Users can explore a wide variety of products and view detailed information about each product.
- Product Details: Detailed product information, including images, descriptions, brands, categories, prices, and average ratings, are available on product detail pages.
- Adding Reviews: Authenticated users can write and post reviews for products, including providing text and rating.
- User Authentication: User authentication is implemented for user registration, login, and profile management.
- User Profile: Users can view, delete or edit their profiles, including personal details such as address and payment card information.
- Order History: Users can view their order history, listing information about past purchases.
- Shopping Cart: Users can add and remove products from their shopping carts.


# Back-end Features

- RESTful APIs: The backend exposes a set of RESTful APIs that the frontend uses for communication. These APIs include endpoints for retrieving product data, user authentication, managing user profiles, handling reviews, and managing shopping carts.
- Database: User data, product data, reviews, and shopping cart data are stored and managed in a database.
- User Authentication: User authentication is implemented using sessions and tokens, ensuring secure access to user-specific features.
- Review Management: The backend manages user reviews for products, including creation and retrieval.

# Technologies Used

  Frontend
-  HTML,CSS, Javascript and ReactJS are used to create the UI.
- React Router DOM: A routing library for React.
- FontAwesome: A library for adding icons to the application.
- Axios: A library for making HTTP requests from the frontend.

  Backend
- Python: The programming language used for the backend.
- Bcrypt: A library for hashing passwords securely.
- Flask: A micro web framework for Python.
- Flask SQLAlchemy: An extension for Flask that simplifies database operations.
- SQLite: The default database system used by Flask SQLAlchemy.

# Prerequisites
Before you begin, ensure you have the following prerequisites:
- npm: Install npm on your machine.
- Python: Install Python on your machine.
- SQLite or Another Database: Set up and configure SQLite or another database system for the backend.

# Getting Started
Clone the Repository: Clone this repository to your local machine.
- ```git clone <repository_url>```
- ```cd phase-5-project-final/```

Install Dependencies for frontend and start frontend
- ```cd client/```
- ```npm install```
- ```npm start```

Install dependencies for backend and start backend
- ```cd server/```
- ```pipenv install```
- ```flask run```

** You might have to run this command in case ```flask run``` does not work for you in one go.
- ```export FLASK_APP=config.py```

Access the Application:
- Open your web browser and navigate to http://localhost:4000 to access the application.

Explore and Use the Application:
- You can now explore products, add reviews, manage your profile, and enjoy the shopping experience!

## License

This project is licensed under MIT license. Copyright (c) 2012-2023 Scott Chacon and others

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.