// script.js

// 1) Mobile Navigation Toggle (Optional)
// This snippet toggles a "mobile menu" when screen size is small.
// You’d pair this with a hamburger icon in your HTML/CSS.

const fireCheckForm = document.getElementById('fireCheckForm');
const resultBox = document.getElementById('result-box');

if (fireCheckForm) {
  fireCheckForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear old result
    resultBox.textContent = '';

    // Grab file from input
    const fileInput = document.getElementById('imageFile');
    if (!fileInput.files[0]) {
      alert('Please select an image first!');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('imageFile', fileInput.files[0]);

    try {
      // POST to the Flask backend (we'll define /upload in app.py)
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Suppose server returns JSON: { fireDetected: boolean, confidence: float }
      const data = await response.json();
      const { fireDetected, confidence } = data;

      if (fireDetected) {
        resultBox.textContent = `FIRE detected with ${(confidence * 100).toFixed(1)}% confidence.`;
        resultBox.style.color = 'red';
      } else {
        resultBox.textContent = `No fire detected. Confidence: ${(confidence * 100).toFixed(1)}%`;
        resultBox.style.color = 'green';
      }
    } catch (err) {
      console.error('Detection Error:', err);
      resultBox.textContent = 'Error while detecting fire. Please try again.';
      resultBox.style.color = 'red';
    }
  });
}


// 2) Placeholder: Fetch Fire Detection Data from Backend (Optional)
// Suppose you have an API endpoint that returns fire detection results.
// This is how you might call it.

async function checkFireStatus() {
  try {
    const response = await fetch('/api/fire-detection'); // Example endpoint
    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }
    const data = await response.json();

    // data might look like { hasFire: true, confidence: 95 }
    if (data.hasFire) {
      alert(`Fire detected with ${data.confidence}% confidence!`);
    } else {
      alert('No fire detected.');
    }
  } catch (error) {
    console.error('Error checking fire status:', error);
  }
}

// 3) Example Form Submission Handler (Optional)
// If you have a contact form with an ID "contactForm"

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);

    // Example of sending data to backend via fetch
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        contactForm.reset();
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Network error. Please try again later.');
    }
  });
}
