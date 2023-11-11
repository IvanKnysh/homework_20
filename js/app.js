const step_1 = document.querySelector(".step-1");
const step_2 = document.querySelector(".step-2");
const step_3 = document.querySelector(".step-3");
const step_1_button = document.querySelector(".step-1 button");
const step_2_button = document.querySelector(".step-2 button");
const step_3_button = document.querySelector(".step-3 button");
let counter = 0;

const inputCountRatingValues = () => {
	document.querySelectorAll("table tbody tr").forEach((item) => {
		item.querySelectorAll("td select").forEach((select) => {
			select.addEventListener("change", (e) => {
				let basicCount = 0;

				e.target
					.closest("tr")
					.querySelectorAll("td select")
					.forEach((sel) => {
						basicCount += +sel.value;
					});

				item.closest("tr").querySelector("td:nth-last-child(1)").textContent =
					basicCount;
			});
		});
	});
};

const generateItemsForCountries = (getAllInputs) => {
	getAllInputs.forEach((item) => {
		if (item.classList.contains("country")) {
			counter++;

			step_3
				.querySelector("table thead tr")
				.insertAdjacentHTML("beforeend", `<td>${item.value}</td>`);
		}
	});
};

const generateItemsForParticipants = (getAllInputs) => {
	let resultHTML = "";

	for (let i = 0; i < counter; i++) {
		resultHTML +=
			"<td><select><option value='0' selected>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select></td>";
	}

	getAllInputs.forEach((item) => {
		if (item.classList.contains("participant")) {
			step_3.querySelector("table tbody").insertAdjacentHTML(
				"beforeend",
				`<tr>
						<td>${item.value}</td>
						${resultHTML}
						<td>0</td>
					</tr>`
			);
		}
	});
};

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
			generateItemsForCountries(getAllInputs);
			generateItemsForParticipants(getAllInputs);

			step_3
				.querySelector("table thead tr")
				.insertAdjacentHTML("beforeend", "<td>Результат</td>");

			step_2.classList.remove("active");
			step_3.classList.add("active");

			inputCountRatingValues();
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
				`<input type="text" class="participant" placeholder="Учасник ${
					i + 1
				}" />`
			);
	}

	for (let i = 0; i < countriesValue; i++) {
		step_2
			.querySelector(".block:nth-child(2)")
			.insertAdjacentHTML(
				"beforeend",
				`<input type="text" class="country" placeholder="Країна ${i + 1}" />`
			);
	}

	checkInputsByInput(document.querySelectorAll(".step-2 input"));
	checkInputsByClick(document.querySelectorAll(".step-2 input"));

	step_1.classList.add("disabled");
	step_2.classList.add("active");
});

step_3_button.addEventListener("click", () => {
	const ratingsArr = [];

	document.querySelectorAll("table tbody tr").forEach((tr) => {
		tr.querySelectorAll("td:nth-last-child(1)").forEach((td) => {
			ratingsArr.push(td.textContent);
		});
	});

	document.querySelectorAll("table tbody tr").forEach((tr, i) => {
		tr.querySelectorAll("td:nth-last-child(1)").forEach((td) => {
			if (ratingsArr[i] == td.textContent) {
				tr.style.order = td.textContent;
			}
		});
	});

	if (ratingsArr.some((item) => item != 0)) {
		document.querySelector("table tbody").style.flexDirection =
			"column-reverse";
	}
});
