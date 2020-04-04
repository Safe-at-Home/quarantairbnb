from quarantairbnb.app import app, db
from quarantairbnb import views

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
