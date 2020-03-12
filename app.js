const form = document.querySelector("form");
const sections = document.querySelectorAll(".section");
const sectionIndicators = document.querySelectorAll(".sectionIndicator");
const nextButton = document.querySelector("#nextButton");
const prevButton = document.querySelector("#prevButton");
const inputTags = document.querySelectorAll("input");

let currentSection = 0;

const showCurrentSection = (section) => {
	// Shows the specified section of the form
	sections[section].style.display = "block";
	if (section === 0) {
		prevButton.style.display = "none";
	} else {
		prevButton.style.display = "inline";
	}
	if (section === sections.length - 1) {
		nextButton.innerText = "Submit"
	} else {
		nextButton.innerText = "Next"
	}
};


const displayPrevOrNextSection = (n) => {
	let inputArray = Object.values(sections[currentSection].children).filter(element => element.className === "input");

	// Hey Colt, I've got a bit of a problem with the next two lines of code. The problem is, I don't want the form 
	// to move to the next section if this validation that is, "checkRequired(inputArray)" doesn't occur. 
	// I've tried ways round it but I don't seem to get it. Below is what I did before.
	// if (!checkRequired(inputArray)) {
	// 	return false
	// }

	checkRequired(inputArray); //What I later did after exhausting all the possible innacurate solutions I could come up with

	// And also with the next line of code. The problem is, for example, I want the 
	// indicator to indicate I'm on the first section when I load up the form, but it won't until I click on the next button
	// then click on the previous button before it indicates that I'm on the first section.

	sectionIndicators[currentSection].classList.remove("active");
	// Hide the current Section
	sections[currentSection].style.display = "none";
	// Increases or decreases  the current section by 1
	currentSection += n;
	// If it has reached the end of the form, submit
	if (currentSection >= sections.length) {
		form.submit();
		return false;
	} // else show the correct section
	showCurrentSection(currentSection);
	sectionIndicators[currentSection].classList.add("active");
};


						/* FORM VALIDATION*/

// Checks if a field is empty
const checkRequired = inputTagArr => {
	inputTagArr.forEach(input => {
		if (input.value.trim() === "") {
			showErrorMessage(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
};

// Shows the error message
const showErrorMessage = (inputTag, message) => {
	inputTag.classList.add("error");
	const messageBox = inputTag.nextElementSibling;
	messageBox.innerText = message;
};

const showSuccess = inputTag => {
	inputTag.classList.add("success");
};

// Gets the input field name and turns the first letter to capital
const getFieldName = input => input.name.charAt(0).toUpperCase() + input.name.slice(1);

					/* END OF FORM VALIDATION*/

showCurrentSection(currentSection);
nextButton.addEventListener("click", (event) => {
	event.preventDefault();
	displayPrevOrNextSection(1);
});
prevButton.addEventListener("click", (event) => {
	event.preventDefault();
	displayPrevOrNextSection(-1);
});