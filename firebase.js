import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBQvjQL75f6_j8xBL8L51edKIMDp1OnU1k",

  authDomain: "capturetheflag-33dac.firebaseapp.com",

  databaseURL: "https://capturetheflag-33dac-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "capturetheflag-33dac",

  storageBucket: "capturetheflag-33dac.appspot.com",

  messagingSenderId: "939280235414",

  appId: "1:939280235414:web:e4c93a3cc8f7ea8036bbb7",

  measurementId: "G-Q9Y14WKRXG"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Reference to your data in the database
const dataRef = ref(database, 'Johan');

// Function to fetch data from the database
const fetchData = async () => {
  try {
    // Get the data snapshot once
    const snapshot = await get(dataRef);
    // Extract data from the snapshot
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
      // You can now work with the data
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the fetchData function to retrieve data
fetchData();
