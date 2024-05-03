  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyARPNEBqhRS1zTlM_mTEUT4e2ifqnPBAoo",
    authDomain: "watereng-login-page.firebaseapp.com",
    databaseURL: "https://watereng-login-page-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "watereng-login-page",
    storageBucket: "watereng-login-page.appspot.com",
    messagingSenderId: "172632501893",
    appId: "1:172632501893:web:adbfb8001c97ac616743ec",
    measurementId: "G-D5NFHRWBG8"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const db = firebase.firestore();

// Chart.js configuration
const ctx = document.getElementById('hourlyTempChart').getContext('2d');
const hourlyTempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Hourly labels
        datasets: [{
            label: 'Hourly Temperature',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            data: Array.from({ length: 24 }, () => 0), // Initialize hourly data with zeros
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to update chart
function updateChart(hourlyData) {
    hourlyTempChart.data.datasets[0].data = hourlyData;
    hourlyTempChart.update();
}

// Retrieve data from Realtime Database and update chart
const hourlyTempRef = database.ref('Average');
hourlyTempRef.on('value', function(snapshot) {
    const data = snapshot.val();
    const hourlyTemp = data["Hourly Temp"];
    saveToFirestore(hourlyTemp);
});

// Function to save data to Cloud Firestore
function saveToFirestore(hourlyTemp) {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentTime = `${currentHour}:${currentMinute}`;

    // Create a new document for the current time under the Hourly collection
    db.collection('CHART').doc('Hourly').collection('Hourly').doc(currentTime)
        .set({ [currentTime]: hourlyTemp })
        .then(() => {
            console.log("Hourly temperature data successfully saved to Firestore!");
        })
        .catch((error) => {
            console.error("Error saving hourly temperature data to Firestore: ", error);
        });

    // Update the chart with the new data
    const hourlyData = hourlyTempChart.data.datasets[0].data;
    hourlyData[currentHour] = hourlyTemp;
    updateChart(hourlyData);
}