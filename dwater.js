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
const ctx = document.getElementById('dailyWaterChart').getContext('2d');
const dailyTempChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Daily Water1', 'Daily Water2', 'Daily Water3', 'Daily Water4'],
        datasets: [{
            label: 'Daily Temperature',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            data: [],
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                ticks: {
                    crossAlign: 'far', // Itatakda ang ticks sa kanan ng axis
                    beginAtZero: true
                }
            }
        }
    }
});

// Function to update chart
function updateChart(dailyTemps) {
    dailyTempChart.data.datasets[0].data = dailyTemps;
    dailyTempChart.update();
}

// Retrieve data from Realtime Database and update chart
const dailyTempRef = database.ref('Average');
dailyTempRef.on('value', function(snapshot) {
    const data = snapshot.val();
    const dailyWater1 = data["Daily Water1"];
    const dailyWater2 = data["Daily Water2"];
    const dailyWater3 = data["Daily Water3"];
    const dailyWater4 = data["Daily Water4"];
    const dailyTemps = [dailyWater1, dailyWater2, dailyWater3, dailyWater4];
    updateChart(dailyTemps);
    saveToFirestore(dailyTemps);
});

// Function to save data to Cloud Firestore
function saveToFirestore(dailyTemps) {
    const currentDate = new Date().toLocaleDateString(); // Get the current date
    const currentTime = new Date().toLocaleTimeString(); // Get the current time
    const currentDateTime = currentDate + ' ' + currentTime; // Combine date and time

    // Create a new document for the current date and time under the Daily collection
    db.collection('CHART').doc('Daily').collection('Readings').add({
        timestamp: currentDateTime,
        DailyWater1: dailyTemps[0],
        DailyWater2: dailyTemps[1],
        DailyWater3: dailyTemps[2],
        DailyWater4: dailyTemps[3]
    })
    .then(() => {
        console.log("Daily temperature data successfully saved to Firestore!");
    })
    .catch((error) => {
        console.error("Error saving daily temperature data to Firestore: ", error);
    });
}

