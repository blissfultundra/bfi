const questions = [
            // Extraversion (E) - 3 items
            { text: "You are the life of the party at gatherings and kopitiam sessions.", trait: "E", reverse: false },
            { text: "You prefer to spend evenings at home alone rather than going out socially.", trait: "E", reverse: true },
            { text: "You naturally start conversations with strangers on the MRT or at hawker centres.", trait: "E", reverse: false },
            
            // Agreeableness (A) - 3 items
            { text: "You genuinely care about other people's feelings and try to be helpful.", trait: "A", reverse: false },
            { text: "You can be blunt and direct, even if it might hurt someone's feelings.", trait: "A", reverse: true },
            { text: "You believe most people are fundamentally good and trustworthy.", trait: "A", reverse: false },
            
            // Conscientiousness (C) - 3 items
            { text: "Your workspace and desk are well-organized and tidy.", trait: "C", reverse: false },
            { text: "You tend to leave things messy and just wing it as you go.", trait: "C", reverse: true },
            { text: "You always plan ahead and rarely leave things until the last minute.", trait: "C", reverse: false },
            
            // Negative Emotionality/Neuroticism (N) - 3 items
            { text: "You worry frequently about things that might go wrong.", trait: "N", reverse: false },
            { text: "You stay calm and composed even when facing difficult situations.", trait: "N", reverse: true },
            { text: "You often feel anxious or stressed, especially about work.", trait: "N", reverse: false },
            
            // Open-Mindedness (O) - 3 items
            { text: "You love trying new experiences, whether it's new restaurants or activities.", trait: "O", reverse: false },
            { text: "You prefer to stick with familiar routines rather than try new things.", trait: "O", reverse: true },
            { text: "You enjoy having deep, intellectual conversations about ideas and concepts.", trait: "O", reverse: false }
        ];

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
                description: 'Wah, you damn happening lah! Super outgoing, damn shiok to hang with one.'
            },
            A: {
                name: 'Chill Otter',
                emoji: '🦦',
                description: 'Steady lah you! Very nice person, always help people and don\'t like to quarrel.'
            },
            C: {
                name: 'Boss Bee',
                emoji: '🐝',
                description: 'Wah you very on one! Super organized, can always count on you to chiong and finish everything.'
            },
            N: {
                name: 'Kiasu Kitten',
                emoji: '🐱',
                description: 'You quite kiasu leh! But that means you care a lot and always think carefully about things.'
            },
            O: {
                name: 'Curious Monkey',
                emoji: '🐵',
                description: 'Wah you very creative sia! Always got new ideas and like to try different things.'
            }
        };

        let currentQuestion = 0;
        let answers = new Array(15).fill(null);

        function startQuiz() {
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
                N: { scores: [], name: 'Negative Emotionality', emoji: '😰' },
                O: { scores: [], name: 'Open-Mindedness', emoji: '🌟' }
            };

            questions.forEach((q, index) => {
                let score = answers[index];
                if (q.reverse) {
                    score = 6 - score; // Reverse scoring
                }
                traits[q.trait].scores.push(score);
            });

            const results = {};
            Object.keys(traits).forEach(key => {
                const scores = traits[key].scores;
                const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                results[key] = {
                    score: avg,
                    percentage: ((avg - 1) / 4) * 100,
                    name: traits[key].name,
                    emoji: traits[key].emoji
                };
            });

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
            let maxScore = -Infinity;
            let dominantTrait = null;
            
            Object.keys(results).forEach(key => {
                if (results[key].score > maxScore) {
                    maxScore = results[key].score;
                    dominantTrait = key;
                }
            });
            
            return dominantTrait;
        }

        function showResults() {
            const results = calculateScores();
            const dominantTrait = getDominantTrait(results);
            const mascot = mascots[dominantTrait];
            
            document.querySelector('.quiz-screen').classList.remove('active');
            document.querySelector('.results').classList.add('active');

            const container = document.getElementById('resultsContainer');
            container.innerHTML = '';

            // Main mascot section
            const mascotSection = document.createElement('div');
            mascotSection.className = 'mascot-main-section';
            mascotSection.innerHTML = `
                <div class="mascot-main">
                    <div class="mascot-emoji-large">${mascot.emoji}</div>
                    <div class="mascot-name-large">${mascot.name}</div>
                    <div class="mascot-description-large">${mascot.description}</div>
                </div>
            `;
            container.appendChild(mascotSection);

            // Traits section
            const traitsSection = document.createElement('div');
            traitsSection.className = 'traits-section';
            
            Object.keys(results).forEach(key => {
                const trait = results[key];
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
                traitsSection.appendChild(card);
            });
            container.appendChild(traitsSection);

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

        // Initialize
        displayQuestion();