import requests
from PIL import Image
from io import BytesIO
from pytesseract import pytesseract

path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_url = ""

response = requests.get(image_url)
response.raise_for_status()

img = Image.open(BytesIO(response.content))


pytesseract.tesseract_cmd = path_to_tesseract

text = pytesseract.image_to_string(img)

print(text.strip())
