
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

// Temperature each pipes 
const dataRef1 = database.ref('test/Temperature');
const dataRef2 = database.ref('test/Temperature');
const dataRef3 = database.ref('test/Temperature');
const dataRef4 = database.ref('test/Temperature');

// Humidity each pipes
const dataRef5 = database.ref('test/Humidity');
const dataRef6 = database.ref('test/Humidity');
const dataRef7 = database.ref('test/Humidity');
const dataRef8 = database.ref('test/Humidity');

// Soil Moisture each pipes
const dataRef9 = database.ref('test/Soil Moisture1');
const dataRef10 = database.ref('test/Soil Moisture2');
const dataRef11 = database.ref('test/Soil Moisture3');
const dataRef12 = database.ref('test/Soil Moisture4');

// Water Flow Rate each pipes
const dataRef13 = database.ref('test/Water Flow1');
const dataRef14 = database.ref('test/Water Flow2');
const dataRef15 = database.ref('test/Water Flow3');
const dataRef16 = database.ref('test/Water Flow4');

// Temperature Monitoring
dataRef1.on('value', function(snapshot) {
  const temp = snapshot.val();
  document.getElementById('temperature').innerHTML = "Temperature: " + temp + "°C";
});

dataRef2.on('value', function(snapshot) {
  const temp = snapshot.val();
  document.getElementById('temperature2').innerHTML = "Temperature: " + temp + "°C";
});

dataRef3.on('value', function(snapshot) {
  const temp = snapshot.val();
  document.getElementById('temperature3').innerHTML = "Temperature: " + temp + "°C";
});

dataRef4.on('value', function(snapshot) {
  const temp = snapshot.val();
  document.getElementById('temperature4').innerHTML = "Temperature: " + temp + "°C";
});

// -------------------------------------------------------- //
// Humidity Monitoring 

dataRef5.on('value', function(snapshot) {
  const humi = snapshot.val();
  document.getElementById('humidity').innerHTML = "Humidity: " + humi + "%";
});

dataRef6.on('value', function(snapshot) {
  const humi = snapshot.val();
  document.getElementById('humidity2').innerHTML = "Humidity: " + humi + "%";
});

dataRef7.on('value', function(snapshot) {
  const humi = snapshot.val();
  document.getElementById('humidity3').innerHTML = "Humidity: " + humi + "%";
});

dataRef8.on('value', function(snapshot) {
  const humi = snapshot.val();
  document.getElementById('humidity4').innerHTML = "Humidity: " + humi + "%";
});

// -------------------------------------------------------- //
// Soil Moisture Monitoring 

dataRef9.on('value', function(snapshot) {
  const mois1 = snapshot.val();
  document.getElementById('soilMoisture').innerHTML = "Soil Moisture: " + mois1 + "%";
});

dataRef10.on('value', function(snapshot) {
  const mois2 = snapshot.val();
  document.getElementById('soilMoisture2').innerHTML = "Soil Moisture: " + mois2 + "%";
});

dataRef11.on('value', function(snapshot) {
  const mois3 = snapshot.val();
  document.getElementById('soilMoisture3').innerHTML = "Soil Moisture: " + mois3 + "%";
});

dataRef12.on('value', function(snapshot) {
  const mois4 = snapshot.val();
  document.getElementById('soilMoisture4').innerHTML = "Soil Moisture: " + mois4 + "%";
});

// -------------------------------------------------------- //
// Water Flow Rate Monitoring 

dataRef13.on('value', function(snapshot) {
  const wf1 = snapshot.val();
  document.getElementById('waterFlow').innerHTML = "Water Flow Rate: " + wf1 + "L/hr";
});

dataRef14.on('value', function(snapshot) {
  const wf2 = snapshot.val();
  document.getElementById('waterFlow2').innerHTML = "Water Flow Rate: " + wf2 + "L/hr";
});

dataRef15.on('value', function(snapshot) {
  const wf3 = snapshot.val();
  document.getElementById('waterFlow3').innerHTML = "Water Flow Rate: " + wf3 + "L/hr";
});

dataRef16.on('value', function(snapshot) {
  const wf4 = snapshot.val();
  document.getElementById('waterFlow4').innerHTML = "Water Flow Rate: " + wf4 + "L/hr";
});

