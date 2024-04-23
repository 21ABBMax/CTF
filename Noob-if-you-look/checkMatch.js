export function checkForMatch(username, password, users) {
	console.log("Received username:", username);
	console.log("Received password:", password);
	console.log("Fetched users data:", users);

	// Convert the received password to a string if it's not already
	const receivedPassword = String(password);

	// Convert the stored password to a string
	const storedPassword = users.hasOwnProperty(username)
		? String(users[username])
		: null;

	// Check if the username and password match a specific key-value pair in the users object
	const match = storedPassword && storedPassword === receivedPassword;
	console.log("Match result:", match);

	// Log keys and values of the users object for further inspection
	Object.keys(users).forEach((key) => {
		console.log(`Key: ${key}, Value: ${users[key]}`);
	});

	return match;
}
