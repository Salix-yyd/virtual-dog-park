# Virtual Dog Park

A beginner-friendly dog encyclopedia and virtual pet website built with HTML, CSS, and vanilla JavaScript.

## Features

- Browse and search notes about Beagles, Golden Retrievers, and Poodles.
- View three project-created SVG dog illustrations. These are original illustrations, not real dog photographs.
- Adopt one virtual dog by choosing a breed and entering a name.
- Feed or play with your dog to increase its happiness.
- Advance days to see your dog grow from Puppy to Young Dog to Adult Dog.
- Save one dog's progress in the browser and restore it after a refresh.
- Start over after confirming that saved progress should be deleted.

## Preview

1. Open this project folder in VS Code.
2. Install the Live Server extension if it is not already available.
3. In the Explorer, right-click `index.html` and select **Open with Live Server**.
4. Your browser opens the locally served page. The project does not need a package manager or a build step.

## Growth and Happiness Rules

- A newly adopted dog starts on Day 1 as a Puppy, with 50 happiness.
- Days 2 and 3 are the Young Dog stage. Day 4 and later are the Adult Dog stage.
- Each Feed or Play action adds 10 happiness, up to a maximum of 100.
- Each Next Day action adds one day and removes 5 happiness, down to a minimum of 0.

## Saved Progress

The website stores the current dog's name, breed, day, and happiness in this browser's `localStorage`, using the key `virtualDogParkPetV1`. The data stays in the browser on this device; it is not saved to or synced with a GitHub account. Clearing the browser's local site data will remove the saved dog.

## Manual Testing Checklist

- [ ] Search the encyclopedia for a breed and verify the cards filter; clear the search to show all three again.
- [ ] Try to adopt with a blank or spaces-only name and verify a helpful message appears.
- [ ] Adopt a dog with a name containing internal spaces and verify the name, breed, Day 1, Puppy stage, and 50 happiness appear.
- [ ] Use Feed and Play; verify each adds 10 happiness and the value stops at 100.
- [ ] Use Next Day; verify the day increases, happiness decreases by 5 but never below 0, and the stage changes on Days 2 and 4.
- [ ] Refresh the page and verify the saved dog and its progress return.
- [ ] Choose Start Over, cancel the confirmation, and verify the dog remains. Choose Start Over again and confirm; verify the form returns and progress is cleared.