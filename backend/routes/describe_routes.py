from flask import Blueprint, request, jsonify
import json
import os

describe_bp = Blueprint('describe_bp', __name__)

# Temporary in-memory store (for simplicity)
# You can later replace this with a database or session-based storage
TEMP_FILE = "temp_item_data.json"

@describe_bp.route('/api/describe', methods=['POST'])
def describe_item():
    data = request.get_json()

    color = data.get('color')
    brand = data.get('brand')
    distinctive = data.get('distinctive')
    item_type = data.get('itemType', 'unknown item')  # ✅ now capturing item type

    print("📝 Received item description:")
    print(f"Color: {color}, Brand: {brand}, Distinctive: {distinctive}, Type: {item_type}")

    # Save temporarily so /api/analyze can read it later if needed
    try:
        item_data = {
            "color": color,
            "brand": brand,
            "distinctive": distinctive,
            "itemType": item_type
        }
        with open(TEMP_FILE, "w") as f:
            json.dump(item_data, f)
    except Exception as e:
        print("⚠️ Error saving item data:", e)

    return jsonify({
        "success": True,
        "message": "Item description and type saved successfully!"
    }), 200
