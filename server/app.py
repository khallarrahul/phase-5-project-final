from flask import Flask, make_response, jsonify


app = Flask(__name__)


@app.route("/members")
def movies():
    response_dict = {"text": "Movies will go here"}

    return make_response(jsonify(response_dict), 200)


if __name__ == "__main__":
    app.run(port=5555)
