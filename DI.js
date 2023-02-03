let DI = {
	elements: {
		self: document.getElementById("DI"),
		console: document.getElementById("console"),
		streams: document.getElementById("streams"),
		colorPicker: document.getElementById("color-picker"),
		closer: document.querySelector("#DI .close-btn")
	},
	tabs: {
		list: document.querySelectorAll("#DI .tab"),
		callers: document.querySelectorAll("#DI .tab-btn")
	}
};

let lastTab = DI.tabs.list[0]; // here it doesn't matter which tab be

DI.tabs.callers.forEach(caller => {
	caller.onclick = function () {
		for (let i = 0; i < DI.tabs.list.length; i++) {
			if (DI.tabs.list[i].getAttribute("data-tab") == caller.getAttribute("data-tab")) {
				lastTab.classList.remove("active");

				DI.tabs.list[i].classList.add("active");

				lastTab = DI.tabs.list[i];
			}
		}

		if (!DI.elements.self.classList.contains("open")) {
			DI.elements.self.classList.add("open");
		}
	}
});

DI.elements.closer.onclick = function () {
	DI.elements.self.classList.remove("open");
}

// ------------------------------------------------------------------

DI.con = function (message) {
	if (typeof message == "string") {
		message = message.replace(/\n/g, "<i>\\n</i><br>&nbsp;&nbsp;");
	}
	DI.elements.console.innerHTML += "> " + message + "<i>\\n</i><br>";
}

DI.str = {
	list: [],
	set: function (k, v, basis) {
		if (k < this.list.length) {
			this.list[k].v = v;
		} else {
			k = Math.min(k, this.list.length);
			this.list[k] = {v: v};
			const newElem = document.createElement("div");
			DI.elements.streams.appendChild(newElem);
			this.list[k].elem = newElem;
		}
		this.setBasis(k, basis);
		return k;
	},
	setBasis: function (k, basis) {
		if (k < this.list.length) {
			if (typeof basis == "string") {
				this.list[k].elem.style.flexBasis = basis;
			} else if (typeof basis == "number") {
				this.list[k].elem.style.flexGrow = basis + "";
			}
			return this.list[k].elem;
		}
		return 0;
	},
	log: function (k, message, v) {
		if (k >= this.list.length) {
			let _v = "?";
			if (v != null && (typeof v == "string" || typeof v == "symbol" || typeof v == "number" || typeof v == "boolean")) {
				_v = v;
			}
			k = this.set(k, _v);
		}

		this.list[k].elem.innerHTML = this.list[k].v + ": " + message;
	},
	logI: function (k, message) {
		this.list[k].elem.innerHTML = this.list[k].v + ": " + message;
	},
	update: function () {
		for (let i = 0; i < DI.elements.streams.querySelectorAll("div").length; i++) {
			this.list[i] = {
				elem: DI.elements.streams.querySelectorAll("div")[i],
				v: "?"
			};
		}
	}
};

DI.cp = {
	subelements: {
		xy: document.getElementById("cp-xy"),
		z: document.getElementById("cp-z")
	},
	nav: {
		xy: document.getElementById("cp-nav-xy"),
		z: document.getElementById("cp-nav-z")
	},
	h: 0,
	s: 0,
	l: 0,
	grade: 0,
	sets: {},
	compileColor: function () {
		return `hsla(${this.h}, ${this.s}%, ${this.l}%, 1)`;
	}
};

const _sets = document.querySelectorAll("#cp-sets li");

for (let i = 0; i < _sets.length; i++) {
	const name = _sets[i].innerHTML;
	DI.cp.sets[name] = {
		element: _sets[i],
		color: 0
	};
	DI.cp.sets[name].element.onclick = function () {
		if (DI.cp.l > 50) {
			DI.cp.sets[name].element.style.color = "#000000";
		} else {
			DI.cp.sets[name].element.style.color = "#b3b3b3";
		}
		DI.cp.sets[name].element.style.backgroundColor = DI.cp.compileColor();
		DI.cp.sets[name].color = DI.cp.compileColor();
		DI.cp.sets[name].element.style.boxShadow = "0px 0px 0px 1px #ffffff";
		DI.cp.sets[name].element.title = `hsl(${DI.cp.h}deg, ${DI.cp.s}%, ${DI.cp.l}%)`;
	}
}

let cpctx = {
	xy: DI.cp.subelements.xy.getContext("2d"),
	z: DI.cp.subelements.z.getContext("2d")
};

DI.cp.grade = DI.cp.subelements.xy.clientWidth;
DI.cp.subelements.xy.width = DI.cp.grade;
DI.cp.subelements.xy.height = DI.cp.grade;
DI.cp.subelements.z.width = DI.cp.subelements.z.clientWidth;
DI.cp.subelements.z.height = DI.cp.grade;

DI.cp.refillXY = function () {
	for (let i = 0; i < DI.cp.grade; i++) {
		for (let j = 0; j < DI.cp.grade; j++) {
			cpctx.xy.fillStyle = `hsla(${DI.cp.h}, ${i * 100 / DI.cp.grade}%, ${j * 100 / DI.cp.grade}%, 1)`;
			cpctx.xy.fillRect(i, j, 1, 1);
		}
	}
}

DI.cp.fill = function () {
	for (let i = 0; i < DI.cp.grade; i++) {
		for (let j = 0; j < DI.cp.grade; j++) {
			cpctx.xy.fillStyle = `hsla(0, ${i * 100 / DI.cp.grade}%, ${j * 100 / DI.cp.grade}%, 1)`;
			cpctx.xy.fillRect(i, j, 1, 1);
		}
		cpctx.z.fillStyle = `hsla(${i * 360 / DI.cp.grade}, 100%, 50%, 1)`;
		cpctx.z.fillRect(0, i, DI.cp.subelements.z.width, 1);
	}
}

DI.cp.subelements.xy.parentElement.onclick = function (e) {
	DI.cp.s = Math.floor(Math.max(Math.min(e.offsetX, DI.cp.grade), 0) * 100 / DI.cp.grade);
	DI.cp.l = Math.floor(Math.max(Math.min(e.offsetY, DI.cp.grade), 0) * 100 / DI.cp.grade);
	DI.cp.nav.xy.style.left = parseInt(Math.max(Math.min(e.offsetX, DI.cp.grade), 0) - 6, 10) + "px";
	DI.cp.nav.xy.style.top = parseInt(Math.max(Math.min(e.offsetY, DI.cp.grade), 0) - 6, 10) + "px";
}

DI.cp.subelements.z.parentElement.onclick = function (e) {
	DI.cp.h = Math.floor(Math.max(Math.min(e.offsetY, DI.cp.grade), 0) * 360 / DI.cp.grade);
	DI.cp.nav.z.style.top = parseInt(Math.max(Math.min(e.offsetY, DI.cp.grade), 0) - 4, 10) + "px";
	DI.cp.refillXY();
}