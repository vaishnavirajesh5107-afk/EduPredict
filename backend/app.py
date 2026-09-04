from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load("student_performance_model.pkl")


@app.route("/")
def home():
    return "EduPredict Backend is Running!"


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    study_hours = float(data["study_hours"])
    attendance = float(data["attendance"])
    previous_mark = float(data["previous_mark"])
    internal_mark = float(data["internal_mark"])
    assignment = float(data["assignment"])

    prediction = model.predict([[
        study_hours,
        attendance,
        previous_mark,
        internal_mark,
        assignment
    ]])
    probabilities = model.predict_proba([[
    study_hours,
    attendance,
    previous_mark,
    internal_mark,
    assignment
]])
    confidence = max(probabilities[0]) * 100

    return jsonify({
    "prediction": prediction[0],
    "confidence": round(confidence, 2)
})


if __name__ == "__main__":
    app.run(debug=True)