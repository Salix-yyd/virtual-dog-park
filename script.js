const searchInput = document.querySelector("#breed-search");
const breedCards = document.querySelectorAll("[data-breed-card]");
const searchStatus = document.querySelector("#search-status");

searchInput.addEventListener("input", () => {
	const searchText = searchInput.value.trim().toLowerCase();
	let visibleBreeds = 0;

	breedCards.forEach((card) => {
		const matches = card.textContent.toLowerCase().includes(searchText);
		card.hidden = !matches;
		if (matches) {
			visibleBreeds += 1;
		}
	});

	if (searchText === "") {
		searchStatus.textContent = "Showing all 3 breeds.";
	} else if (visibleBreeds === 0) {
		searchStatus.textContent = "No breeds found. Try another search.";
	} else {
		searchStatus.textContent = `Showing ${visibleBreeds} of 3 breeds.`;
	}
});

const adoptionForm = document.querySelector("#adoption-form");
const dogNameInput = document.querySelector("#dog-name");
const dogBreedInput = document.querySelector("#dog-breed");
const adoptionMessage = document.querySelector("#adoption-message");
const dogDashboard = document.querySelector("#dog-dashboard");
const dogNameDisplay = document.querySelector("#dog-name-display");
const dogBreedDisplay = document.querySelector("#dog-breed-display");
const dogHappinessDisplay = document.querySelector("#dog-happiness");
const happinessMeter = document.querySelector(".happiness-meter");
const happinessFill = document.querySelector("#happiness-fill");
const interactionMessage = document.querySelector("#interaction-message");
let virtualDog = null;

function renderDog() {
	dogNameDisplay.textContent = virtualDog.name;
	dogBreedDisplay.textContent = virtualDog.breed;
	dogHappinessDisplay.textContent = virtualDog.happiness;
	happinessMeter.setAttribute("aria-valuenow", virtualDog.happiness);
	happinessFill.style.width = `${virtualDog.happiness}%`;
	dogDashboard.hidden = false;
}

function handleAdoption(event) {
	event.preventDefault();
	const dogName = dogNameInput.value.trim();
	const dogBreed = dogBreedInput.value;

	if (dogName.length === 0) {
		adoptionMessage.textContent = "Please enter a name before adopting your dog.";
		dogNameInput.focus();
		return;
	}

	if (dogName.length > 20) {
		adoptionMessage.textContent = "Please use a name with no more than 20 characters.";
		dogNameInput.focus();
		return;
	}

	if (dogBreed === "") {
		adoptionMessage.textContent = "Please choose a breed for your dog.";
		dogBreedInput.focus();
		return;
	}

	virtualDog = {
		name: dogName,
		breed: dogBreed,
		day: 1,
		stage: "Puppy",
		happiness: 50
	};
	adoptionMessage.textContent = "Your dog has been adopted!";
	interactionMessage.textContent = "Feed or play to make your dog happier.";
	document.querySelector("#dog-day").textContent = virtualDog.day;
	document.querySelector("#dog-stage").textContent = virtualDog.stage;
	renderDog();
}

function careForDog(activity) {
	if (virtualDog === null) {
		return;
	}

	virtualDog.happiness = Math.min(100, virtualDog.happiness + 10);
	renderDog();
	interactionMessage.textContent = `${virtualDog.name} enjoyed ${activity}. Happiness: ${virtualDog.happiness}%.`;
}

adoptionForm.addEventListener("submit", handleAdoption);
document.querySelector("#feed-button").addEventListener("click", () => careForDog("a snack"));
document.querySelector("#play-button").addEventListener("click", () => careForDog("playtime"));