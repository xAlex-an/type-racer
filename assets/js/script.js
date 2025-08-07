// Text samples for different difficulty levels
const textSamples = {
    easy: [
        "The cat sat on the mat. It was a sunny day and the cat was happy.",
        "I like to eat ice cream on hot summer days. It tastes very good.",
        "Birds fly in the sky. They build nests in trees and sing beautiful songs."
    ],
    medium: [
        "Technology has revolutionized the way we communicate with each other. Social media platforms connect people across the globe instantly.",
        "The ancient library contained thousands of books filled with knowledge from centuries past. Scholars would spend hours researching within its walls.",
        "Environmental conservation requires immediate action from governments and individuals alike. Climate change affects every living organism on Earth."
    ],
    hard: [
        "Quantum mechanics demonstrates that subatomic particles exhibit wave-particle duality, fundamentally challenging our classical understanding of physics and reality.",
        "The implementation of sophisticated algorithms in machine learning requires comprehensive understanding of mathematical concepts, statistical analysis, and computational complexity theory.",
        "Philosophical discourse surrounding existentialism encompasses various interpretations of human consciousness, free will, and the inherent meaninglessness of existence in an absurd universe."
    ]
};

// Function to get random text based on difficulty
function getRandomText(difficulty) {
    const texts = textSamples[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

// Function to display text based on selected difficulty
function displayText() {
    const difficultySelect = document.getElementById('difficultySelect');
    const textToType = document.getElementById('textToType');
    
    const selectedDifficulty = difficultySelect.value.toLowerCase();
    const randomText = getRandomText(selectedDifficulty);
    
    textToType.textContent = randomText;
}

// Event listener for difficulty selection change
document.addEventListener('DOMContentLoaded', function() {
    const difficultySelect = document.getElementById('difficultySelect');
    
    // Display initial text
    displayText();
    
    // Update text when difficulty changes
    difficultySelect.addEventListener('change', displayText);
    
    // Update text when Start button is clicked (new random text)
    const startBtn = document.querySelector('.control-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            displayText();
        });
    }
});