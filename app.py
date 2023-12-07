from flask import Flask, render_template, request, jsonify
import pydicom
from pydicom.filebase import DicomBytesIO
from PIL import Image
import base64
from io import BytesIO

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_files():
    uploaded_files = request.files.getlist("file")
    image_data_list = []

    for file in uploaded_files:
        dcm_data = DicomBytesIO(file.read())
        dataset = pydicom.dcmread(dcm_data)

        # Process image data and create thumbnails
        image_data = dataset.pixel_array
        image = Image.fromarray(image_data).convert('RGBA')
        thumbnail = image.resize((100, 100))  # Creating a thumbnail
        buffered_thumb = BytesIO()
        thumbnail.save(buffered_thumb, format="PNG")
        encoded_thumbnail = base64.b64encode(buffered_thumb.getvalue()).decode()

        # Save original image for display
        buffered_image = BytesIO()
        image.save(buffered_image, format="PNG")
        encoded_image = base64.b64encode(buffered_image.getvalue()).decode()

        image_data_list.append({'thumbnail': encoded_thumbnail, 'image': encoded_image})

    return jsonify(image_data_list)

if __name__ == '__main__':
    app.run(debug=True)

