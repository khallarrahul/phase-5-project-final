from flask import Flask, make_response, jsonify


# Create a function to create and configure the Flask app
def create_app():
    app = Flask(__name__)

    # Define a route for "/members"
    @app.route("/members")
    def movies():
        response_dict = {"text": "Movies will go here"}
        return make_response(jsonify(response_dict), 200)

    return app


# Check if the script is executed directly (not imported)
if __name__ == "__main__":
    # Create the Flask app using the create_app function
    app = create_app()

    # Run the app on port 5555
    app.run(port=5555)
