import { fetchData } from "../firebase.js";

function toggleClass(elementId, className) {
	const element = document.getElementById(elementId);
	if (!element.classList.contains(className)) {
		element.classList.add(className);
	}
}

function removeClass(elementId, className) {
	const element = document.getElementById(elementId);
	if (element.classList.contains(className)) {
		element.classList.remove(className);
	}
}

export async function checkForMatch() {
	const users = await fetchData();

	const usernameInput = document.getElementById("usernameInput").value;
	const passwordInput = document.getElementById("passwordInput").value;

	console.log("Received username:", usernameInput);
	console.log("Received password:", passwordInput);
	console.log("Fetched users data:", users);

	// Convert the received password to a string if it's not already
	const receivedPassword = String(passwordInput);

	// Convert the stored password to a string
	const storedPassword = users.hasOwnProperty(usernameInput)
		? String(users[usernameInput])
		: "";

	// Check if the username and password match a specific key-value pair in the users object
	const match = storedPassword && storedPassword === receivedPassword;

	if (match) {
		removeClass("errorP", "open");
	} else {
		toggleClass("errorP", "open");
	}

	console.log("Match result:", match);

	// Log keys and values of the users object for further inspection
	Object.keys(users).forEach((key) => {
		console.log(`Key: ${key}, Value: ${users[key]}`);
	});

	return match;
}

window.checkForMatch = checkForMatch;
