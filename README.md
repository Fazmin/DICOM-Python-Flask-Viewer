# Flask DICOM Viewer

## Overview

This is a basic Flask implementation for a DICOM image viewer – a web application created using Flask to view DICOM (Digital Imaging and Communications in Medicine) files. The application enables users to upload DICOM files, view image thumbnails, and then see a larger version of these images with zoom-in and zoom-out capabilities.

## Features

- Upload multiple DICOM files.
- View thumbnails of the uploaded DICOM images.
- Click on a thumbnail to view a larger version of the image.
- Zoom in and out of the larger image.

## Installation

Before running the application, ensure you have Python installed on your system. Then, follow these steps:

1. Clone the repository:
   ```
   git clone [repository URL]
   ```
2. Navigate to the project directory:
   ```
   cd <directory>
   ```
3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Running the Application

1. Start the Flask application:
   ```
   python app.py
   ```
2. Open a web browser and navigate to `http://127.0.0.1:5000/`.

## Usage

1. Click the "Upload" button and select one or more DICOM files to upload.
2. View the thumbnails of the uploaded images.
3. Click on any thumbnail to view the larger image on the right.
4. Use the slider below the image to zoom in and out.

## Dependencies

- Flask
- pydicom
- Pillow
