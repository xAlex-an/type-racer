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

// Global variables for timing
let startTime = null;
let isTestRunning = false;

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
    
    // Split text into words and wrap each word in a span for individual styling
    const words = randomText.split(' ');
    const wrappedWords = words.map((word, index) => {
        return `<span class="word" data-word-index="${index}">${word}</span>`;
    });
    
    // Join words with spaces and display
    textToType.innerHTML = wrappedWords.join(' ');
}

// Function to get the current sample text being displayed (plain text version)
function getCurrentSampleText() {
    const textToType = document.getElementById('textToType');
    return textToType.textContent;
}

// Function to highlight words based on typing accuracy
function highlightTypedWords() {
    const typingInput = document.getElementById('typingInput');
    const textToType = document.getElementById('textToType');
    
    // Get the original words and typed words
    const originalWords = getCurrentSampleText().trim().split(/\s+/);
    const typedText = typingInput.value.trim();
    const typedWords = typedText === '' ? [] : typedText.split(/\s+/);
    
    // Get all word spans
    const wordSpans = textToType.querySelectorAll('.word');
    
    // Reset all word highlights
    wordSpans.forEach(span => {
        span.className = 'word';
    });
    
    // Highlight words based on accuracy
    for (let i = 0; i < wordSpans.length; i++) {
        if (i < typedWords.length) {
            // Word has been typed - check if correct
            if (typedWords[i] === originalWords[i]) {
                // Correct word - highlight in blue
                wordSpans[i].classList.add('text-primary');
            } else {
                // Incorrect word - highlight in red
                wordSpans[i].classList.add('text-danger');
            }
        } else {
            // Word not yet typed - keep default styling
            wordSpans[i].className = 'word';
        }
    }
}

// Function to disable paste functionality
function disablePaste(inputElement) {
    // Prevent paste via right-click menu
    inputElement.addEventListener('paste', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Prevent paste via keyboard shortcut (Ctrl+V)
    inputElement.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
            return false;
        }
    });
}

// Function to setup real-time typing accuracy
function setupRealTimeAccuracy() {
    const typingInput = document.getElementById('typingInput');
    
    // Disable paste functionality
    disablePaste(typingInput);
    
    // Add real-time input event listener for word highlighting
    typingInput.addEventListener('input', function() {
        if (isTestRunning) {
            highlightTypedWords();
        }
    });
    
    // Also highlight on keyup to catch any missed events
    typingInput.addEventListener('keyup', function() {
        if (isTestRunning) {
            highlightTypedWords();
        }
    });
}

// Function to update difficulty level in results
function updateResultLevel() {
    const difficultySelect = document.getElementById('difficultySelect');
    const resultLevel = document.getElementById('resultLevel');
    
    const selectedDifficulty = difficultySelect.value;
    resultLevel.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
}

// Function to calculate correctly typed words
function calculateCorrectWords(originalText, typedText) {
    const originalWords = originalText.trim().split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);
    
    let correctWords = 0;
    
    // Compare each word typed with the original
    for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
        if (originalWords[i] === typedWords[i]) {
            correctWords++;
        }
    }
    
    return correctWords;
}

// Function to calculate WPM (Words Per Minute) based on correct words
function calculateWPM(correctWords, timeInSeconds) {
    if (timeInSeconds === 0) return 0;
    const minutes = timeInSeconds / 60;
    return Math.round(correctWords / minutes);
}

// Function to get the current sample text being displayed
function getCurrentSampleText() {
    const textToType = document.getElementById('textToType');
    return textToType.textContent;
}

// Function to start the typing test
function startTest() {
    const typingInput = document.getElementById('typingInput');
    const startBtn = document.querySelectorAll('.control-btn')[0];
    const stopBtn = document.querySelectorAll('.control-btn')[1];
    
    // Prevent multiple starts
    if (isTestRunning) {
        return;
    }
    
    // Record start time
    startTime = Date.now();
    isTestRunning = true;
    
    // Enable typing input and clear it
    typingInput.disabled = false;
    typingInput.value = '';
    typingInput.placeholder = 'Start typing here...';
    typingInput.focus();
    
    // Update button states
    startBtn.disabled = true;
    stopBtn.disabled = false;
    
    // Generate new text for the test and update difficulty in results
    displayText();
    updateResultLevel();
    
    // Reset word highlights when starting
    const wordSpans = document.querySelectorAll('.word');
    wordSpans.forEach(span => {
        span.className = 'word';
    });
}

// Function to stop the typing test
function stopTest() {
    const typingInput = document.getElementById('typingInput');
    const startBtn = document.querySelectorAll('.control-btn')[0];
    const stopBtn = document.querySelectorAll('.control-btn')[1];
    const resultTime = document.getElementById('resultTime');
    const resultWPM = document.getElementById('resultWPM');
    
    if (!isTestRunning || !startTime) {
        return;
    }
    
    // Calculate elapsed time in seconds
    const endTime = Date.now();
    const elapsedTimeMs = endTime - startTime;
    const elapsedTimeSeconds = elapsedTimeMs / 1000;
    
    // Get the original text and typed text
    const originalText = getCurrentSampleText();
    const typedText = typingInput.value;
    
    // Calculate correct words and WPM
    const correctWords = calculateCorrectWords(originalText, typedText);
    const wpm = calculateWPM(correctWords, elapsedTimeSeconds);
    
    // Update the results display
    resultTime.textContent = elapsedTimeSeconds.toFixed(2) + 's';
    resultWPM.textContent = wpm;
    
    // Disable typing input
    typingInput.disabled = true;
    typingInput.placeholder = 'Test completed! Click Start to begin a new test.';
    
    // Update button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    // Reset test state
    isTestRunning = false;
    startTime = null;
}

// Function to retry the typing test
function retryTest() {
    const typingInput = document.getElementById('typingInput');
    const startBtn = document.querySelectorAll('.control-btn')[0];
    const stopBtn = document.querySelectorAll('.control-btn')[1];
    const resultTime = document.getElementById('resultTime');
    const resultWPM = document.getElementById('resultWPM');
    
    // Reset everything to initial state
    isTestRunning = false;
    startTime = null;
    
    // Reset input area
    typingInput.disabled = true;
    typingInput.value = '';
    typingInput.placeholder = 'Click the start button to begin the test';
    
    // Reset button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    // Reset results display
    resultTime.textContent = '0s';
    resultWPM.textContent = '0';
    
    // Generate new text and update difficulty level
    displayText();
    updateResultLevel();
    
    // Reset word highlights
    const wordSpans = document.querySelectorAll('.word');
    wordSpans.forEach(span => {
        span.className = 'word';
    });
}

// Function to initialize button states
function initializeButtonStates() {
    const startBtn = document.querySelectorAll('.control-btn')[0];
    const stopBtn = document.querySelectorAll('.control-btn')[1];
    
    // Initial button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// Event listener for difficulty selection change
document.addEventListener('DOMContentLoaded', function() {
    const difficultySelect = document.getElementById('difficultySelect');
    const controlBtns = document.querySelectorAll('.control-btn');
    const startBtn = controlBtns[0];
    const stopBtn = controlBtns[1];
    const retryBtn = controlBtns[2];
    
    // Initialize button states
    initializeButtonStates();
    
    // Display initial text and update difficulty level
    displayText();
    updateResultLevel();
    
    // Setup real-time typing accuracy feature
    setupRealTimeAccuracy();
    
    // Update text and difficulty level when difficulty changes
    difficultySelect.addEventListener('change', function() {
        displayText();
        updateResultLevel();
        
        // Reset highlights when difficulty changes
        const wordSpans = document.querySelectorAll('.word');
        wordSpans.forEach(span => {
            span.className = 'word';
        });
    });
    
    // Add event listeners to control buttons if they exist
    if (startBtn) startBtn.addEventListener('click', startTest);
    if (stopBtn) stopBtn.addEventListener('click', stopTest);
    if (retryBtn) retryBtn.addEventListener('click', retryTest);
});