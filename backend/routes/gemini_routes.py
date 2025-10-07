from flask import Blueprint, request, jsonify
from services.gemini_service import analyze_image

gemini_bp = Blueprint("gemini", __name__)

@gemini_bp.route("/analyze", methods=["POST"])
def analyze():
    image = request.files.get("image")
    user_context = request.form.get("context", "")

    if not image:
        return jsonify({"error": "No image provided"}), 400

    try:
        result = analyze_image(image, user_context)
        return jsonify({"suggestion": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
