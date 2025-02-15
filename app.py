import os
from flask import Flask, request, jsonify, send_from_directory
from PIL import Image
import numpy as np
import tensorflow as tf

# Create Flask app
# static_folder='static' => The folder we store static files
# static_url_path='/static' => They will be served at domain.com/static/...
app = Flask(__name__, static_folder='static', static_url_path='/static')

# Load your trained TensorFlow model
model = tf.keras.models.load_model("wildfire_cnn_model.h5")

@app.route('/')
def serve_index():
    """
    Serve 'index.html' from the 'static' folder at the root URL.
    So when you visit http://127.0.0.1:5000/ you get the homepage.
    """
    return send_from_directory('static', 'index.html')

@app.route('/upload', methods=['POST'])
def upload():
    """
    Receive the uploaded image from the front-end, run model prediction,
    and return JSON with fireDetected + confidence.
    """
    # Check if file is present
    if 'imageFile' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['imageFile']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Preprocess the image for the model
    img = Image.open(file.stream).convert('RGB')
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # shape (1, 128,128,3)

    # Model prediction
    prediction = model.predict(img_array)[0][0]  # single float
    fire_detected = bool(prediction > 0.5)
    # Confidence: if it's above 0.5, that's how sure we are it's fire;
    # otherwise it's the complement for "no fire"
    confidence = float(prediction if fire_detected else (1 - prediction))

    return jsonify({
        "fireDetected": fire_detected,
        "confidence": confidence
    })

if __name__ == "__main__":
    # For local dev: python app.py
    app.run(debug=True, port=5000)
