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
const dogDayDisplay = document.querySelector("#dog-day");
const dogStageDisplay = document.querySelector("#dog-stage");
const dogHappinessDisplay = document.querySelector("#dog-happiness");
const happinessMeter = document.querySelector(".happiness-meter");
const happinessFill = document.querySelector("#happiness-fill");
const growthMeter = document.querySelector(".growth-meter");
const growthFill = document.querySelector("#growth-fill");
const growthCaption = document.querySelector("#growth-caption");
const interactionMessage = document.querySelector("#interaction-message");
const storageKey = "virtualDogParkPetV1";
const dogBreeds = ["Beagle", "Golden Retriever", "Poodle"];
let virtualDog = null;

function getGrowthStage(day) {
	if (day === 1) {
		return "Puppy";
	}
	if (day <= 3) {
		return "Young Dog";
	}
	return "Adult Dog";
}

function saveDog() {
	const dogToSave = {
		name: virtualDog.name,
		breed: virtualDog.breed,
		day: virtualDog.day,
		happiness: virtualDog.happiness
	};
	localStorage.setItem(storageKey, JSON.stringify(dogToSave));
}

function loadDog() {
	const savedDog = localStorage.getItem(storageKey);
	if (savedDog === null) {
		return null;
	}

	try {
		const dog = JSON.parse(savedDog);
		const validDog = typeof dog.name === "string"
			&& dog.name.trim().length > 0
			&& dog.name.length <= 20
			&& dogBreeds.includes(dog.breed)
			&& Number.isInteger(dog.day)
			&& dog.day >= 1
			&& Number.isInteger(dog.happiness)
			&& dog.happiness >= 0
			&& dog.happiness <= 100;

		if (validDog) {
			return {
				name: dog.name,
				breed: dog.breed,
				day: dog.day,
				happiness: dog.happiness
			};
		}
	} catch {
		localStorage.removeItem(storageKey);
		return null;
	}

	localStorage.removeItem(storageKey);
	return null;
}

function renderDog() {
	dogNameDisplay.textContent = virtualDog.name;
	dogBreedDisplay.textContent = virtualDog.breed;
	dogDayDisplay.textContent = virtualDog.day;
	dogStageDisplay.textContent = getGrowthStage(virtualDog.day);
	dogHappinessDisplay.textContent = virtualDog.happiness;
	happinessMeter.setAttribute("aria-valuenow", virtualDog.happiness);
	happinessFill.style.width = `${virtualDog.happiness}%`;
	const growthDay = Math.min(virtualDog.day, 4);
	growthMeter.setAttribute("aria-valuenow", growthDay);
	growthFill.style.width = `${growthDay * 25}%`;
	growthCaption.textContent = virtualDog.day < 4 ? `Day ${virtualDog.day} of 4` : "Fully grown";
	adoptionForm.hidden = true;
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
		happiness: 50
	};
	saveDog();
	adoptionMessage.textContent = "Your dog has been adopted!";
	interactionMessage.textContent = "Feed or play to make your dog happier.";
	renderDog();
}

function careForDog(activity) {
	if (virtualDog === null) {
		return;
	}

	virtualDog.happiness = Math.min(100, virtualDog.happiness + 10);
	saveDog();
	renderDog();
	interactionMessage.textContent = `${virtualDog.name} enjoyed ${activity}. Happiness: ${virtualDog.happiness}%.`;
}

function advanceToNextDay() {
	if (virtualDog === null) {
		return;
	}

	virtualDog.day += 1;
	virtualDog.happiness = Math.max(0, virtualDog.happiness - 5);
	saveDog();
	renderDog();
	interactionMessage.textContent = `Day ${virtualDog.day}: ${virtualDog.name} reached the ${getGrowthStage(virtualDog.day)} stage. Happiness: ${virtualDog.happiness}%.`;
}

function startOver() {
	const confirmed = window.confirm("Start over? This will delete your saved dog's progress.");
	if (!confirmed) {
		return;
	}

	localStorage.removeItem(storageKey);
	virtualDog = null;
	dogDashboard.hidden = true;
	adoptionForm.hidden = false;
	adoptionForm.reset();
	dogNameInput.focus();
	adoptionMessage.textContent = "Your progress was cleared. You can adopt a new dog.";
}

adoptionForm.addEventListener("submit", handleAdoption);
document.querySelector("#feed-button").addEventListener("click", () => careForDog("a snack"));
document.querySelector("#play-button").addEventListener("click", () => careForDog("playtime"));
document.querySelector("#next-day-button").addEventListener("click", advanceToNextDay);
document.querySelector("#start-over-button").addEventListener("click", startOver);

virtualDog = loadDog();
if (virtualDog !== null) {
	renderDog();
	interactionMessage.textContent = `Welcome back, ${virtualDog.name}! Your saved progress has been restored.`;
}