from flask import Flask
from flask_cors import CORS
from routes.gemini_routes import gemini_bp
from routes.describe_routes import describe_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(gemini_bp)
app.register_blueprint(describe_bp)

@app.route("/")
def home():
    return {"message": "Lost-Item Finder Backend Running!"}

if __name__ == "__main__":
    app.run(debug=True)
