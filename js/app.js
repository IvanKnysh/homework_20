const step_1 = document.querySelector(".step-1");
const step_2 = document.querySelector(".step-2");
const step_3 = document.querySelector(".step-3");
const step_1_button = document.querySelector(".step-1 button");
const step_2_button = document.querySelector(".step-2 button");

// Check inputs by input
const checkInputsByInput = (getAllInputs) => {
	getAllInputs.forEach((item) => {
		item.addEventListener("input", () => {
			if (item.value.trim() == "") {
				item.classList.add("error");
			} else {
				item.classList.remove("error");
			}
		});
	});
};

// Check inputs by click
const checkInputsByClick = (getAllInputs) => {
	step_2_button.addEventListener("click", () => {
		const arr = [];

		getAllInputs.forEach((item) => {
			if (item.value.trim() == "") {
				item.classList.add("error");
				arr.push(1);
			} else {
				arr.push(0);
			}
		});

		const isValidate = arr.every((item) => item === 0);

		if (isValidate) {
			step_2.classList.remove("active");
			step_3.classList.add("active");
		}
	});
};

// Generate inputs for step 2
step_1_button.addEventListener("click", () => {
	const participantsValue = +document.querySelector("#participants").value;
	const countriesValue = +document.querySelector("#countries").value;

	for (let i = 0; i < participantsValue; i++) {
		step_2
			.querySelector(".block:nth-child(1)")
			.insertAdjacentHTML(
				"beforeend",
				`<input type="text" placeholder="Учасник ${i + 1}" />`
			);
	}

	for (let i = 0; i < countriesValue; i++) {
		step_2
			.querySelector(".block:nth-child(2)")
			.insertAdjacentHTML(
				"beforeend",
				`<input type="text" placeholder="Країна ${i + 1}" />`
			);
	}

	checkInputsByInput(document.querySelectorAll(".step-2 input"));
	checkInputsByClick(document.querySelectorAll(".step-2 input"));

	step_1.classList.add("disabled");
	step_2.classList.add("active");
});
