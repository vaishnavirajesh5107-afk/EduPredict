import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


# Load the dataset
data = pd.read_csv("../dataset/student_data.csv")


# Features used for prediction
features = [
    "Study Hours",
    "Attendance",
    "Previous Mark",
    "Internal Mark",
    "Assignment Completion"
]

X = data[features]
y = data["Performance"]


# Split dataset into training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# Create Machine Learning model
model = RandomForestClassifier(
    n_estimators=150,
    random_state=42,
    max_depth=8
)


# Train the model
model.fit(X_train, y_train)


# Test the model
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"Model Accuracy: {accuracy * 100:.2f}%")


# Save trained model
joblib.dump(model, "student_performance_model.pkl")

print("Model saved as student_performance_model.pkl")