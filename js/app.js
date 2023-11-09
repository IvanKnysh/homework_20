const step_1 = document.querySelector(".step-1");
const step_2 = document.querySelector(".step-2");
const step_3 = document.querySelector(".step-3");
const step_1_button = document.querySelector(".step-1 button");
const step_2_button = document.querySelector(".step-2 button");
const step_2_getAllInputs = document.querySelectorAll(".step-2 input");

// Navigation by screens
step_1_button.addEventListener("click", () => {
	step_1.classList.add("disabled");
	step_2.classList.add("active");
});

// Check inputs by input
step_2_getAllInputs.forEach((item) => {
	item.addEventListener("input", () => {
		if (item.value.trim() == "") {
			item.classList.add("error");
		} else {
			item.classList.remove("error");
		}
	});
});

// Check inputs by click
step_2_button.addEventListener("click", () => {
	const arr = [];

	step_2_getAllInputs.forEach((item) => {
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
