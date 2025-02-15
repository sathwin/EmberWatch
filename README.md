# EmberWatch

**EmberWatch** is an AI-powered wildfire detection system designed to automatically classify images as "fire" or "no fire." The project leverages a custom Convolutional Neural Network (CNN) built from scratch with TensorFlow, and it is deployed as a web application using Flask. The frontend allows users to upload an image and view the detection result in real time.

## Table of Contents

- [Features](#features)
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technical Details](#technical-details)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- **Wildfire Detection:** Classify images into two classes: fire vs. no fire.
- **Custom CNN Model:** Built from scratch using TensorFlow.
- **User-friendly Web Interface:** Upload an image and receive a prediction with confidence.
- **Visualization:** Training and validation curves can be plotted to analyze model performance.
- **Deployment Ready:** Backend powered by Flask and served using Gunicorn.

## Project Overview

Wildfires pose a serious threat to life, property, and the environment. EmberWatch aims to provide early detection through automated image analysis. The system processes images from sources such as drones or satellites and classifies them as either containing fire or not. The project includes:

- A data preprocessing pipeline that resizes and normalizes images.
- A CNN architecture with three convolutional layers, followed by a dense network for binary classification.
- A Flask web application that integrates the trained model to process uploaded images and return detection results.

## Architecture

The CNN model consists of:
- **Input Layer:** Accepts images resized to 128×128 pixels with 3 color channels.
- **Convolutional Layers:** Three convolutional layers with increasing filter counts (16, 32, 64) and ReLU activations, each followed by a MaxPooling layer.
- **Flatten Layer:** Converts feature maps into a one-dimensional vector.
- **Dense Layers:** One hidden dense layer (64 units, ReLU activation) followed by a single neuron with sigmoid activation for binary classification.

The model is compiled with the Adam optimizer and binary crossentropy loss.

## Installation

### Prerequisites

- Python 3.11 (or compatible version)
- [Virtualenv](https://docs.python.org/3/library/venv.html) (optional but recommended)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sathwin/EmberWatch.git
   cd EmberWatch
