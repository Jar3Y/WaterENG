
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

// Get a reference to the database service
const database = firebase.database();

// Retrieve data from the database
const dataRef1 = database.ref('test/Temperature');
const dataRef2 = database.ref('test/Humidity');
const dataRef3 = database.ref('test/Moisture1');
const dataRef4 = database.ref('test/Water Flow1');

dataRef1.on('value', function(snapshot) {
  const temp = snapshot.val();
  document.getElementById('temperature').innerHTML = "Temperature: " + temp + "°C";
});

dataRef2.on('value', function(snapshot) {
  const humi = snapshot.val();
  document.getElementById('humidity').innerHTML = "Humidity: " + humi + "%";
});

dataRef3.on('value', function(snapshot) {
  const mois1 = snapshot.val();
  document.getElementById('soilMoisture').innerHTML = "Soil Moisture: " + mois1 + "%";
});

dataRef4.on('value', function(snapshot) {
  const wf1 = snapshot.val();
  document.getElementById('waterFlow').innerHTML = "Water Flow Sensor: " + wf1 + "L/hr";
});