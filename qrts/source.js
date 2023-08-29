"use strict";

const loader = document.getElementById("loader");

const translateButtonEN = document.getElementById("translateto-en");
const translateButtonUA = document.getElementById("translateto-ua");

let locale;

translateButtonEN.onclick = () => {
	if (locale === "uk-UA") {
		loader.classList.remove("closed");
		locale = "en-US";
		const trns = document.getElementsByClassName("-trns-");
	
		for (let i = 0; i < trns.length; i++) {
			trns[i].textContent = "";
		}
	
		toTranslate("en-US");
	}
};

translateButtonUA.onclick = () => {
	if (locale !== "uk-UA") {
		loader.classList.remove("closed");
		locale = "uk-UA";
		const trns = document.getElementsByClassName("-trns-");
	
		for (let i = 0; i < trns.length; i++) {
			trns[i].textContent = "";
		}
	
		toTranslate("uk-UA");
	}
};

fetch("https://api.ipregistry.co/?key=tryout").then(response => {
	if (response) {
		return response.json();
	}
}).then(json => {
	locale = json.location.country.languages[0].code + "-" + json.location.country.code;
	toTranslate(locale);
}).catch(() => {
	locale = Intl.DateTimeFormat().resolvedOptions().locale;
	toTranslate(locale);
});

const toTranslate = locale => {
	switch (locale) {
		case "uk-UA":
			locale = "ua";
			break;
		default:
			locale = "en";
	}

	fetch("https://raw.githubusercontent.com/ttonightt/ttonightt.github.io/main/qrts/" + locale + ".json").then(json => {
		return json.text();
	}).then(text => {

		const obj = JSON.parse(text);

		const trns = document.getElementsByClassName("-trns-");

		if (trns.lenght !== Object.keys(obj).length) {
			for (let i = 0; i < trns.length; i++) {
				trns[i].insertAdjacentHTML("beforeend", obj[i]);
			}
		}

		setTimeout(() => {
			loader.classList.add("closed");
			alert(document.body.clientHeight);
		}, 500);
	});
};

const subheader = document.getElementById("subheader");
const subheaderCloser = document.getElementById("subheader-closer");
const subheaderCaller = document.getElementById("subheader-caller");

const popups = document.getElementsByClassName("popup");

subheaderCaller.onclick = () => {
	subheader.classList.add("active");
};

subheaderCloser.onclick = () => {
	subheader.classList.remove("active");
};

const sharebox = document.getElementById("sharebox");

sharebox.onclick = () => {
	toCopy("https://ttonightt.github.io/qrts/ua-indpnc23");
};

const toCopy = (value) => {
	navigator.clipboard.writeText('https:\/\/ttonightt.github.io/qrts/ua-indpnc23');
	popups[0].parentElement.classList.add("visible");
	setTimeout(() => {
		popups[0].parentElement.classList.remove("visible");
	}, 1000);
};