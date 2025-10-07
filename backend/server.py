from flask import Flask
from flask_cors import CORS
from routes.gemini_routes import gemini_bp

app = Flask(__name__)
CORS(app)

# register blueprint (routes)
app.register_blueprint(gemini_bp)

@app.route("/")
def home():
    return {"message": "Lost-Item Finder Backend Running!"}

if __name__ == "__main__":
    app.run(debug=True)
