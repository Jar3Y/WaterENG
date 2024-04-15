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

    const searchInput2 = document.getElementById("searchBox2");
    const plantList2 = document.getElementById("plantList2");
    const displayArea2 = document.getElementById("displayArea2");

    function searchPlants(value) {
        plantList2.innerHTML = ""; // Clear the plant list
        displayArea2.innerHTML = ""; // Clear the display area

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
                        displayArea2.innerHTML = `
                            <p><strong>Plant:</strong> ${data.plant}</p>
                            <p><strong>Relative Humidity:</strong> ${data.relativeHumidity}</p>
                            <p><strong>Soil Moisture:</strong> ${data.soilMoisture}</p>
                            <p><strong>Average Temperature (°C):</strong> ${data.averageTemperatureC}</p>
                            <p><strong>Water Consumption:</strong> ${data.waterConsumptionLiterHour} liters/hour</p>
                        `;
                    });
                    plantList2.appendChild(listItem);
                }
            });
        }).catch((error) => {
            console.error("Error getting documents: ", error);
        });
    }

    searchInput2.addEventListener("input", function(e) {
        const value = e.target.value.toLowerCase();
        searchPlants(value);
    });

    searchInput2.addEventListener("keyup", function(e) {
        if (e.key === 'Backspace' && searchInput2.value === '') {
            plantList2.innerHTML = ""; // Clear the plant list if backspace and input is empty
        }
    });