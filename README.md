# 🔍 Lost Item Finder

**Lost Item Finder** is an AI-powered web application that helps users estimate where they might find misplaced items by analyzing what was lost, the item description, and recent movement history.
Instead of randomly searching everywhere, the system provides **probability-based location suggestions**, helping users recover items faster and with less stress.

This project demonstrates how **AI reasoning can be integrated into real-world web applications** to solve everyday problems.

---

## 🚀 Features

* 🧳 **Item Identification** — Users specify what they have lost (phone, wallet, keys, etc.)
* 📝 **Item Description Input** — Color, size, or unique characteristics improve prediction accuracy
* 📍 **Recent Location Tracking (Manual Input)** — Users enter places visited in the last few minutes
* 🤖 **AI-Based Reasoning** — Gemini analyzes context and common loss patterns
* 📊 **Probability Predictions** — Displays likely locations with percentage chances
* 🎨 **Clean Multi-Step UI** — Simple, guided, user-friendly experience

---

## 🛠️ Tech Stack

| Layer      | Tech Used                     |
| ---------- | ----------------------------- |
| Frontend   | React, Tailwind CSS           |
| Backend    | Flask (Python REST API)       |
| AI & LLM   | Google Gemini API             |
| Logic      | Prompt-based reasoning model  |
| Data Input | User-provided contextual data |

---

## ⚙️ Installation & Setup

Follow the steps below to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/devrishavD/Lost-item-finder.git
cd Lost-item-finder
```

---

### 2️⃣ Create a Virtual Environment (Recommended)

```bash
python -m venv venv
venv\Scripts\activate
```

---

### 3️⃣ Install Required Dependencies

```bash
pip install -r requirements.txt
```

---

### 4️⃣ Run the Flask Application

```bash
python app.py
```

The server will start on:

```
http://127.0.0.1:5000/
```

---

## 👩‍💻 Authors

*Rishav Dam* 

*Ritosri Saha* 

