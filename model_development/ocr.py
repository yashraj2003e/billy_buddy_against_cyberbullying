import requests
from PIL import Image
from io import BytesIO
from pytesseract import pytesseract
from flask import Flask, request, jsonify
import joblib
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

nltk.download("punkt")
nltk.download("stopwords")

app = Flask(__name__)

path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.tesseract_cmd = path_to_tesseract

vectorizer = joblib.load("vectorizer.pkl")
classifier = joblib.load("classifier.pkl")


def clean_text(text):
    text = re.sub("<.*?>", "", text)
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"@\S+", "", text)
    text = re.sub(r"#\S+", "", text)

    words = nltk.word_tokenize(text)
    words = [w for w in words if w not in stopwords.words("english")]

    stemmer = PorterStemmer()
    words = [stemmer.stem(w) for w in words]

    text = " ".join(words)
    return text


@app.route("/detectCrime", methods=["POST"])
def detect_cyberbullying():
    data = request.json
    image_url = data.get("image")
    print(image_url)
    if not image_url:
        return jsonify({"error": "No image URL provided"}), 400

    try:
        response = requests.get(image_url)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        text = pytesseract.image_to_string(img).strip()
        print(text)

        cleaned_text = text
        vectorized_text = vectorizer.transform([cleaned_text])

        prediction = classifier.predict(vectorized_text)

        return jsonify({"text": text, "cyberbullying": bool(prediction[0])})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=3001)
