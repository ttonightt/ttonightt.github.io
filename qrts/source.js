"use strict";

const loader = document.getElementById("loader");

fetch("https://api.ipregistry.co/?key=tryout").then(response => {
	if (response) {
		return response.json();
	}
}).then(json => {
	toTranslate(json.location.country.languages[0].code + "-" + json.location.country.code);
}).catch(() => {
	toTranslate(Intl.DateTimeFormat().resolvedOptions().locale);
});

const toTranslate = locale => {
	// switch (locale) {
	// 	case "uk-UA":
			locale = "ua";
	// 		break;
	// 	default:
	// 		locale = "en";
	// }

	fetch("https://raw.githubusercontent.com/ttonightt/ttonightt.github.io/master/" + locale + ".json").then(json => {
		return json.text();
	}).then(text => {
		console.log(text);
		const obj = JSON.parse(text, (key, value) => {
			console.log(key, value);
			return value;
		});

		console.log(obj);

		const trns = document.getElementsByClassName("-trns-");

		if (trns.lenght !== Object.keys(obj).length) {
			for (let i = 0; i < trns.length; i++) {
				if (obj[i] !== "\"") {
					trns[i].insertAdjacentHTML("beforeend", obj[i]);
				}
			}
		}

		loader.classList.add("closed");
	});
};

const subheader = document.getElementById("subheader");
const subheaderCloser = document.getElementById("subheader-closer");
const subheaderCaller = document.getElementById("subheader-caller");

subheaderCaller.onclick = () => {
	subheader.classList.add("active");
};

subheaderCloser.onclick = () => {
	subheader.classList.remove("active");
};