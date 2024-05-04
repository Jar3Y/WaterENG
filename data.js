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
    const ctx = document.getElementById('dailyTempChart').getContext('2d');
const dailyTempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Daily Temperature',
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            data: [],
        }]
    },
    options: {
        scales: {
            y: {
                suggestedMin: 0, // Set the minimum value for the y-axis
                suggestedMax: 60, // Set the maximum value for the y-axis
                beginAtZero: true
            }
        }
    }
});

// Flag to check if it's Monday and the chart needs to be reset
let isMonday = false;

// Load data from local storage on page load
window.addEventListener('load', function() {
const currentDate = new Date().getDay();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfWeek = days[currentDate];

const dailyTemp = localStorage.getItem(dayOfWeek);
if (dailyTemp !== null) {
// Update chart data for the current day
dailyTempChart.data.datasets[0].data[currentDate] = parseInt(dailyTemp);
dailyTempChart.update();
}

// Check if it's Monday
if (dayOfWeek === 'Monday') {
isMonday = true;
}
});

// Function to load chart data from local storage
function loadChartDataFromLocalStorage() {
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
days.forEach((day, index) => {
const dailyTemp = localStorage.getItem(day);
if (dailyTemp !== null) {
    // Update chart data for the current day
    dailyTempChart.data.datasets[0].data[index] = parseInt(dailyTemp);
}
});
dailyTempChart.update();
}

// Load chart data from local storage on page load
window.addEventListener('load', function() {
loadChartDataFromLocalStorage();
});

// Function to update chart and local storage
function updateChartAndLocalStorage(dailyTemp) {
const currentDate = new Date().getDay();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Update chart data for the current day
dailyTempChart.data.datasets[0].data[currentDate] = dailyTemp;
dailyTempChart.update();

// Update local storage for all days
days.forEach((day, index) => {
localStorage.setItem(day, dailyTempChart.data.datasets[0].data[index]);
});

// Save to Cloud Firestore
saveToFirestore(days[currentDate], dailyTemp);
}

// Retrieve data from Realtime Database and update chart
const dailyTempRef = database.ref('Average');
dailyTempRef.on('value', function(snapshot) {
const data = snapshot.val();
const dailyTemp = data["Daily Temp"];
updateChartAndLocalStorage(dailyTemp);
});

// Only update chart if it's not Monday or if it's Monday but the chart hasn't been reset yet
if (!isMonday || (isMonday && dailyTempChart.data.datasets[0].data.every(temp => temp === 0))) {
updateChartAndLocalStorage(dailyTemp);
}

// Function to save data to Cloud Firestore
function saveToFirestore(day, dailyTemp) {
    db.collection('CHART').doc('week').update({[day]:{ "Daily Temp": dailyTemp }});
}

// Load data from local storage on page load
window.addEventListener('load', function() {
    const currentDate = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[currentDate];
    
    const dailyTemp = localStorage.getItem(dayOfWeek);
    if (dailyTemp !== null) {
        // Update chart data for the current day
        dailyTempChart.data.datasets[0].data[currentDate] = parseInt(dailyTemp);
        dailyTempChart.update();
    }

    // Check if it's Monday, if so, reset the chart
    if (dayOfWeek === 'Monday') {
        isChartReset = true;
    }
});

