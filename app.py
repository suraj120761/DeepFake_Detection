import os
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS

# Configure maximum upload size (e.g., 100 MB)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load your saved model
model = load_model('finalmodel.h5')

# Data augmentation function (mirroring training)
def augment_frame(frame):
    """Apply random augmentations to a frame."""
    if np.random.rand() > 0.5:
        frame = cv2.flip(frame, 1)  # Random horizontal flip
    angle = np.random.uniform(-15, 15)  # Random rotation angle
    center = (frame.shape[1] // 2, frame.shape[0] // 2)
    matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
    frame = cv2.warpAffine(frame, matrix, (frame.shape[1], frame.shape[0]))
    return frame

# Preprocessing function for the uploaded video with augmentation
def preprocess_video(video_path, sequence_length=20, img_height=128, img_width=128):
    """Extract and preprocess frames from the video file."""
    cap = cv2.VideoCapture(video_path)
    frames = []

    while len(frames) < sequence_length:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, (img_width, img_height))  # Resize frame
        frame = augment_frame(frame)  # Apply augmentation
        frames.append(frame)
    
    cap.release()
    
    # Pad with zeros if fewer frames than sequence length
    while len(frames) < sequence_length:
        frames.append(np.zeros((img_height, img_width, 3), dtype=np.uint8))

    frames = np.array(frames)
    return frames

@app.route('/predict', methods=['POST'])
def predict():
    """Handle video file upload and perform prediction."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})

    video_file = request.files['file']

    if video_file.filename == '':
        return jsonify({'error': 'No selected file'})

    video_path = os.path.join('uploads', video_file.filename)

    try:
        video_file.save(video_path)
    except Exception as e:
        logging.error("Error saving file: %s", str(e))
        return jsonify({'error': 'Error saving file'})

    try:
        video_data = preprocess_video(video_path)
        video_data = np.expand_dims(video_data, axis=0)

        # Log the shape and sample data
        logging.debug("Video data shape: %s", video_data.shape)
        logging.debug("Sample video data: %s", video_data[0, :, :, :3])  # Log first frame sample

        prediction = model.predict(video_data)
        logging.debug("Raw prediction values: %s", prediction)

        label = np.argmax(prediction, axis=1)[0]
        prediction_values = prediction[0]

        result = 'FAKE' if label == 1 else 'REAL'
    except Exception as e:
        logging.error("Error during prediction: %s", str(e))
        result = f'Error: {str(e)}'
        prediction_values = None

    try:
        os.remove(video_path)
    except Exception as e:
        logging.error("Error deleting file: %s", str(e))
    
    return jsonify({
        'prediction': result,
        'suraj': prediction.tolist() if prediction is not None else None,
        'prediction_values': prediction_values.tolist() if prediction_values is not None else None
    })

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5005)
