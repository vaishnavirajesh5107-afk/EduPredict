# 🎓 EduPredict – AI-Based Student Performance Prediction System

EduPredict is an AI-based web application that predicts a student's academic performance using Machine Learning.

The system analyzes important academic parameters such as study hours, attendance, previous marks, internal marks, and assignment completion to predict the student's performance level.

## 🎯 Objective

The main objective of EduPredict is to help identify a student's expected performance and provide useful recommendations for improvement.

## 🤖 Machine Learning

- Algorithm: Random Forest Classifier
- Training/Test Split: 80/20
- Model Accuracy: 81.67%
- Prediction Categories:
  - Excellent
  - Good
  - Average
  - Needs Improvement

## 📊 Input Parameters

The system uses five academic parameters:

1. Study Hours
2. Attendance
3. Previous Mark
4. Internal Mark
5. Assignment Completion

## ✨ Features

- 🎯 AI-based performance prediction
- 📈 Confidence percentage
- 💡 Personalized recommendation
- 📊 Prediction history
- 📉 Performance analysis chart
- 🌌 Interactive galaxy-themed interface
- 💾 Local prediction history using browser storage

## 🛠️ Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Chart.js

### Backend
- Python
- Flask
- Flask-CORS

### Machine Learning
- Scikit-learn
- Random Forest
- Joblib

### Dataset
- CSV

## 🔄 How It Works

1. Student enters academic details.
2. Frontend sends the data to the Flask backend.
3. The trained Random Forest model processes the input.
4. The system predicts the performance category.
5. Confidence percentage is calculated.
6. A recommendation is displayed.
7. The prediction is stored in history and visualized using a chart.

## 📁 Project Structure

```text
EduPredict/
│
├── index.html
├── style.css
├── script.js
│
├── dataset/
│   └── student_data.csv
│
└── backend/
    ├── app.py
    ├── model.py
    └── student_performance_model.pkl
