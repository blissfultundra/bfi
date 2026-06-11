const baseQuestions = [
            // Extraversion (E)
            { text: "I very quiet one, don't really talk much.", trait: "E", reverse: true },
            { text: "I naturally take charge one, will become leader without planning.", trait: "E", reverse: false },
            { text: "I quite high energy, cannot sit still leh.", trait: "E", reverse: false },

            // Agreeableness (A)
            { text: "I very soft-hearted lah, always feel for people easily.", trait: "A", reverse: false },
            { text: "Sometimes I can be quite rude lah, but aiyah, I don't mean it one.", trait: "A", reverse: true },
            { text: "I always assume people got good intentions one.", trait: "A", reverse: false },

            // Conscientiousness (C)
            { text: "I quite messy; I anyhow organise things.", trait: "C", reverse: true },
            { text: "I got difficulty starting tasks, always drag first one.", trait: "C", reverse: true },
            { text: "I quite reliable lah, people can depend on me one.", trait: "C", reverse: false },

            // Emotionality/Neuroticism (N)
            { text: "I worry a lot sia, small small things also got stress.", trait: "N", reverse: false },
            { text: "I sometimes feel quite down or emo lah.", trait: "N", reverse: false },
            { text: "I quite steady lah, I not so easily upset one.", trait: "N", reverse: true },

            // Open-Mindedness (O)
            { text: "I quite into art, music and literature kind of stuff.", trait: "O", reverse: false },
            { text: "I not really into abstract or cheem ideas one.", trait: "O", reverse: true },
            { text: "I quite creative one, always got new ideas.", trait: "O", reverse: false }
        ];

        function getShuffledQuestions() {
            const allQuestions = [...baseQuestions];

            // Fisher-Yates shuffle
            for (let i = allQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
            }

            return allQuestions;
        }

        let questions = getShuffledQuestions();

        const options = [
            { text: "Definitely lah", value: 5 },
            { text: "Yeah lah, quite true", value: 4 },
            { text: "Aiyah, so-so only", value: 3 },
            { text: "Not really leh", value: 2 },
            { text: "Aiyo, no way liao", value: 1 }
        ];

        const mascots = {
            E: {
                name: 'Party Lion',
                emoji: '🦁',
                description: 'Wah, you damn happening lah! Super outgoing, damn shiok to hang with one.',
                color: '#FF6B6B',
                colorLight: '#FF8E53'
            },
            A: {
                name: 'Chill Otter',
                emoji: '🦦',
                description: 'Steady lah you! Very nice person, always help people and don\'t like to quarrel.',
                color: '#00B4DB',
                colorLight: '#0083B0'
            },
            C: {
                name: 'Boss Bee',
                emoji: '🐝',
                description: 'Wah you very on one! Super organized, can always count on you to chiong and finish everything.',
                color: '#FFD89B',
                colorLight: '#FFC92A'
            },
            N: {
                name: 'Kiasu Kitten',
                emoji: '🐱',
                description: 'You quite kiasu leh! But that means you care a lot and always think carefully about things.',
                color: '#C061F0',
                colorLight: '#E75480'
            },
            O: {
                name: 'Curious Monkey',
                emoji: '🐵',
                description: 'Wah you very creative sia! Always got new ideas and like to try different things.',
                color: '#11998E',
                colorLight: '#38EF7D'
            }
        };

        const themes = {
            disney_princesses: {
                name: 'Disney Princesses',
                characters: {
                    O: { name: 'Belle', description: 'You\'re like Belle - creative, curious, and love learning new things. You see the world through a unique lens and aren\'t afraid to be different!' },
                    C: { name: 'Mulan', description: 'You\'re like Mulan - disciplined, responsible, and determined. You tackle challenges head-on and always see things through to the end.' },
                    E: { name: 'Cinderella', description: 'You\'re like Cinderella - outgoing, charismatic, and the life of the party. People are drawn to your energy and enthusiasm!' },
                    A: { name: 'Snow White', description: 'You\'re like Snow White - kind-hearted, caring, and compassionate. You bring warmth and harmony to everyone around you.' },
                    N: { name: 'Ariel', description: 'You\'re like Ariel - sensitive, introspective, and deeply emotional. You feel things intensely and care deeply about others.' }
                }
            },
            animals: {
                name: 'Animals',
                characters: {
                    O: { name: 'Monkey', description: 'You\'re like a Monkey - curious, creative, and always exploring new possibilities. You love trying new things and thinking outside the box!' },
                    C: { name: 'Bee', description: 'You\'re like a Bee - organized, hardworking, and reliable. You\'re focused on getting things done efficiently and helping others.' },
                    E: { name: 'Lion', description: 'You\'re like a Lion - bold, confident, and commanding. You inspire others with your charisma and natural leadership!' },
                    A: { name: 'Otter', description: 'You\'re like an Otter - friendly, social, and warm-hearted. You bring joy and harmony to your relationships with others.' },
                    N: { name: 'Cat', description: 'You\'re like a Cat - sensitive, thoughtful, and perceptive. You pick up on subtle things and care deeply about your environment.' }
                }
            },
            nucleotide_bases: {
                name: 'Nucleotide Bases',
                characters: {
                    O: { name: 'Adenine', description: 'You\'re like Adenine - paired with creativity and imagination. You bring variety and novelty to everything you do!' },
                    C: { name: 'Guanine', description: 'You\'re like Guanine - paired with structure and organization. You provide stability and ensure things are done right.' },
                    E: { name: 'Cytosine', description: 'You\'re like Cytosine - energetic and dynamic. You connect with others and create excitement wherever you go!' },
                    A: { name: 'Thymine', description: 'You\'re like Thymine - grounded and harmonious. You create balance and bring people together through your kindness.' },
                    N: { name: 'Uracil', description: 'You\'re like Uracil - sensitive and aware. You notice nuances others miss and have a deep inner life.' }
                }
            },
            singapore_dishes: {
                name: 'Singaporean Dishes',
                characters: {
                    O: { name: 'Roti Prata', description: 'You\'re like Roti Prata - versatile, creative, and full of possibilities! You constantly adapt and reinvent yourself.' },
                    C: { name: 'Chicken Rice', description: 'You\'re like Chicken Rice - reliable, classic, and always dependable. You\'re the person people can count on every time.' },
                    E: { name: 'Nasi Lemak', description: 'You\'re like Nasi Lemak - bold, flavorful, and impossible to ignore! You bring excitement and energy to every situation.' },
                    A: { name: 'Ice Kacang', description: 'You\'re like Ice Kacang - sweet, refreshing, and bring comfort to others. You make people feel good just by being around!' },
                    N: { name: 'Chili Crab', description: 'You\'re like Chili Crab - complex, intense, and deeply feeling. You experience emotions on a deeper level than most.' }
                }
            },
            vehicles: {
                name: 'Vehicles',
                characters: {
                    O: { name: 'Airplane', description: 'You\'re like an Airplane - always exploring new horizons and thinking big. You love experiencing new places and ideas!' },
                    C: { name: 'Truck', description: 'You\'re like a Truck - solid, dependable, and hardworking. You get the job done no matter what it takes.' },
                    E: { name: 'Motorbike', description: 'You\'re like a Motorbike - thrilling, adventurous, and full of energy! You bring excitement and speed to everything you do.' },
                    A: { name: 'Car', description: 'You\'re like a Car - practical, reliable, and comfortable. People feel safe and happy being around you.' },
                    N: { name: 'Train', description: 'You\'re like a Train - thoughtful about your path and aware of your surroundings. You move steadily through life with intention.' }
                }
            }
        };

        const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyOPj99L9Q-3m8IwQRcC6O9nEq4aovOPM-WNibrom61k9jWjIg2VrSJqTnGRBcpjgQ9/exec";
        let currentQuestion = 0;
        let answers = new Array(15).fill(null);
        let lastResults = null;
        let lastDominantTrait = null;
        let confettiPlayed = false;
        let selectedTheme = null;
        let quizHistoryResponse = null;

        function startQuiz() {
            // Show the consent modal when the user clicks "Let's Go!"
            document.getElementById('consentModal').classList.add('active');
        }

        function acceptConsent() {
            // Hide the consent modal and show the theme selection screen
            document.getElementById('consentModal').classList.remove('active');
            showThemeSelection();
        }

        function showThemeSelection() {
            // Show the theme selection screen
            document.querySelector('.intro-screen').classList.remove('active');
            document.querySelector('.theme-screen').classList.add('active');
        }

        function selectTheme(theme) {
            // Store the selected theme and proceed with the quiz
            selectedTheme = theme;
            console.log('Selected theme:', theme);
            
            // Also store in localStorage for access on results page
            try {
                localStorage.setItem('bfi_selectedTheme', theme);
            } catch (e) {
                console.warn('Could not persist theme to localStorage', e);
            }
            
            document.querySelector('.theme-screen').classList.remove('active');
            proceedWithQuiz();
        }

        function setQuizHistory(response) {
            // Store the quiz history response
            quizHistoryResponse = response;
            console.log('Quiz history response:', response);
            
            // Also store in localStorage
            try {
                localStorage.setItem('bfi_quizHistory', response);
            } catch (e) {
                console.warn('Could not persist quiz history to localStorage', e);
            }
        }

        function declineConsent() {
            // Close the modal and return to intro screen
            document.getElementById('consentModal').classList.remove('active');
            alert('You must consent to continue with the study. If you change your mind, click "Let\'s Go!" again.');
        }

        function proceedWithQuiz() {
            // Initialize the quiz
            questions = getShuffledQuestions();
            answers = new Array(30).fill(null);
            currentQuestion = 0;
            document.querySelector('.intro-screen').classList.remove('active');
            document.querySelector('.quiz-screen').classList.add('active');
            displayQuestion();
        }

        function displayQuestion() {
            const q = questions[currentQuestion];
            document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of 15`;
            document.getElementById('questionText').textContent = q.text;

            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';

            options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = option.text;
                if (answers[currentQuestion] === option.value) {
                    btn.classList.add('selected');
                }
                btn.onclick = () => selectOption(option.value);
                optionsContainer.appendChild(btn);
            });

            updateProgress();
            updateButtons();
        }

        function selectOption(value) {
            answers[currentQuestion] = value;
            displayQuestion();
        }

        function updateProgress() {
            const progress = ((currentQuestion + 1) / 15) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressPercentage').textContent = Math.round(progress) + '%';
        }

        function updateButtons() {
            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            const nextBtn = document.getElementById('nextBtn');

            if (currentQuestion === 14) {
                nextBtn.textContent = 'See Results! 🎉';
                nextBtn.disabled = answers[currentQuestion] === null;
            } else {
                nextBtn.textContent = 'Next ➡️';
                nextBtn.disabled = answers[currentQuestion] === null;
            }
        }

        function nextQuestion() {
            if (answers[currentQuestion] === null) return;

            if (currentQuestion < 14) {
                currentQuestion++;
                displayQuestion();
            } else {
                showResults();
            }
        }

        function prevQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion();
            }
        }

        function calculateScores() {
            const traits = {
                E: { scores: [], name: 'Extraversion', emoji: '🎉' },
                A: { scores: [], name: 'Agreeableness', emoji: '🤝' },
                C: { scores: [], name: 'Conscientiousness', emoji: '📋' },
                N: { scores: [], name: 'Emotionality', emoji: '😰' },
                O: { scores: [], name: 'Open-Mindedness', emoji: '🌟' }
            };

            questions.forEach((q, index) => {
                let score = answers[index];
                if (q.reverse) {
                    score = 6 - score;
                }
                traits[q.trait].scores.push(score);
            });

            const results = {};
            Object.keys(traits).forEach(key => {
                const scores = traits[key].scores;
                const total = scores.reduce((a, b) => a + b, 0);
                results[key] = {
                    score: total,
                    percentage: ((total - 3) / 12) * 100,
                    name: traits[key].name,
                    emoji: traits[key].emoji,
                    color: mascots[key].color,
                    colorLight: mascots[key].colorLight
                };
            });
            return results;
        }

        function getAverageResults(results) {
            return results;
        }

        function getDescription(trait, score) {
            const descriptions = {
                E: {
                    high: "Wah you damn extroverted lah! Party animal type - confirm plus chop the life of every gathering. You love making new friends and sibeh vocal one. Probably your phone always got 99+ WhatsApp notifications.",
                    low: "You more introverted lah, prefer small gatherings or stay home shiok shiok. Not that you don't like people, but too much socializing makes you sian. Your ideal Friday night is Netflix and chill at home, not Clarke Quay."
                },
                A: {
                    high: "Super agreeable! You the type who always think of others first, very accommodating and kind-hearted. When your friends need help, you drop everything to help them. Sometimes must remember to take care of yourself also hor!",
                    low: "You quite straight-forward and direct lah. Tell things as it is, don't really sugarcoat. Not that you're mean, but you value honesty over making everyone happy. Some people might find you blunt, but at least you genuine!"
                },
                C: {
                    high: "Damn organized and responsible sia! Your life got structure, everything planned properly. You the type who color-code your calendar and actually stick to your to-do list. Boss sure like you one!",
                    low: "You more spontaneous and flexible lah. Planning is not really your strong suit - you prefer to wing it and see how. Your room might be messy but somehow you function okay mah. YOLO mindset!"
                },
                N: {
                    high: "You quite sensitive to stress leh. Small things also can make you worried or anxious. Must learn to relax more hor! Maybe go exercise or meditation - cannot always stress until cannot sleep.",
                    low: "Sibeh steady pom pi pi! You very emotionally stable, not easily stressed or upset. Even when things go wrong, you can handle it calmly. This one good quality lah, but remember to still show emotions sometimes!"
                },
                O: {
                    high: "Very open-minded and creative! You love new experiences, always exploring and trying different things. Confirm the type who will eat at new restaurant or travel to ulu places. Your Instagram probably very interesting!",
                    low: "You prefer what's familiar and comfortable lah. Routine is good for you - same hawker stall, same coffee order, same route to work. Not boring, just you know what you like! Why change when current one okay already?"
                }
            };

            return score >= 50 ? descriptions[trait].high : descriptions[trait].low;
        }

        function getDominantTrait(results) {
            const average = getAverageResults(results);
            let maxScore = -Infinity;
            let dominantTrait = null;

            Object.keys(average).forEach(key => {
                if (average[key].score > maxScore) {
                    maxScore = average[key].score;
                    dominantTrait = key;
                }
            });

            return dominantTrait;
        }

        function postResultsToSheet(results, dominantTrait) {
            const scores = {};

            Object.keys(results).forEach(key => {
                scores[key] = parseFloat(results[key].score.toFixed(2));
            });

            console.log('Posting to Google Sheets - Trait Scores:', scores);

            const exportData = {
                timestamp: new Date().toLocaleString(),
                dominant_trait: dominantTrait,
                extraversion: scores.E,
                agreeableness: scores.A,
                conscientiousness: scores.C,
                neuroticism: scores.N,
                open_mindedness: scores.O,
                quiz_history: quizHistoryResponse || 'not specified'
            };

            if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                console.log('Google Sheets integration not configured. Results data:', exportData);
                return;
            }

            const params = new URLSearchParams();
            Object.entries(exportData).forEach(([key, value]) => {
                params.append(key, value);
            });

            fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: params.toString()
            })
            .then(response => response.json())
            .then(data => {
                console.log('Results posted to Google Sheets');
            })
            .catch(error => {
                console.error('Error posting to Google Sheets:', error);
            });
        }



        function showResults() {
            const results = calculateScores();
            const dominantTrait = getDominantTrait(results);
            const mascot = mascots[dominantTrait];

            // Store globally
            lastResults = results;
            lastDominantTrait = dominantTrait;

            // Post results to Google Sheet
            postResultsToSheet(results, dominantTrait);

            document.querySelector('.quiz-screen').classList.remove('active');
            document.querySelector('.results').classList.add('active');

            const container = document.getElementById('resultsContainer');
            container.innerHTML = '';

            // Check if a theme was selected
            const themedCharacter = selectedTheme && themes[selectedTheme] ? themes[selectedTheme].characters[dominantTrait] : null;

            // Main mascot/character section
            const mascotSection = document.createElement('div');
            mascotSection.className = `mascot-main-section highlighted highlighted-${dominantTrait}`;
            mascotSection.style.background = `linear-gradient(135deg, ${mascots[dominantTrait].color} 0%, ${mascots[dominantTrait].colorLight} 100%)`;
            
            if (themedCharacter) {
                // Display themed character
                mascotSection.innerHTML = `
                    <div class="mascot-main">
                        <div class="mascot-name-large">${themedCharacter.name}</div>
                        <div class="mascot-description-large">${themedCharacter.description}</div>
                    </div>
                `;
            } else {
                // Display default mascot
                mascotSection.innerHTML = `
                    <div class="mascot-main">
                        <div class="mascot-emoji-large">${mascot.emoji}</div>
                        <div class="mascot-name-large">${mascot.name}</div>
                        <div class="mascot-description-large">${mascot.description}</div>
                    </div>
                `;
            }
            container.appendChild(mascotSection);

            // Combined trait scores
            const averageResults = getAverageResults(results);
            const averageTraitsSection = document.createElement('div');
            averageTraitsSection.className = 'traits-section';
            averageTraitsSection.innerHTML = '<h2>Your Trait Scores</h2>';

            Object.keys(averageResults).forEach(key => {
                const trait = averageResults[key];
                const card = document.createElement('div');
                card.className = 'trait-card';
                card.innerHTML = `
                    <div class="trait-header">
                        <div class="trait-name">
                            <span class="emoji">${trait.emoji}</span>
                            ${trait.name}
                        </div>
                        <div class="trait-score">${trait.percentage.toFixed(0)}%</div>
                    </div>
                    <div class="trait-bar">
                        <div class="trait-bar-fill" style="width: ${trait.percentage}%"></div>
                    </div>
                    <div class="trait-description">
                        ${getDescription(key, trait.percentage)}
                    </div>
                `;
                averageTraitsSection.appendChild(card);
            });
            container.appendChild(averageTraitsSection);

            // Healthcare Screening Results section (hidden from display but data collected)
            // const healthSection = document.createElement('div');
            // healthSection.className = 'health-section';
            // Removed from results display

            // All mascots/characters section
            const allMascotsSection = document.createElement('div');
            allMascotsSection.className = 'all-mascots-section';
            allMascotsSection.innerHTML = '<h2>All your friends leh!</h2>';

            const mascotsGrid = document.createElement('div');
            mascotsGrid.className = 'mascots-grid';

            // Check if a theme was selected
            if (themedCharacter && selectedTheme && themes[selectedTheme]) {
                // Display theme-specific characters
                const themeData = themes[selectedTheme];
                Object.keys(themeData.characters).forEach(key => {
                    const char = themeData.characters[key];
                    const isUserCharacter = key === dominantTrait;
                    const charCard = document.createElement('div');
                    charCard.className = `mascot-card ${isUserCharacter ? `highlighted highlighted-${key}` : ''}`;
                    charCard.innerHTML = `
                        <div class="mascot-name">${char.name}</div>
                        <div class="mascot-description">${char.description}</div>
                        ${isUserCharacter ? '<div class="user-mascot-badge">IT\'S YOU!</div>' : ''}
                    `;
                    mascotsGrid.appendChild(charCard);
                });
            } else {
                // Display default mascots
                Object.keys(mascots).forEach(key => {
                    const m = mascots[key];
                    const isUserMascot = key === dominantTrait;
                    const mascotCard = document.createElement('div');
                    mascotCard.className = `mascot-card ${isUserMascot ? `highlighted highlighted-${key}` : ''}`;
                    mascotCard.innerHTML = `
                        <div class="mascot-emoji">${m.emoji}</div>
                        <div class="mascot-name">${m.name}</div>
                        <div class="mascot-description">${m.description}</div>
                        ${isUserMascot ? '<div class="user-mascot-badge">IT\'S YOU!</div>' : ''}
                    `;
                    mascotsGrid.appendChild(mascotCard);
                });
            }

            allMascotsSection.appendChild(mascotsGrid);
            container.appendChild(allMascotsSection);

            // Persist results so the separate results page can read them
            try {
                localStorage.setItem('bfi_lastResults', JSON.stringify({ results, dominantTrait, theme: selectedTheme, themedCharacter: themedCharacter }));
            } catch (e) {
                console.warn('Could not persist results to localStorage', e);
            }

            // Add a button to open the dedicated results page
            const viewPageWrapper = document.createElement('div');
            viewPageWrapper.className = 'view-results-page-wrapper';
            viewPageWrapper.innerHTML = `
                <a class="btn view-results-page-btn" href="live results.html" target="_self">📊 See Everyone's Results</a>
                <a class="btn" href="index.html">🔄 Take Quiz Again</a>
            `;
            container.appendChild(viewPageWrapper);

            // Launch confetti celebration once
            if (!confettiPlayed && typeof launchConfetti === 'function') {
                launchConfetti(100);
                confettiPlayed = true;
            }

            // Animate bars
            setTimeout(() => {
                document.querySelectorAll('.trait-bar-fill').forEach(bar => {
                    bar.style.width = bar.style.width;
                });
            }, 100);
        }

// --- Lightweight confetti engine ---
(function(){
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    let particles = [];
    const colors = ['#FF6B6B','#FF8E53','#00B4DB','#0083B0','#FFD89B','#FFC92A','#C061F0','#E75480','#11998E','#38EF7D'];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function rand(min, max){ return Math.random() * (max - min) + min; }

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: rand(-6,6),
            vy: rand(-10,-2),
            size: rand(6,12),
            color: colors[Math.floor(Math.random()*colors.length)],
            rot: rand(0,360),
            drag: 0.01 + Math.random()*0.02,
            gravity: 0.15 + Math.random()*0.12,
            ttl: 80 + Math.floor(Math.random()*40)
        };
    }

    let rafId = null;
    function render() {
        ctx.clearRect(0,0,W,H);
        for (let i = particles.length-1; i >= 0; i--) {
            const p = particles[i];
            p.vx *= (1 - p.drag);
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vx * 0.5;
            p.ttl--;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
            ctx.restore();

            if (p.ttl <= 0 || p.y > H + 50) particles.splice(i,1);
        }

        if (particles.length) rafId = requestAnimationFrame(render);
        else {
            cancelAnimationFrame(rafId);
            rafId = null;
            ctx.clearRect(0,0,W,H);
        }
    }

    // confetti!
    window.launchConfetti = function(duration){
        const end = Date.now() + (duration || 3000);
        const centreX = W/2;
        const centreY = H*0.18;

        function burst(){
            // spawn multiple particles each frame while time remains
            if (Date.now() < end) {
                for (let i=0;i<12;i++) particles.push(createParticle(centreX + rand(-120,120), centreY + rand(-20,40)));
                if (!rafId) render();
                requestAnimationFrame(burst);
            }
        }
        burst();
    };
})();

        function handleExport() {
            if (lastResults && lastDominantTrait) {
                const csvContent = [
                    ['Personality Quiz Results'],
                    ['Timestamp', new Date().toLocaleString()],
                    ['Dominant Trait', mascots[lastDominantTrait].name],
                    [''],
                    ['Trait', 'Score', 'Percentage'],
                    ...Object.keys(lastResults).map(key => [
                        lastResults[key].name,
                        parseFloat(lastResults[key].score.toFixed(2)),
                        lastResults[key].percentage.toFixed(0) + '%'
                    ])
                ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n');

                downloadCSV(csvContent);
            }
        }

        // Initialize
        displayQuestion();