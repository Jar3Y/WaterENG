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
    const db = firebase.firestore();

    const searchInput4 = document.getElementById("searchBox4");
    const plantList4 = document.getElementById("plantList4");
    const displayArea4 = document.getElementById("displayArea4");

    function searchPlants(value) {
        plantList4.innerHTML = ""; // Clear the plant list
        displayArea4.innerHTML = ""; // Clear the display area

        if (value === "") {
            return; // Exit if search input is empty
        }

        db.collection("CROPS").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const plantName = data.plant.toLowerCase();
                if (plantName.startsWith(value)) {
                    const listItem = document.createElement("li");
                    listItem.textContent = data.plant;
                    listItem.addEventListener("click", function() {
                        displayArea4.innerHTML = `
                            <p><strong>Plant:</strong> ${data.plant}</p>
                            <p><strong>Relative Humidity:</strong> ${data.relativeHumidity}</p>
                            <p><strong>Soil Moisture:</strong> ${data.soilMoisture}</p>
                            <p><strong>Average Temperature (°C):</strong> ${data.averageTemperatureC}</p>
                            <p><strong>Water Consumption:</strong> ${data.waterConsumptionLiterHour} liters/hour</p>
                        `;
                    });
                    plantList4.appendChild(listItem);
                }
            });
        }).catch((error) => {
            console.error("Error getting documents: ", error);
        });
    }

    searchInput4.addEventListener("input", function(e) {
        const value = e.target.value.toLowerCase();
        searchPlants(value);
    });

    searchInput4.addEventListener("keyup", function(e) {
        if (e.key === 'Backspace' && searchInput4.value === '') {
            plantList4.innerHTML = ""; // Clear the plant list if backspace and input is empty
        }
    });