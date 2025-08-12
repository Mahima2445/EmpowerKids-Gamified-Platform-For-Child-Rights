// Quiz functionality for EmpowerKids Platform
class QuizManager {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.userAnswers = [];
        this.timeLeft = 0;
        this.timer = null;
        
        this.init();
    }
    
    init() {
        this.loadQuestions();
        this.setupEventListeners();
        this.displayQuestion();
    }
    
    loadQuestions() {
        // Sample questions - can be loaded from JSON file
        this.questions = [
            {
                id: 1,
                question: "What is the Right to Education Act (RTE) in India?",
                options: [
                    "A law that provides free education to all children",
                    "A law that makes education compulsory for children aged 6-14",
                    "A law that establishes private schools",
                    "A law about teacher training"
                ],
                correctAnswer: 1,
                explanation: "The RTE Act makes education compulsory and free for all children aged 6-14 years."
            },
            {
                id: 2,
                question: "Which article of the Indian Constitution guarantees the Right to Education?",
                options: [
                    "Article 19",
                    "Article 21",
                    "Article 21A",
                    "Article 25"
                ],
                correctAnswer: 2,
                explanation: "Article 21A guarantees free and compulsory education for children aged 6-14 years."
            },
            {
                id: 3,
                question: "What percentage of seats are reserved for economically weaker sections in private schools under RTE?",
                options: [
                    "15%",
                    "20%",
                    "25%",
                    "30%"
                ],
                correctAnswer: 2,
                explanation: "25% of seats in entry-level classes of private schools are reserved for children from economically weaker sections."
            }
        ];
        
        this.timeLeft = this.questions.length * 60; // 1 minute per question
    }
    
    setupEventListeners() {
        const submitBtn = document.getElementById('submitAnswer');
        const nextBtn = document.getElementById('nextQuestion');
        const restartBtn = document.getElementById('restartQuiz');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitAnswer());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartQuiz());
        }
        
        // Option selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quiz-option')) {
                this.selectOption(e.target);
            }
        });
    }
    
    displayQuestion() {
        const questionContainer = document.getElementById('questionContainer');
        const progressBar = document.getElementById('quizProgress');
        const questionNumber = document.getElementById('questionNumber');
        
        if (!questionContainer || this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentQuestionIndex];
        
        // Update progress
        if (progressBar) {
            const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            progressBar.style.width = progress + '%';
        }
        
        if (questionNumber) {
            questionNumber.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        }
        
        // Display question
        questionContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 text-gray-800">${question.question}</h3>
                <div class="space-y-3">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-all duration-300" data-option="${index}">
                            <span class="font-medium">${String.fromCharCode(65 + index)}.</span> ${option}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.startTimer();
    }
    
    selectOption(optionElement) {
        // Remove previous selections
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected', 'border-purple-500', 'bg-purple-50');
        });
        
        // Select current option
        optionElement.classList.add('selected', 'border-purple-500', 'bg-purple-50');
        
        // Enable submit button
        const submitBtn = document.getElementById('submitAnswer');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
    
    submitAnswer() {
        const selectedOption = document.querySelector('.quiz-option.selected');
        
        if (!selectedOption) {
            alert('Please select an answer!');
            return;
        }
        
        const selectedIndex = parseInt(selectedOption.dataset.option);
        const question = this.questions[this.currentQuestionIndex];
        
        this.userAnswers.push(selectedIndex);
        
        // Show correct/incorrect feedback
        this.showAnswerFeedback(selectedIndex, question.correctAnswer, question.explanation);
        
        // Update score
        if (selectedIndex === question.correctAnswer) {
            this.score++;
        }
        
        // Disable further selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Show next button
        const submitBtn = document.getElementById('submitAnswer');
        const nextBtn = document.getElementById('nextQuestion');
        
        if (submitBtn) submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'block';
    }
    
    showAnswerFeedback(selectedIndex, correctIndex, explanation) {
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            if (index === correctIndex) {
                option.classList.add('correct-answer');
            } else if (index === selectedIndex && selectedIndex !== correctIndex) {
                option.classList.add('incorrect-answer');
            }
        });
        
        // Show explanation
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded';
        explanationDiv.innerHTML = `
            <h4 class="font-semibold text-blue-800">Explanation:</h4>
            <p class="text-blue-700">${explanation}</p>
        `;
        
        document.getElementById('questionContainer').appendChild(explanationDiv);
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        // Reset buttons
        const submitBtn = document.getElementById('submitAnswer');
        const nextBtn = document.getElementById('nextQuestion');
        
        if (submitBtn) {
            submitBtn.style.display = 'block';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        
        if (nextBtn) nextBtn.style.display = 'none';
        
        this.displayQuestion();
    }
    
    showResults() {
        this.stopTimer();
        
        const resultsContainer = document.getElementById('quizResults');
        const questionContainer = document.getElementById('questionContainer');
        
        if (questionContainer) questionContainer.style.display = 'none';
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        let performanceLevel = '';
        let performanceColor = '';
        
        if (percentage >= 80) {
            performanceLevel = 'Excellent!';
            performanceColor = 'text-green-600';
        } else if (percentage >= 60) {
            performanceLevel = 'Good!';
            performanceColor = 'text-blue-600';
        } else if (percentage >= 40) {
            performanceLevel = 'Fair';
            performanceColor = 'text-yellow-600';
        } else {
            performanceLevel = 'Needs Improvement';
            performanceColor = 'text-red-600';
        }
        
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="text-center bg-white rounded-lg shadow-lg p-8">
                    <div class="mb-6">
                        <div class="text-6xl mb-4">${percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}</div>
                        <h2 class="text-3xl font-bold ${performanceColor} mb-2">${performanceLevel}</h2>
                        <p class="text-xl text-gray-600">You scored ${this.score} out of ${this.questions.length}</p>
                    </div>
                    
                    <div class="mb-6">
                        <div class="bg-gray-200 rounded-full h-4 mb-2">
                            <div class="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
                        </div>
                        <p class="text-lg font-semibold">${percentage}% Correct</p>
                    </div>
                    
                    <div class="space-y-4">
                        <button id="reviewAnswers" class="btn-secondary mr-4">Review Answers</button>
                        <button id="restartQuiz" class="btn-primary">Take Quiz Again</button>
                    </div>
                </div>
            `;
            
            resultsContainer.style.display = 'block';
        }
        
        // Save score to localStorage
        this.saveScore(percentage);
        
        // Show notification
        if (window.EmpowerKids) {
            window.EmpowerKids.showNotification(`Quiz completed! You scored ${percentage}%`, 'success');
        }
    }
    
    saveScore(percentage) {
        const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
        scores.push({
            date: new Date().toISOString(),
            score: percentage,
            questionsTotal: this.questions.length,
            questionsCorrect: this.score
        });
        
        localStorage.setItem('quizScores', JSON.stringify(scores));
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        
        const resultsContainer = document.getElementById('quizResults');
        const questionContainer = document.getElementById('questionContainer');
        
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (questionContainer) questionContainer.style.display = 'block';
        
        this.displayQuestion();
    }
    
    startTimer() {
        const timerDisplay = document.getElementById('timerDisplay');
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            
            if (timerDisplay) {
                const minutes = Math.floor(this.timeLeft / 60);
                const seconds = this.timeLeft % 60;
                timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    
    timeUp() {
        this.stopTimer();
        alert('Time\'s up!');
        this.showResults();
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('questionContainer')) {
        new QuizManager();
    }
});
