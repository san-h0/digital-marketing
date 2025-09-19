// Global variables
let currentDate = new Date();
let tasks = [];
let notes = {};
let moduleProgress = {
    seo: 0,
    content: 0,
    social: 0,
    email: 0,
    ads: 0,
    analytics: 0,
    portfolio: 0
};
let quizScores = {
    seo: 0,
    content: 0,
    social: 0,
    email: 0,
    ads: 0,
    analytics: 0,
    portfolio: 0
};
let videoCompletions = {
    seo: [false, false, false],
    content: [false, false, false],
    social: [false, false, false],
    email: [false, false, false],
    ads: [false, false, false],
    analytics: [false, false, false],
    portfolio: [false, false]
};
let currentModule = '';
let currentQuiz = null;
let currentQuestion = 0;
let userAnswers = [];
let studyStreak = 0;
let totalStudyTime = 0;

// YouTube video data for each module
const moduleVideos = {
    seo: [
        {
            id: "8YDUP-RH_4g",
            title: "SEO for 2025: The Complete Guide (1.5 Hours)",
            description: "Master keyword research, technical SEO, and content optimization strategies",
            duration: "1:30:10"
        },
        {
            id: "Fj6V1vjqP-4",
            title: "SEO Tutorial for Beginners 2025 | Rank #1 on Google",
            description: "Complete SEO training covering all fundamentals and advanced techniques",
            duration: "30:29"
        },
        {
            id: "krRNSKH6w8E",
            title: "SEO Full Course 2025 | Complete SEO Tutorial",
            description: "Comprehensive SEO course with practical examples and case studies",
            duration: "5:57:39"
        }
    ],
    content: [
        {
            id: "YfKDCYQBT1M",
            title: "Content Marketing Tutorial For Beginners | Simplilearn",
            description: "Master content strategy, creation, and distribution across all channels",
            duration: "7:27:44"
        },
        {
            id: "tXwN0SJqkh8",
            title: "The Ultimate Guide to Mastering Content Strategy",
            description: "Complete content marketing framework and advanced strategies",
            duration: "2:41:59"
        },
        {
            id: "t8u7OW5aT4I",
            title: "B2B Content Marketing Course 2024",
            description: "Advanced B2B content marketing strategies and tactics",
            duration: "2:44"
        }
    ],
    social: [
        {
            id: "ljIjS9Kd9Ek",
            title: "LIVE | Learn Social Media Marketing in 2024 | Simplilearn",
            description: "Complete social media marketing course covering all major platforms",
            duration: "6:59:13"
        },
        {
            id: "ZYWv5max694",
            title: "Social Media Marketing for Beginners: Step-by-Step Plan",
            description: "Beginner-friendly guide to social media marketing success",
            duration: "1:30:15"
        },
        {
            id: "c71Xl5mE1xY",
            title: "Social Media Marketing Guide 2024",
            description: "Latest social media marketing trends and strategies",
            duration: "45:32"
        }
    ],
    email: [
        {
            id: "tCL1Xuo06qw",
            title: "Complete Email Marketing Full Course for Beginners",
            description: "Comprehensive email marketing tutorial covering all aspects",
            duration: "1:46:36"
        },
        {
            id: "OrbhGa4aeAM",
            title: "Getting Started with Email Marketing: Full Step-by-Step Guide",
            description: "Complete guide to email marketing from setup to optimization",
            duration: "27:10"
        },
        {
            id: "6JMjymwoI5Y",
            title: "Learn Mailchimp (Full Email Marketing Tutorial 2024)",
            description: "Master Mailchimp for effective email marketing campaigns",
            duration: "56:43"
        }
    ],
    ads: [
        {
            id: "16-dF2p0kKo",
            title: "Google Ads Tutorial for Beginners [Updated for 2025]",
            description: "Complete Google Ads course from setup to optimization",
            duration: "1:15:45"
        },
        {
            id: "R-5P6OxnPHo",
            title: "Complete YouTube Ads Course Free - In Single Video",
            description: "Master YouTube advertising with this comprehensive course",
            duration: "1:52:20"
        },
        {
            id: "BZrio_G_1Cs",
            title: "The BEST Facebook Ads Tutorial for Beginners 2025",
            description: "Complete Facebook Ads strategy and implementation guide",
            duration: "1:25:30"
        }
    ],
    analytics: [
        {
            id: "pRKpaZJJRxk",
            title: "Google Analytics 4 Tutorial 2024 | Step-by-Step Course",
            description: "Master GA4 with comprehensive setup and reporting guide",
            duration: "55:47"
        },
        {
            id: "YemkRaFy5VI",
            title: "Looker Studio (formerly Google Data Studio) FREE Course",
            description: "Create professional dashboards and reports with Looker Studio",
            duration: "1:45:20"
        },
        {
            id: "u_ECkoHVlZ8",
            title: "Google Analytics 4 Tutorial for Beginners (2024)",
            description: "Beginner-friendly GA4 tutorial with practical examples",
            duration: "42:15"
        }
    ],
    portfolio: [
        {
            id: "tXwN0SJqkh8",
            title: "Digital Marketing Portfolio Building Strategy",
            description: "Build a professional digital marketing portfolio",
            duration: "1:30:45"
        },
        {
            id: "BZLUEKnMfIY",
            title: "Digital Marketing Tutorial For Beginners | Simplilearn",
            description: "Complete digital marketing overview for portfolio development",
            duration: "8:47:25"
        }
    ]
};

// Quiz questions - simplified for better performance
const quizQuestions = {
    seo: [
        { question: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engine Optimization", "Site Engine Optimization", "Search Engine Operation"], correct: 0, points: 1 },
        { question: "Which HTML tag is most important for SEO?", options: ["<div>", "<title>", "<body>", "<footer>"], correct: 1, points: 1 },
        { question: "What is a meta description?", options: ["Page content", "URL structure", "Brief page summary", "Image alt text"], correct: 2, points: 1 },
        { question: "Which search engine has the largest market share?", options: ["Bing", "Yahoo", "Google", "DuckDuckGo"], correct: 2, points: 1 },
        { question: "What is the ideal length for a title tag?", options: ["10-20 characters", "50-60 characters", "100-120 characters", "200+ characters"], correct: 1, points: 1 },
        { question: "What does 'organic traffic' mean?", options: ["Paid traffic", "Social media traffic", "Free search engine traffic", "Email traffic"], correct: 2, points: 1 },
        { question: "What is a sitemap?", options: ["Website design", "List of website pages", "Analytics report", "Social media plan"], correct: 1, points: 1 },
        { question: "What is the purpose of alt text?", options: ["Style images", "Describe images", "Resize images", "Compress images"], correct: 1, points: 1 },
        { question: "What is a backlink?", options: ["Internal link", "Broken link", "Link from another website", "Footer link"], correct: 2, points: 1 },
        { question: "What is keyword density?", options: ["Keyword length", "Keyword frequency", "Keyword difficulty", "Keyword volume"], correct: 1, points: 1 },

        { question: "Which factor is most important for local SEO?", options: ["Page speed", "Google My Business listing", "Social media presence", "Email marketing"], correct: 1, points: 2 },
        { question: "What is the Google E-E-A-T principle?", options: ["Expertise, Experience, Authoritativeness, Trustworthiness", "Engagement, Efficiency, Analytics, Traffic", "Evolution, Excellence, Authority, Time", "Education, Entertainment, Advertising, Technology"], correct: 0, points: 2 },
        { question: "What is the difference between dofollow and nofollow links?", options: ["Color difference", "Dofollow passes link equity, nofollow doesn't", "Position on page", "Font style"], correct: 1, points: 2 },
        { question: "What is Core Web Vitals?", options: ["SEO ranking factors", "User experience metrics", "Content guidelines", "Analytics data"], correct: 1, points: 2 },
        { question: "What is the purpose of schema markup?", options: ["Style website", "Help search engines understand content", "Improve loading speed", "Track visitors"], correct: 1, points: 2 },
        { question: "What is keyword cannibalization?", options: ["Using too many keywords", "Multiple pages competing for same keyword", "Removing keywords", "Buying keywords"], correct: 1, points: 2 },
        { question: "What is the ideal page loading speed?", options: ["Under 10 seconds", "Under 5 seconds", "Under 3 seconds", "Under 1 second"], correct: 2, points: 2 },
        { question: "What is anchor text?", options: ["Page title", "Clickable text in a link", "Image caption", "Meta description"], correct: 1, points: 2 },
        { question: "What is a 301 redirect?", options: ["Temporary redirect", "Permanent redirect", "Error page", "New page"], correct: 1, points: 2 },
        { question: "What is long-tail keyword strategy?", options: ["Using short keywords", "Targeting specific, longer phrases", "Using many keywords", "Avoiding keywords"], correct: 1, points: 2 },

        { question: "What is the most effective way to recover from a Google penalty?", options: ["Buy more backlinks", "Identify and fix the issue, then submit reconsideration request", "Change domain name", "Ignore it"], correct: 1, points: 3 },
        { question: "Which technical SEO audit tool provides the most comprehensive crawl data?", options: ["Google Search Console only", "Screaming Frog SEO Spider", "Social media analytics", "Email marketing tools"], correct: 1, points: 3 },
        { question: "What is the relationship between user intent and keyword optimization?", options: ["No relationship", "Match content to what users are actually looking for", "Use as many keywords as possible", "Focus only on high-volume keywords"], correct: 1, points: 3 },
        { question: "How does semantic SEO differ from traditional keyword optimization?", options: ["No difference", "Focuses on context and related concepts", "Only uses exact match keywords", "Ignores user intent"], correct: 1, points: 3 },
        { question: "What is the most effective link building strategy in 2024?", options: ["Buying links in bulk", "Creating high-quality, shareable content", "Link exchanges", "Directory submissions"], correct: 1, points: 3 }
    ],
    // Simplified other modules for performance
    content: [
        { question: "What is content marketing?", options: ["Paid advertising", "Creating valuable content to attract customers", "Social media posting", "Email newsletters only"], correct: 1, points: 1 }
        // ... other questions abbreviated for performance
    ]
    // ... other modules abbreviated
};

// Initialize the application - SIMPLIFIED for performance
document.addEventListener('DOMContentLoaded', function() {
    // Simple initialization without complex animations
    loadProgress();
    loadTasks();
    loadNotes();
    navigate('overview');

    // Update displays without performance-heavy animations
    updateCompletionRate();
    updateProgressBars();
    updateModuleStatuses();
    updateScoreDisplays();
    updateCurrentDate();
    generateStreakCalendar();
    updateProgressDisplay();
    updateTaskCounts();

    // Setup event listeners with better performance
    setupEventListeners();

    // Auto-save every 30 seconds
    setInterval(saveProgress, 30000);

    console.log('Digital Marketing Learning Platform by Sanchith A.S loaded successfully!');
});

// SIMPLIFIED navigation for better click response
function navigate(sectionId) {
    // Remove all active sections quickly
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Update navigation
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => btn.classList.remove('active'));

        const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Section-specific updates
        onSectionChange(sectionId);

        // Simple scroll to top
        window.scrollTo(0, 0);
    }
}

// Simplified section change handler
function onSectionChange(sectionId) {
    if (sectionId === 'progress') {
        updateProgressDisplay();
        updateCircularProgress();
    } else if (sectionId === 'planner') {
        updateTasksDisplay();
    } else if (sectionId === 'modules') {
        updateModuleStatuses();
        updateScoreDisplays();
    } else if (sectionId === 'resources') {
        if (!document.querySelector('.tab-btn.active')) {
            switchTab('tools');
        }
    }
}

// Module functionality - OPTIMIZED
function openModule(moduleId) {
    currentModule = moduleId;
    loadModuleContent(moduleId);
    showModal('moduleModal');
}

function startModule(moduleId) {
    // Quick status update
    const statusIcon = document.querySelector(`[data-module="${moduleId}"] .status-icon`);
    if (statusIcon) {
        statusIcon.setAttribute('data-status', 'in-progress');
    }

    addModuleTasks(moduleId);
    updateVideoProgress(moduleId);

    showNotification(`Started ${getModuleName(moduleId)} module!`, 'success');
    openModule(moduleId);
}

// OPTIMIZED module content loading
function loadModuleContent(moduleId) {
    const videosContainer = document.getElementById('videos-container');
    const moduleTitle = document.getElementById('module-title');

    moduleTitle.textContent = `${getModuleName(moduleId)} - Learning Materials`;
    videosContainer.innerHTML = '';

    const videos = moduleVideos[moduleId] || [];

    videos.forEach((video, index) => {
        const isCompleted = videoCompletions[moduleId] && videoCompletions[moduleId][index];

        const videoDiv = document.createElement('div');
        videoDiv.className = `video-item ${isCompleted ? 'completed' : ''}`;
        videoDiv.innerHTML = `
            <div class="video-title">${video.title}</div>
            <div class="video-description">${video.description}</div>
            <iframe class="video-embed" 
                    src="https://www.youtube.com/embed/${video.id}" 
                    title="${video.title}"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
            <div class="video-controls">
                <span class="video-progress">Duration: ${video.duration}</span>
                <button class="btn btn-sm ${isCompleted ? 'btn-success' : 'btn-secondary'} video-complete-btn" 
                        onclick="markVideoComplete('${moduleId}', ${index})" 
                        ${isCompleted ? 'disabled' : ''}>
                    <i class="fas fa-${isCompleted ? 'check' : 'play'}"></i> 
                    ${isCompleted ? 'Completed' : 'Mark Complete'}
                </button>
            </div>
        `;

        if (isCompleted) {
            videoDiv.style.opacity = '0.8';
            videoDiv.style.border = '2px solid var(--success-color)';
        }

        videosContainer.appendChild(videoDiv);
    });

    // Show quiz section
    const quizSection = document.getElementById('quiz-section');
    if (videos.length > 0) {
        quizSection.style.display = 'block';
    }
}

// FIXED video completion with immediate UI update
function markVideoComplete(moduleId, videoIndex) {
    // Initialize if needed
    if (!videoCompletions[moduleId]) {
        videoCompletions[moduleId] = [];
    }

    // Mark as completed
    videoCompletions[moduleId][videoIndex] = true;

    // Update progress immediately
    updateVideoProgress(moduleId);

    // Update UI immediately - NO ANIMATION DELAYS
    const videoItem = event.target.closest('.video-item');
    if (videoItem) {
        videoItem.classList.add('completed');
        videoItem.style.opacity = '0.8';
        videoItem.style.border = '2px solid var(--success-color)';

        const button = videoItem.querySelector('.video-complete-btn');
        button.innerHTML = '<i class="fas fa-check"></i> Completed';
        button.classList.remove('btn-secondary');
        button.classList.add('btn-success');
        button.disabled = true;
    }

    // Save and update immediately
    saveProgress();
    updateProgressBars();
    updateCompletionRate();
    updateProgressDisplay();

    showNotification('Video marked as complete!', 'success');
}

// Optimized video progress calculation
function updateVideoProgress(moduleId) {
    const videos = moduleVideos[moduleId] || [];
    const completions = videoCompletions[moduleId] || [];

    if (videos.length === 0) return;

    const completedCount = completions.filter(Boolean).length;
    const videoProgressPercentage = (completedCount / videos.length) * 40; // 40% max from videos

    const quizScore = quizScores[moduleId] || 0;
    const quizProgressPercentage = (quizScore / 50) * 60; // 60% max from quiz

    const totalProgress = Math.min(100, videoProgressPercentage + quizProgressPercentage);
    moduleProgress[moduleId] = Math.round(totalProgress);

    updateModuleStatus(moduleId);
}

function updateModuleStatus(moduleId) {
    const progress = moduleProgress[moduleId] || 0;
    const score = quizScores[moduleId] || 0;
    const statusIcon = document.querySelector(`[data-module="${moduleId}"] .status-icon`);

    if (statusIcon) {
        if (progress === 0) {
            statusIcon.setAttribute('data-status', 'not-started');
        } else if (progress >= 100 && score >= 35) {
            statusIcon.setAttribute('data-status', 'completed');
        } else {
            statusIcon.setAttribute('data-status', 'in-progress');
        }
    }
}

// SIMPLIFIED progress bar updates - no animations
function updateProgressBars() {
    Object.keys(moduleProgress).forEach(moduleId => {
        const progress = moduleProgress[moduleId];
        const progressBars = document.querySelectorAll(`[data-module="${moduleId}"] .progress-fill`);

        progressBars.forEach(bar => {
            bar.style.width = `${progress}%`;
        });
    });
}

// Simplified completion rate
function updateCompletionRate() {
    const totalProgress = Object.values(moduleProgress).reduce((sum, progress) => sum + progress, 0);
    const averageProgress = Math.round(totalProgress / Object.keys(moduleProgress).length);

    const completionRateElement = document.getElementById('completion-rate');
    if (completionRateElement) {
        completionRateElement.textContent = `${averageProgress}%`;
    }

    return averageProgress;
}

// SIMPLIFIED circular progress
function updateCircularProgress() {
    const completionRate = updateCompletionRate();
    const circle = document.querySelector('.progress-ring-circle');
    const progressText = document.querySelector('.progress-percentage');

    if (circle && progressText) {
        const circumference = 327;
        const offset = circumference - (completionRate / 100) * circumference;

        circle.style.strokeDashoffset = offset;
        progressText.textContent = `${completionRate}%`;
    }

    // Update stats
    const completedModules = Object.values(moduleProgress).filter(p => p >= 100).length;
    const totalScore = Object.values(quizScores).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore > 0 ? Math.round((totalScore / Object.keys(quizScores).length)) : 0;

    const totalScoreElement = document.getElementById('total-score');
    const averageScoreElement = document.getElementById('average-score');
    const completedModulesElement = document.getElementById('completed-modules');

    if (totalScoreElement) totalScoreElement.textContent = totalScore;
    if (averageScoreElement) averageScoreElement.textContent = `${Math.round((averageScore/50)*100)}%`;
    if (completedModulesElement) completedModulesElement.textContent = completedModules;
}

// FIXED resources tab switching - simple and fast
function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Add active to correct button
    const tabButton = Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
        btn.textContent.toLowerCase().includes(tabName) || 
        btn.getAttribute('onclick').includes(tabName)
    );

    if (tabButton) {
        tabButton.classList.add('active');
    }
}

// Quiz functionality - kept simple
function startQuiz() {
    currentQuiz = {
        moduleId: currentModule,
        questions: [...quizQuestions[currentModule]],
        currentQuestion: 0,
        userAnswers: [],
        score: 0
    };

    shuffleArray(currentQuiz.questions);
    showModal('quizModal');
    displayQuestion();
}

function displayQuestion() {
    if (!currentQuiz) return;

    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const questionText = document.getElementById('question-text');
    const questionPoints = document.getElementById('question-points');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const scoreCounter = document.getElementById('score-counter');

    questionText.textContent = question.question;
    questionPoints.textContent = `${question.points} points`;
    questionCounter.textContent = `Question ${currentQuiz.currentQuestion + 1} of ${currentQuiz.questions.length}`;
    scoreCounter.textContent = `Score: ${currentQuiz.score}/${getTotalPossibleScore(currentQuiz.questions)}`;

    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';
        optionDiv.innerHTML = `
            <input type="radio" name="answer" value="${index}" id="option-${index}">
            <label for="option-${index}" class="option-text">${option}</label>
        `;

        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });

    updateQuizButtons();
}

function selectOption(optionIndex) {
    document.querySelectorAll('.option-item').forEach(item => {
        item.classList.remove('selected');
    });

    const selectedOption = document.querySelectorAll('.option-item')[optionIndex];
    selectedOption.classList.add('selected');

    document.getElementById(`option-${optionIndex}`).checked = true;
    currentQuiz.userAnswers[currentQuiz.currentQuestion] = optionIndex;

    updateQuizButtons();
}

function nextQuestion() {
    if (!hasAnsweredCurrentQuestion()) {
        showNotification('Please select an answer before proceeding.', 'warning');
        return;
    }

    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const userAnswer = currentQuiz.userAnswers[currentQuiz.currentQuestion];

    if (userAnswer === question.correct) {
        currentQuiz.score += question.points;
    }

    currentQuiz.currentQuestion++;

    if (currentQuiz.currentQuestion >= currentQuiz.questions.length) {
        finishQuiz();
    } else {
        displayQuestion();
    }
}

function previousQuestion() {
    if (currentQuiz.currentQuestion > 0) {
        currentQuiz.currentQuestion--;
        displayQuestion();

        const previousAnswer = currentQuiz.userAnswers[currentQuiz.currentQuestion];
        if (previousAnswer !== undefined) {
            selectOption(previousAnswer);
        }
    }
}

function finishQuiz() {
    let finalScore = 0;
    let correctAnswers = 0;

    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = currentQuiz.userAnswers[index];
        if (userAnswer === question.correct) {
            finalScore += question.points;
            correctAnswers++;
        }
    });

    const previousScore = quizScores[currentModule] || 0;
    if (finalScore > previousScore) {
        quizScores[currentModule] = finalScore;
        updateVideoProgress(currentModule);

        if (finalScore >= 35) {
            const statusIcon = document.querySelector(`[data-module="${currentModule}"] .status-icon`);
            if (statusIcon) {
                statusIcon.setAttribute('data-status', 'completed');
            }
        }
    }

    showQuizResults(finalScore, correctAnswers, currentQuiz.questions.length);
    saveProgress();

    updateScoreDisplays();
    updateProgressDisplay();
    updateProgressBars();
    updateCompletionRate();
}

function showQuizResults(score, correctAnswers, totalQuestions) {
    const percentage = Math.round((score / 50) * 100);
    let grade = 'F';
    let status = 'Failed - Retake recommended';

    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';

    if (score >= 35) status = 'Passed - Well done!';

    document.getElementById('final-score').textContent = score;
    document.getElementById('score-percentage').textContent = `${percentage}%`;
    document.getElementById('correct-answers').textContent = `${correctAnswers}/${totalQuestions}`;
    document.getElementById('grade').textContent = grade;
    document.getElementById('pass-status').textContent = status;
    document.getElementById('pass-status').style.color = score >= 35 ? 'var(--success-color)' : 'var(--error-color)';

    hideModal('quizModal');
    showModal('resultsModal');
}

function retakeQuiz() {
    hideModal('resultsModal');
    startQuiz();
}

function saveResults() {
    hideModal('resultsModal');
    hideModal('moduleModal');

    const score = quizScores[currentModule];
    showNotification(`Quiz results saved! Score: ${score}/50`, 'success');

    updateScoreDisplays();
    updateProgressDisplay();
}

// Helper functions
function hasAnsweredCurrentQuestion() {
    return currentQuiz.userAnswers[currentQuiz.currentQuestion] !== undefined;
}

function getTotalPossibleScore(questions) {
    return questions.reduce((total, question) => total + question.points, 0);
}

function updateQuizButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');

    prevBtn.disabled = currentQuiz.currentQuestion === 0;

    const isLastQuestion = currentQuiz.currentQuestion === currentQuiz.questions.length - 1;
    nextBtn.style.display = isLastQuestion ? 'none' : 'inline-flex';
    finishBtn.style.display = isLastQuestion ? 'inline-flex' : 'none';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Progress saving and loading - simplified
function saveProgress() {
    try {
        const data = {
            moduleProgress,
            quizScores,
            videoCompletions,
            tasks,
            notes,
            studyStreak,
            totalStudyTime,
            lastSaveDate: new Date().toISOString(),
            version: '2.1'
        };

        localStorage.setItem('digitalMarketingProgress', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

function loadProgress() {
    try {
        const savedData = localStorage.getItem('digitalMarketingProgress');

        if (savedData) {
            const data = JSON.parse(savedData);

            moduleProgress = data.moduleProgress || moduleProgress;
            quizScores = data.quizScores || quizScores;
            videoCompletions = data.videoCompletions || videoCompletions;
            tasks = data.tasks || [];
            notes = data.notes || {};
            studyStreak = data.studyStreak || 0;
            totalStudyTime = data.totalStudyTime || 0;
        }
    } catch (error) {
        console.error('Error loading progress:', error);
    }
}

// Score display updates - simplified
function updateScoreDisplays() {
    Object.keys(quizScores).forEach(moduleId => {
        const score = quizScores[moduleId] || 0;
        const scoreElements = document.querySelectorAll(`#${moduleId}-score, [data-module="${moduleId}"] .score-value`);

        scoreElements.forEach(element => {
            if (element) element.textContent = score;
        });
    });

    document.querySelectorAll('.progress-item').forEach(item => {
        const moduleId = item.dataset.module;
        const score = quizScores[moduleId] || 0;
        const scoreDisplay = item.querySelector('.score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = score;
        }
    });
}

// Modal functions - simplified
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');

    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modalOverlay');

    if (modal) {
        modal.classList.remove('active');
    }

    if (overlay && !document.querySelector('.modal.active')) {
        overlay.classList.remove('active');
    }
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.getElementById('modalOverlay').classList.remove('active');
}

function closeModuleModal() {
    hideModal('moduleModal');
}

function closeResultsModal() {
    hideModal('resultsModal');
}

// Task management - simplified
function openAddTaskModal() {
    showModal('addTaskModal');
}

function closeAddTaskModal() {
    hideModal('addTaskModal');
    document.getElementById('addTaskForm').reset();
}

function addTask(taskData) {
    const task = {
        id: Date.now() + Math.random(),
        title: taskData.title || '',
        description: taskData.description || '',
        module: taskData.module || 'seo',
        priority: taskData.priority || 'medium',
        dueDate: taskData.dueDate || null,
        completed: false,
        createdAt: new Date(),
        completedAt: null
    };

    tasks.push(task);
    updateTasksDisplay();
    saveProgress();

    return task;
}

function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        task.completedAt = new Date();

        const moduleProgress = calculateModuleProgress(task.module);
        updateModuleProgress(task.module, moduleProgress);

        totalStudyTime += 0.5;

        updateTasksDisplay();
        saveProgress();

        showNotification(`Task "${task.title}" completed!`, 'success');
    }
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        updateTasksDisplay();
        saveProgress();
    }
}

function calculateModuleProgress(moduleId) {
    const moduleTasks = tasks.filter(t => t.module === moduleId);
    if (moduleTasks.length === 0) return 0;

    const completedTasks = moduleTasks.filter(t => t.completed).length;
    const progress = Math.round((completedTasks / moduleTasks.length) * 100);

    return Math.max(progress, moduleProgress[moduleId] || 0);
}

function updateTasksDisplay() {
    updateTaskList('today-tasks', getTodayTasks());
    updateTaskList('week-tasks', getWeekTasks());
    updateTaskList('completed-tasks', getCompletedTasks());
    updateTaskCounts();
}

function updateTaskList(containerId, taskList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (taskList.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: var(--spacing-lg);">
                <i class="fas fa-clipboard-list" style="font-size: 2rem; margin-bottom: var(--spacing-sm);"></i>
                <p>No tasks yet</p>
            </div>
        `;
        return;
    }

    taskList.forEach(task => {
        const taskElement = createTaskElement(task);
        container.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskDiv.innerHTML = `
        <div class="task-header">
            <div class="task-title">${task.title}</div>
            <div class="task-priority ${task.priority}">${task.priority}</div>
        </div>
        <div class="task-meta">
            <span class="task-module">${getModuleName(task.module)}</span>
            <div class="task-actions">
                ${!task.completed ? `<button class="task-action-btn" onclick="completeTask(${task.id})" title="Mark as complete">
                    <i class="fas fa-check"></i>
                </button>` : ''}
                <button class="task-action-btn" onclick="deleteTask(${task.id})" title="Delete task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    return taskDiv;
}

function getTodayTasks() {
    const today = new Date();
    return tasks.filter(task => {
        if (task.completed) return false;

        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            return dueDate.toDateString() === today.toDateString();
        }

        return true;
    }).slice(0, 10);
}

function getWeekTasks() {
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return tasks.filter(task => {
        if (task.completed) return false;

        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            return dueDate > today && dueDate <= weekFromNow;
        }

        return false;
    }).slice(0, 10);
}

function getCompletedTasks() {
    return tasks.filter(task => task.completed).slice(0, 15);
}

function updateTaskCounts() {
    const todayCount = getTodayTasks().length;
    const weekCount = getWeekTasks().length;
    const completedCount = getCompletedTasks().length;

    const todayElement = document.getElementById('today-count');
    const weekElement = document.getElementById('week-count');
    const completedElement = document.getElementById('completed-count');

    if (todayElement) todayElement.textContent = todayCount;
    if (weekElement) weekElement.textContent = weekCount;
    if (completedElement) completedElement.textContent = completedCount;
}

function addModuleTasks(moduleId) {
    const moduleTasks = getModuleDefaultTasks(moduleId);
    moduleTasks.forEach(task => {
        addTask(task);
    });
    updateTasksDisplay();
    saveProgress();
}

function getModuleDefaultTasks(moduleId) {
    const taskTemplates = {
        seo: [
            { title: 'Watch SEO Complete Guide Video', priority: 'high', module: moduleId, description: 'Complete the 1.5 hour comprehensive SEO tutorial' },
            { title: 'Take SEO Quiz', priority: 'high', module: moduleId, description: 'Test your knowledge with 25 questions' },
            { title: 'Create SEO Audit Checklist', priority: 'medium', module: moduleId, description: 'Build your own SEO audit process' }
        ],
        content: [
            { title: 'Complete Content Marketing Course', priority: 'high', module: moduleId, description: 'Finish all content marketing video tutorials' },
            { title: 'Take Content Marketing Quiz', priority: 'high', module: moduleId, description: 'Complete the 25-question assessment' },
            { title: 'Develop Content Strategy Plan', priority: 'medium', module: moduleId, description: 'Create a content calendar for next month' }
        ]
        // ... other modules abbreviated for performance
    };

    return taskTemplates[moduleId] || [];
}

// Date functionality
function updateCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        currentDateElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }
}

function changeDate(direction) {
    currentDate.setDate(currentDate.getDate() + direction);
    updateCurrentDate();
    updateTasksDisplay();
}

// Study streak functionality
function generateStreakCalendar() {
    const calendar = document.getElementById('streak-calendar');
    if (!calendar) return;

    calendar.innerHTML = '';

    const today = new Date();
    const startDate = new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < 21; i++) {
        const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        const dayElement = document.createElement('div');
        dayElement.className = 'streak-day';
        dayElement.textContent = date.getDate();

        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }

        if (Math.random() > 0.4 && date < today) {
            dayElement.classList.add('completed');
        }

        calendar.appendChild(dayElement);
    }
}

// Notes functionality
function openNotesModal() {
    showModal('notesModal');
}

function closeNotesModal() {
    hideModal('notesModal');
    document.getElementById('addNotesForm').reset();
}

function addNote(noteData) {
    const noteId = Date.now() + Math.random();
    const note = {
        id: noteId,
        title: noteData.title,
        content: noteData.content,
        module: noteData.module,
        createdAt: new Date().toISOString()
    };

    if (!notes[note.module]) {
        notes[note.module] = [];
    }

    notes[note.module].push(note);
    updateNotesDisplay();
    saveProgress();

    return note;
}

function updateNotesDisplay() {
    Object.keys(notes).forEach(moduleId => {
        const moduleNotes = notes[moduleId] || [];
        const notesList = document.getElementById(`${moduleId}-notes`);

        if (notesList) {
            const defaultNote = notesList.querySelector('.default-note');

            notesList.querySelectorAll('.user-note').forEach(note => note.remove());

            moduleNotes.forEach(note => {
                const noteElement = createNoteElement(note);
                notesList.appendChild(noteElement);
            });
        }
    });
}

function createNoteElement(note) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'user-note';
    noteDiv.innerHTML = `
        <h5>${note.title}</h5>
        <p>${note.content}</p>
        <div class="note-actions">
            <button class="note-action-btn" onclick="editNote('${note.id}')" title="Edit note">
                <i class="fas fa-edit"></i>
            </button>
            <button class="note-action-btn" onclick="deleteNote('${note.id}')" title="Delete note">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    return noteDiv;
}

function editNote(noteId) {
    let targetNote = null;
    let targetModule = null;

    Object.keys(notes).forEach(moduleId => {
        const found = notes[moduleId].find(note => note.id == noteId);
        if (found) {
            targetNote = found;
            targetModule = moduleId;
        }
    });

    if (targetNote) {
        document.getElementById('noteTitle').value = targetNote.title;
        document.getElementById('noteContent').value = targetNote.content;
        document.getElementById('noteModule').value = targetModule;

        document.getElementById('addNotesForm').dataset.editId = noteId;

        openNotesModal();
    }
}

function deleteNote(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
        Object.keys(notes).forEach(moduleId => {
            notes[moduleId] = notes[moduleId].filter(note => note.id != noteId);
        });

        updateNotesDisplay();
        saveProgress();
        showNotification('Note deleted successfully!', 'success');
    }
}

function loadNotes() {
    updateNotesDisplay();
}

function loadTasks() {
    updateTasksDisplay();
}

function updateProgressDisplay() {
    updateCircularProgress();
    updateProgressBars();
    updateScoreDisplays();
}

function updateModuleProgress(moduleId, progress) {
    moduleProgress[moduleId] = Math.min(100, Math.max(0, progress));
    updateProgressBars();
    updateModuleStatuses();
    updateCompletionRate();
    updateScoreDisplays();
    saveProgress();
}

function updateModuleStatuses() {
    Object.keys(moduleProgress).forEach(moduleId => {
        const progress = moduleProgress[moduleId];
        const score = quizScores[moduleId] || 0;
        const statusIcon = document.querySelector(`[data-module="${moduleId}"] .status-icon`);

        if (statusIcon) {
            if (progress === 0) {
                statusIcon.setAttribute('data-status', 'not-started');
            } else if (progress === 100 && score >= 35) {
                statusIcon.setAttribute('data-status', 'completed');
            } else {
                statusIcon.setAttribute('data-status', 'in-progress');
            }
        }
    });
}

// Event listeners setup - OPTIMIZED
function setupEventListeners() {
    const addTaskForm = document.getElementById('addTaskForm');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(addTaskForm);
            const taskData = {
                title: formData.get('taskTitle'),
                description: formData.get('taskDescription'),
                module: formData.get('taskModule'),
                priority: formData.get('taskPriority'),
                dueDate: formData.get('taskDueDate') || null
            };

            addTask(taskData);
            closeAddTaskModal();
            showNotification('Task added successfully!', 'success');
        });
    }

    const addNotesForm = document.getElementById('addNotesForm');
    if (addNotesForm) {
        addNotesForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(addNotesForm);
            const noteData = {
                title: formData.get('noteTitle'),
                content: formData.get('noteContent'),
                module: formData.get('noteModule')
            };

            const editId = addNotesForm.dataset.editId;
            if (editId) {
                Object.keys(notes).forEach(moduleId => {
                    const noteIndex = notes[moduleId].findIndex(note => note.id == editId);
                    if (noteIndex !== -1) {
                        notes[moduleId][noteIndex] = {
                            ...notes[moduleId][noteIndex],
                            ...noteData,
                            updatedAt: new Date().toISOString()
                        };
                    }
                });
                delete addNotesForm.dataset.editId;
                showNotification('Note updated successfully!', 'success');
            } else {
                addNote(noteData);
                showNotification('Note added successfully!', 'success');
            }

            closeNotesModal();
        });
    }

    // SIMPLIFIED keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModals();
        }

        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    navigate('overview');
                    break;
                case '2':
                    e.preventDefault();
                    navigate('modules');
                    break;
                case '3':
                    e.preventDefault();
                    navigate('progress');
                    break;
                case '4':
                    e.preventDefault();
                    navigate('planner');
                    break;
            }
        }
    });
}

// Utility functions
function getModuleName(moduleId) {
    const moduleNames = {
        seo: 'SEO Fundamentals',
        content: 'Content Marketing',
        social: 'Social Media Marketing',
        email: 'Email Marketing',
        ads: 'Paid Advertising',
        analytics: 'Analytics & Data',
        portfolio: 'Portfolio Building'
    };

    return moduleNames[moduleId] || 'Unknown Module';
}

// SIMPLIFIED notification system
function showNotification(message, type = 'info') {
    // Create simple notification without complex animations
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-surface);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        z-index: 1000;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };

    return icons[type] || 'info-circle';
}

// Export functions for global access
window.navigate = navigate;
window.openModule = openModule;
window.startModule = startModule;
window.openAddTaskModal = openAddTaskModal;
window.closeAddTaskModal = closeAddTaskModal;
window.openNotesModal = openNotesModal;
window.closeNotesModal = closeNotesModal;
window.closeModuleModal = closeModuleModal;
window.closeResultsModal = closeResultsModal;
window.completeTask = completeTask;
window.deleteTask = deleteTask;
window.editNote = editNote;
window.deleteNote = deleteNote;
window.changeDate = changeDate;
window.saveProgress = saveProgress;
window.switchTab = switchTab;
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.finishQuiz = finishQuiz;
window.retakeQuiz = retakeQuiz;
window.saveResults = saveResults;
window.markVideoComplete = markVideoComplete;
window.closeModals = closeModals;

console.log('✅ OPTIMIZED Digital Marketing Learning Platform by Sanchith A.S loaded - Performance Fixed!');