const baseQuestions = [
            // Extraversion (E)
            { text: "I am someone who tends to be quiet.", singlish: "I quite quiet person one.", trait: "E", reverse: true },
            { text: "I am someone who is dominant, acts as a leader.", singlish: "I quite dominant, like to lead one.", trait: "E", reverse: false },
            { text: "I am someone who is full of energy.", singlish: "I full of energy, very energetic lah.", trait: "E", reverse: false },

            // Agreeableness (A)
            { text: "I am someone who is compassionate, has a soft heart.", singlish: "I very compassionate, got soft heart lor.", trait: "A", reverse: false },
            { text: "I am someone who is sometimes rude to others.", singlish: "I sometimes rude to people lah.", trait: "A", reverse: true },
            { text: "I am someone who assumes the best about people.", singlish: "I assume the best about people, very trusting one.", trait: "A", reverse: false },

            // Conscientiousness (C)
            { text: "I am someone who tends to be disorganised.", singlish: "I tend to be quite messy and disorganised one.", trait: "C", reverse: true },
            { text: "I am someone who has difficulty getting started on tasks.", singlish: "I got difficulty getting started on tasks, very procrastinator.", trait: "C", reverse: true },
            { text: "I am someone who is reliable, can always be counted on.", singlish: "I reliable, can always count on me lor.", trait: "C", reverse: false },

            // Negative Emotionality/Neuroticism (N)
            { text: "I am someone who worries a lot.", singlish: "I worry lots, very kiasu lah.", trait: "N", reverse: false },
            { text: "I am someone who tends to feel depressed, blue.", singlish: "I tend to feel depressed or blue lor.", trait: "N", reverse: false },
            { text: "I am someone who is emotionally stable, not easily upset.", singlish: "I emotionally stable, not easily upset one.", trait: "N", reverse: true },

            // Open-Mindedness (O)
            { text: "I am someone who is fascinated by art, music, or literature.", singlish: "I fascinated by art, music, or literature lor.", trait: "O", reverse: false },
            { text: "I am someone who has little interest in abstract ideas.", singlish: "I got no interest in abstract ideas one.", trait: "O", reverse: true },
            { text: "I am someone who is original, comes up with new ideas.", singlish: "I original, always got new ideas lah.", trait: "O", reverse: false }
        ];

        function getShuffledQuestions() {
            const allQuestions = [];
            baseQuestions.forEach(q => {
                allQuestions.push({ text: q.text, trait: q.trait, reverse: q.reverse, version: 'english' });
                allQuestions.push({ text: q.singlish, trait: q.trait, reverse: q.reverse, version: 'singlish' });
            });

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

        const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8yEjFMgvB2tCtk39hyw19Vmt0AcvjaslCuZjsphpwHdwzzBtoi2XON4vGpLtyyY2e/exec'; // User will set this
        let currentQuestion = 0;
        let answers = new Array(30).fill(null);
        let lastResults = null;
        let lastDominantTrait = null;

        function startQuiz() {
            questions = getShuffledQuestions();
            answers = new Array(30).fill(null);
            currentQuestion = 0;
            document.querySelector('.intro-screen').classList.remove('active');
            document.querySelector('.quiz-screen').classList.add('active');
            displayQuestion();
        }

        function displayQuestion() {
            const q = questions[currentQuestion];
            document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of 30`;
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
            const progress = ((currentQuestion + 1) / 30) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressPercentage').textContent = Math.round(progress) + '%';
        }

        function updateButtons() {
            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            const nextBtn = document.getElementById('nextBtn');

            if (currentQuestion === 29) {
                nextBtn.textContent = 'See Results! 🎉';
                nextBtn.disabled = answers[currentQuestion] === null;
            } else {
                nextBtn.textContent = 'Next ➡️';
                nextBtn.disabled = answers[currentQuestion] === null;
            }
        }

        function nextQuestion() {
            if (answers[currentQuestion] === null) return;

            if (currentQuestion < 29) {
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
                N: { scores: [], name: 'Negative Emotionality', emoji: '😰' },
                O: { scores: [], name: 'Open-Mindedness', emoji: '🌟' }
            };

            const englishTraits = JSON.parse(JSON.stringify(traits));
            const singlishTraits = JSON.parse(JSON.stringify(traits));

            questions.forEach((q, index) => {
                let score = answers[index];
                if (q.reverse) {
                    score = 6 - score;
                }

                if (q.version === 'english') {
                    englishTraits[q.trait].scores.push(score);
                } else {
                    singlishTraits[q.trait].scores.push(score);
                }
            });

            const calculateResults = (traitsObj) => {
                const results = {};
                Object.keys(traitsObj).forEach(key => {
                    const scores = traitsObj[key].scores;
                    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                    results[key] = {
                        score: avg,
                        percentage: ((avg - 1) / 4) * 100,
                        name: traitsObj[key].name,
                        emoji: traitsObj[key].emoji,
                        color: mascots[key].color,
                        colorLight: mascots[key].colorLight
                    };
                });
                return results;
            };

            return {
                english: calculateResults(englishTraits),
                singlish: calculateResults(singlishTraits)
            };
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
            let maxScore = -Infinity;
            let dominantTrait = null;

            Object.keys(results.english).forEach(key => {
                if (results.english[key].score > maxScore) {
                    maxScore = results.english[key].score;
                    dominantTrait = key;
                }
            });

            return dominantTrait;
        }

        function postResultsToSheet(results, dominantTrait) {
            const englishScores = {};
            const singlishScores = {};

            Object.keys(results.english).forEach(key => {
                englishScores[key] = parseFloat(results.english[key].score.toFixed(2));
                singlishScores[key] = parseFloat(results.singlish[key].score.toFixed(2));
            });

            const exportData = {
                timestamp: new Date().toLocaleString(),
                dominantTrait: dominantTrait,
                mascot: mascots[dominantTrait].name,
                english_extraversion: englishScores.E,
                english_agreeableness: englishScores.A,
                english_conscientiousness: englishScores.C,
                english_neuroticism: englishScores.N,
                english_openMindedness: englishScores.O,
                singlish_extraversion: singlishScores.E,
                singlish_agreeableness: singlishScores.A,
                singlish_conscientiousness: singlishScores.C,
                singlish_neuroticism: singlishScores.N,
                singlish_openMindedness: singlishScores.O
            };

            if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                console.log('Google Sheets integration not configured. Results data:', exportData);
                return;
            }

            fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(exportData)
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

            // Main mascot section
            const mascotSection = document.createElement('div');
            mascotSection.className = `mascot-main-section highlighted highlighted-${dominantTrait}`;
            mascotSection.style.background = `linear-gradient(135deg, ${mascots[dominantTrait].color} 0%, ${mascots[dominantTrait].colorLight} 100%)`;
            mascotSection.innerHTML = `
                <div class="mascot-main">
                    <div class="mascot-emoji-large">${mascot.emoji}</div>
                    <div class="mascot-name-large">${mascot.name}</div>
                    <div class="mascot-description-large">${mascot.description}</div>
                </div>
            `;
            container.appendChild(mascotSection);

            // Traits section with unique colors - English version
            const englishTraitsSection = document.createElement('div');
            englishTraitsSection.className = 'traits-section';
            englishTraitsSection.innerHTML = '<h2>English Version</h2>';

            Object.keys(results.english).forEach(key => {
                const trait = results.english[key];
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
                englishTraitsSection.appendChild(card);
            });
            container.appendChild(englishTraitsSection);

            // Traits section - Singlish version
            const singlishTraitsSection = document.createElement('div');
            singlishTraitsSection.className = 'traits-section';
            singlishTraitsSection.innerHTML = '<h2>Singlish Version</h2>';

            Object.keys(results.singlish).forEach(key => {
                const trait = results.singlish[key];
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
                singlishTraitsSection.appendChild(card);
            });
            container.appendChild(singlishTraitsSection);

            // Healthcare Screening Results section (hidden from display but data collected)
            // const healthSection = document.createElement('div');
            // healthSection.className = 'health-section';
            // Removed from results display

            // All mascots section
            const allMascotsSection = document.createElement('div');
            allMascotsSection.className = 'all-mascots-section';
            allMascotsSection.innerHTML = '<h2>All your friends leh!</h2>';

            const mascotsGrid = document.createElement('div');
            mascotsGrid.className = 'mascots-grid';

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

            allMascotsSection.appendChild(mascotsGrid);
            container.appendChild(allMascotsSection);

            // Animate bars
            setTimeout(() => {
                document.querySelectorAll('.trait-bar-fill').forEach(bar => {
                    bar.style.width = bar.style.width;
                });
            }, 100);
        }

        function handleExport() {
            if (lastResults && lastDominantTrait) {
                const englishScores = {};
                const singlishScores = {};

                Object.keys(lastResults.english).forEach(key => {
                    englishScores[key] = parseFloat(lastResults.english[key].score.toFixed(2));
                    singlishScores[key] = parseFloat(lastResults.singlish[key].score.toFixed(2));
                });

                const csvContent = [
                    ['Personality Quiz Results'],
                    ['Timestamp', new Date().toLocaleString()],
                    ['Dominant Trait', mascots[lastDominantTrait].name],
                    [''],
                    ['ENGLISH VERSION'],
                    ['Trait', 'Score', 'Percentage'],
                    ...Object.keys(lastResults.english).map(key => [
                        lastResults.english[key].name,
                        englishScores[key],
                        lastResults.english[key].percentage.toFixed(0) + '%'
                    ]),
                    [''],
                    ['SINGLISH VERSION'],
                    ['Trait', 'Score', 'Percentage'],
                    ...Object.keys(lastResults.singlish).map(key => [
                        lastResults.singlish[key].name,
                        singlishScores[key],
                        lastResults.singlish[key].percentage.toFixed(0) + '%'
                    ])
                ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n');

                downloadCSV(csvContent);
            }
        }

        // Initialize
        displayQuestion();