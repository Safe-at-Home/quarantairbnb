import os

from flask import send_from_directory, jsonify

from quarantairbnb.app import app


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route("/api/hello")
def api_hello():
    return jsonify({"hello": "world"})
