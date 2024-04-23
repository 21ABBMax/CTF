// Import necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
	getDatabase,
	ref,
	get,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBQvjQL75f6_j8xBL8L51edKIMDp1OnU1k",

	authDomain: "capturetheflag-33dac.firebaseapp.com",

	databaseURL:
		"https://capturetheflag-33dac-default-rtdb.europe-west1.firebasedatabase.app",

	projectId: "capturetheflag-33dac",

	storageBucket: "capturetheflag-33dac.appspot.com",

	messagingSenderId: "939280235414",

	appId: "1:939280235414:web:e4c93a3cc8f7ea8036bbb7",

	measurementId: "G-Q9Y14WKRXG",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Reference to your data in the database
const usersRef = ref(database, "Users");

// Function to fetch data from the database
export const fetchData = async () => {
	try {
		// Get the data snapshot once
		const usersSnapshot = await get(usersRef);
		// Initialize an empty array to store user objects as key-value pairs
		const users = [];
		// Extract data from the users snapshot
		if (usersSnapshot.exists()) {
			// Loop through each child node under the "Users" node
			usersSnapshot.forEach((userSnapshot) => {
				// Get the key (user ID) for each child
				const usernameInBase64ThenHexaThenBase32 = userSnapshot.key;
				// Get the value (user data) for each child
				const encrypted_password = userSnapshot.val();
				// Construct a key-value pair object and push it into the array
				users.push({
					user: usernameInBase64ThenHexaThenBase32,
					password: encrypted_password,
				});

				// Log the user:key pair
				console.log(
					"User:",
					usernameInBase64ThenHexaThenBase32 + "\n" + "Password:",
					encrypted_password
				);
			});
			// Now 'users' array contains all the user objects with key-value pair under the "Users" node

			// Return the fetched data
			return users;
		} else {
			console.log("No data available");
			return null; // Return null if no data available
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		return null; // Return null in case of an error
	}
};

// Call the fetchData function to retrieve data
fetchData();
