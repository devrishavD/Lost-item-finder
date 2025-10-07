import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_image(image_file, context_text):
    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = f"User context: {context_text}\nBased on the photo, suggest possible places where this item might have been lost."

    result = model.generate_content([prompt, image_file])
    return result.text
