import { fetchData } from "../firebase.js";
import { encryptPassword } from "../passwordEncrypter.js";

function encodeBase32(input) {
	const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
	let bits = "";
	let base32 = "";

	for (let i = 0; i < input.length; i++) {
		let bitString = input[i].charCodeAt(0).toString(2);
		while (bitString.length < 8) {
			bitString = "0" + bitString;
		}
		bits += bitString;
	}

	while (bits.length >= 5) {
		const bitString = bits.substring(0, 5);
		bits = bits.substring(5);
		const index = parseInt(bitString, 2);
		base32 += base32Chars[index];
	}

	if (bits.length > 0) {
		bits += new Array(5 - bits.length + 1).join("0");
		base32 += base32Chars[parseInt(bits, 2)];
	}

	while (base32.length % 8 !== 0) {
		base32 += "=";
	}

	return base32;
}

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

	const receivedPassword = String(passwordInput);
	const encryptedPassword = await encryptPassword(receivedPassword);

	const convertedUsername = encodeBase32(usernameInput);

	const storedPassword = users.hasOwnProperty(convertedUsername)
		? String(users[convertedUsername])
		: "";

	const encryptionDetection = storedPassword === encryptedPassword;

	if (encryptionDetection) {
		removeClass("errorP", "open");
		const errorM = document.createElement("div");
		errorM.classList.add("errorMessage");
		document.body.appendChild(errorM);
	} else {
		toggleClass("errorP", "open");
	}

	Object.keys(users).forEach((key) => {
		console.log(`Key: ${key}, Value: ${users[key]}`);
	});

	return encryptionDetection;
}

window.checkForMatch = checkForMatch;
