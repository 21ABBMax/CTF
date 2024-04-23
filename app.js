import { fetchData } from "./firebase.js";
import { checkForMatch } from "./Noob-if-you-look/checkMatch.js";

export async function encryptPassword(input) {
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

// Now we need to use async/await when calling the function

// (async () => {
// 	console.log(await encryptPassword("qwerty"));
// 	console.log(await encryptPassword("hej"));
// 	console.log(await encryptPassword("hej"));
// })();

// Check if username and password matche:

// Call the fetchData function to retrieve data
fetchData().then((users) => {
	// Example usage of the checkForMatch function
	const username = "Jonny";
	const password = "123";
	if (checkForMatch(username, password, users)) {
		console.log("Username and password match found.");
	} else {
		console.log("Wrong username or password");
	}
});
