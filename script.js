const form = document.getElementById("predictionForm");
form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const studentName =
        document.getElementById("studentName").value;

    const studyHours =
        Number(document.getElementById("studyHours").value);

    const attendance =
        Number(document.getElementById("attendance").value);

    const previousMark =
        Number(document.getElementById("previousMark").value);

    const internalMark =
        Number(document.getElementById("internalMark").value);

    const assignment =
        Number(document.getElementById("assignment").value);


    try {

        const response = await fetch(
            "http://127.0.0.1:5000/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    study_hours: studyHours,
                    attendance: attendance,
                    previous_mark: previousMark,
                    internal_mark: internalMark,
                    assignment: assignment

                })
            }
        );


        if (!response.ok) {
            throw new Error("Backend request failed");
        }


        const resultData =
            await response.json();


        const performance =
            resultData.prediction;

        const confidence =
            resultData.confidence;
        let recommendation;


        if (performance === "Excellent") {

            recommendation =
                "Excellent performance! Keep maintaining your current study habits. 🌟";

        }

        else if (performance === "Good") {

            recommendation =
                "Good performance! Try to improve your study hours and attendance. 👍";

        }

        else if (performance === "Average") {

            recommendation =
                "Your performance is average. Focus more on study time and assignments. 📚";

        }

        else {

            recommendation =
                "Your performance needs improvement. Focus on attendance, study hours and exam preparation. ⚠️";

        }

        document.getElementById("resultName").textContent =
            studentName;


        document.getElementById("resultPerformance").textContent =
            performance + " | Confidence: " + confidence + "%";


        document.getElementById("resultRecommendation").textContent =
            recommendation;


        const result =
            document.getElementById("result");


        result.style.display = "block";


        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        const history =
            JSON.parse(
                localStorage.getItem("predictionHistory")
            ) || [];


        const predictionRecord = {

            studentName: studentName,

            studyHours: studyHours,

            attendance: attendance,

            previousMark: previousMark,

            internalMark: internalMark,

            assignment: assignment,

            performance: performance,

            confidence: confidence

        };


        history.push(predictionRecord);


        localStorage.setItem(
            "predictionHistory",
            JSON.stringify(history)
        );

        displayHistory();

        updateChart();

    }


    catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the EduPredict AI server. Please make sure Flask is running."
        );

    }

});
function displayHistory() {

    const history =
        JSON.parse(
            localStorage.getItem("predictionHistory")
        ) || [];


    const historyBody =
        document.getElementById("historyBody");


    if (!historyBody) return;


    historyBody.innerHTML = "";


    history.forEach(function (item) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${item.studentName}</td>

            <td>${item.studyHours}</td>

            <td>${item.attendance}%</td>

            <td>${item.previousMark}</td>

            <td>${item.internalMark}</td>

            <td>${item.assignment}%</td>

            <td>${item.performance}</td>

            <td>${item.confidence}%</td>

        `;


        historyBody.appendChild(row);

    });

}

let performanceChart;


function updateChart() {

    const history =
        JSON.parse(
            localStorage.getItem("predictionHistory")
        ) || [];

    const excellent =
        history.filter(item =>
            item.performance === "Excellent"
        ).length;


    const good =
        history.filter(item =>
            item.performance === "Good"
        ).length;


    const average =
        history.filter(item =>
            item.performance === "Average"
        ).length;


    const needsImprovement =
        history.filter(item =>
            item.performance === "Needs Improvement"
        ).length;


    const canvas =
        document.getElementById("performanceChart");


    if (!canvas) return;

    if (performanceChart) {

        performanceChart.destroy();

    }
    performanceChart = new Chart(canvas, {

        type: "bar",


        data: {

            labels: [

                "Excellent",

                "Good",

                "Average",

                "Needs Improvement"

            ],


            datasets: [{

                label: "Number of Predictions",


                data: [

                    excellent,

                    good,

                    average,

                    needsImprovement

                ],
                backgroundColor: "rgba(74, 180, 255, 0.80)",

                borderColor: "rgba(74, 180, 255, 1)",

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,


            plugins: {

                title: {

                    display: true,

                    text:
                        "Student Performance Prediction Analysis",

                    color: "#ffffff",

                    font: {

                        size: 16,

                        weight: "bold"

                    },

                    padding: {

                        top: 5,

                        bottom: 20

                    }

                },

                legend: {

                    display: true,

                    labels: {

                        color: "#ffffff",

                        font: {

                            size: 13

                        },

                        padding: 20

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#ffffff",

                        font: {

                            size: 12,

                            weight: "bold"

                        }

                    },


                    grid: {

                        color:
                            "rgba(255,255,255,0.06)"

                    }

                },


                y: {

                    beginAtZero: true,


                    ticks: {

                        stepSize: 1,

                        color: "#ffffff",

                        font: {

                            size: 12,

                            weight: "bold"

                        }

                    },


                    grid: {

                        color:
                            "rgba(255,255,255,0.08)"

                    }

                }

            }

        }

    });

}
const clearHistoryButton =
    document.getElementById("clearHistory");


if (clearHistoryButton) {

    clearHistoryButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "predictionHistory"
            );


            displayHistory();

            updateChart();

        }
    );

}

displayHistory();

updateChart();