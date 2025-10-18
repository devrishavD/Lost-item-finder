from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os
import json
import re

gemini_bp = Blueprint("gemini_bp", __name__)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@gemini_bp.route("/api/analyze", methods=["POST", "OPTIONS"])
def analyze_data():
    # Handle CORS preflight request
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight OK"}), 200

    data = request.get_json()
    description = data.get("description", {})
    locations = data.get("locations", [])
    item_type = data.get("itemType")

    # ✅ Fallback to file if frontend didn’t send it
    if not item_type and os.path.exists("temp_item_data.json"):
        try:
            with open("temp_item_data.json", "r") as f:
                saved_data = json.load(f)
                item_type = saved_data.get("itemType", "unknown item")
        except Exception as e:
            print("⚠️ Could not load saved item type:", e)
            item_type = "unknown item"
    else:
        item_type = item_type or "unknown item"

    print("📦 Description:", description)
    print("📍 Locations:", locations)
    print("🎯 Item Type:", item_type)

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")

        color = description.get("color", "unknown")
        brand = description.get("brand", "unknown")
        distinctive = (
            description.get("distinctiveMarks")
            or description.get("distinctive")
            or "none"
        )
        locs = ", ".join(locations) if locations else "unknown"

        prompt = f"""
        You are an expert assistant that predicts where a person most likely misplaced their item.

        🧩 Context:
        The user lost a personal item and has given its description and possible last-seen locations.

        🎯 Your goal:
        Rank the possible locations where the item is most likely to be found.
        Use realistic reasoning — no fictional or made-up places. The probabilities should total roughly 100.

        📘 Details:
        Item Type: {item_type}
        Color: {color}
        Brand: {brand}
        Distinctive Marks: {distinctive}

        🏠 Possible Locations: {locs}

        ⚙️ Instructions:
        - Only consider locations provided by the user — don’t invent new ones.
        - Base reasoning on the item type and human behavior (where such an item is commonly lost).
        - Respond **only** with a JSON array (no markdown, no prose).
        - Each object in the array should have:
        {{
            "name": "<one of the given locations>",
            "reason": "<1 short, natural line>",
            "probability": <integer 1–100>
        }}

        Example response:
        [
        {{
            "name": "Bedroom",
            "reason": "Usually placed on a bedside table before sleeping.",
            "probability": 60
        }},
        {{
            "name": "Living Room",
            "reason": "Could have fallen off the couch while relaxing.",
            "probability": 40
        }}
        ]
        """


        response = model.generate_content(prompt)
        text = response.text.strip()
        print("🧠 Gemini raw response:", text)

        # --- Extract only the JSON array ---
        json_match = re.search(r"\[.*\]", text, re.DOTALL)
        if not json_match:
            print("⚠️ No valid JSON array found.")
            return jsonify({"success": False, "error": "Invalid AI response."}), 500

        json_text = json_match.group(0)
        suggestions = json.loads(json_text)

        # ✅ Ensure valid array structure
        if not isinstance(suggestions, list) or not all("name" in loc for loc in suggestions):
            print("⚠️ Invalid JSON structure:", suggestions)
            return jsonify({"success": False, "error": "Malformed AI JSON."}), 500

        return jsonify({"success": True, "suggestedLocations": suggestions})

    except Exception as e:
        print("❌ Error during analysis:", e)
        return jsonify({"success": False, "error": str(e)}), 500
