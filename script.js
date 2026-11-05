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