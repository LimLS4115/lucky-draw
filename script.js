document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const prizes = [
        { name: "Gift 1", img: "gift.jpg" },
        { name: "Gift 2", img: "gift2.png" },
        { name: "Gift 3", img: "gift.jpg" },
        { name: "Gift 4", img: "gift2.png" },
        { name: "Gift 5", img: "gift.jpg" },
        { name: "Gift 6", img: "gift2.png" },
        { name: "Gift 7", img: "gift.jpg" },
        { name: "Gift 8", img: "gift2.png" },
    ];

    const numOfGiftsToShow = 8;  // Number of gifts to display
    let flippedCard = null;

    // Function to shuffle an array randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }

    // Shuffle the prize array and select the gifts to show
    shuffleArray(prizes);
    const selectedPrizes = prizes.slice(0, numOfGiftsToShow);  // Select the top 'numOfGiftsToShow' prizes

    // Dynamically generate the cards
    selectedPrizes.forEach(prize => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">
                <img src="" alt="Prize Image" class="prize-image">
                <p class="prize-name"></p>
            </div>
        </div>
        `;

        // Set the prize content (name and image) for each card
        const cardBack = card.querySelector('.card-back');
        const prizeNameElement = cardBack.querySelector('.prize-name');
        const prizeImageElement = cardBack.querySelector('.prize-image');
        prizeNameElement.textContent = prize.name;
        prizeImageElement.src = prize.img;

        // Add the data-prize attribute for the prize name
        card.setAttribute('data-prize', prize.name);

        // Add the click event for each card
        card.addEventListener('click', () => {
            if (!flippedCard) {
                card.classList.add('flipped');
                flippedCard = card;  // Mark the first flipped card

                // After a delay, flip all the other cards
                setTimeout(() => {
                    const allCards = document.querySelectorAll('.card');
                    allCards.forEach(otherCard => {
                        if (otherCard !== flippedCard) {
                            otherCard.classList.add('flipped');
                        }
                    });

                    // Display a popup with the prize of the clicked card
                    const prizeName = flippedCard.getAttribute('data-prize'); // Get the prize name of the clicked card
                    alert(`Congratulations! You have won a ${prizeName}!`); // Show a popup with the prize name
                }, 1000);  // 1 second delay before flipping all other cards
            }
        });

        // Add the card to the card container
        cardContainer.appendChild(card);
    });
});