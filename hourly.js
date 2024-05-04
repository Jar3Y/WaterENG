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
                suggestedMin: 0, // Set the minimum value for the y-axis
                suggestedMax: 60, // Set the maximum value for the y-axis
                
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

 // Function to save data to Cloud Firestore
 function saveToFirestore(hourlyTemp) {
     const currentTime = new Date();
     const currentHour = currentTime.getHours();
     const currentMinute = currentTime.getMinutes();
     const currentTimeString = `${currentHour}:${currentMinute}`;

     // Piliin ang tamang collection reference sa iyong database structure
     const hourlyDataRef = db.collection('CHART').doc('Hourly');

     // I-update ang data sa Firestore gamit ang update method
     hourlyDataRef.update({
         [currentTimeString]: hourlyTemp
     })
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

 // Retrieve historical data from Firestore
 function getHistoricalData() {
     db.collection('CHART').doc('Hourly').get()
         .then((doc) => {
             if (doc.exists) {
                 const historicalData = doc.data();
                 const hourlyData = hourlyTempChart.data.datasets[0].data;
                 for (const [hour, temperature] of Object.entries(historicalData)) {
                     hourlyData[parseInt(hour)] = temperature;
                 }
                 updateChart(hourlyData);
             } else {
                 console.log("No historical data found in Firestore.");
             }
         })
         .catch((error) => {
             console.error("Error fetching historical data from Firestore: ", error);
         });
 }

 // Call the function to fetch historical data when the page loads
 window.onload = function() {
     getHistoricalData();
 };

 // Retrieve data from Realtime Database and update chart
 const hourlyTempRef = database.ref('Average');
 hourlyTempRef.on('value', function(snapshot) {
     const data = snapshot.val();
     const hourlyTemp = data["Hourly Temp"];
     saveToFirestore(hourlyTemp);
 });