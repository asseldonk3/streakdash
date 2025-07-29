// Marvel characters from CSV data
const marvelCharacters = [
    { name: "Hawkeye", fullName: "Clint Barton", description: "Expert marksman no super strength", points: 5 },
    { name: "Black Widow", fullName: "Natasha Romanoff", description: "Peak human agility and combat", points: 11 },
    { name: "Nick Fury", fullName: "", description: "Tactical genius no enhancements", points: 18 },
    { name: "Daredevil", fullName: "Matt Murdock", description: "Enhanced senses but human strength", points: 26 },
    { name: "Moon Knight", fullName: "Marc Spector", description: "Peak human sometimes mystically boosted", points: 35 },
    { name: "Punisher", fullName: "Frank Castle", description: "Military-level strength but human", points: 45 },
    { name: "Shang-Chi", fullName: "", description: "World's best martial artist still human", points: 56 },
    { name: "Kate Bishop", fullName: "", description: "Similar to Hawkeye in skills and strength", points: 68 },
    { name: "Elektra", fullName: "", description: "Highly trained assassin no superhuman powers", points: 81 },
    { name: "Falcon", fullName: "Sam Wilson", description: "Flight tech but physically normal", points: 95 },
    { name: "Winter Soldier", fullName: "Bucky Barnes", description: "Cybernetic arm boosts strength", points: 110 },
    { name: "Captain America", fullName: "Steve Rogers", description: "Peak super-soldier can lift ~1100 lbs", points: 126 },
    { name: "Black Panther", fullName: "T'Challa", description: "Enhanced agility and strength from the herb", points: 143 },
    { name: "Wolverine", fullName: "Logan", description: "Healing claws and animal-like strength", points: 161 },
    { name: "Gamora", fullName: "", description: "Cybernetic enhancements daughter of Thanos", points: 180 },
    { name: "Nebula", fullName: "", description: "Cybernetic strength and durability", points: 200 },
    { name: "Spider-Man", fullName: "Peter Parker", description: "Can lift ~10 tons very agile", points: 221 },
    { name: "She-Hulk", fullName: "Jennifer Walters", description: "Hulk-level strength slightly less than Bruce", points: 243 },
    { name: "Jessica Jones", fullName: "", description: "Superhuman strength and durability", points: 266 },
    { name: "Luke Cage", fullName: "", description: "Super strong and nearly invulnerable skin", points: 290 },
    { name: "Ant-Man", fullName: "Scott Lang", description: "Giant form allows him to lift tons", points: 315 },
    { name: "Wasp", fullName: "Hope Van Dyne", description: "Shrinking tech with sting blasts", points: 341 },
    { name: "Iron Fist", fullName: "Danny Rand", description: "Focused chi gives bursts of enhanced strength", points: 368 },
    { name: "War Machine", fullName: "James Rhodes", description: "Iron Man–like armored strength", points: 396 },
    { name: "Iron Man", fullName: "Tony Stark", description: "Depends on suit Hulkbuster rivals Hulk", points: 425 },
    { name: "Vision", fullName: "", description: "Density manipulation makes him ultra-strong", points: 455 },
    { name: "Ms. Marvel", fullName: "Kamala Khan", description: "Morphing body parts with enhanced strength", points: 486 },
    { name: "Quake", fullName: "Daisy Johnson", description: "Can shatter concrete and people with her powers", points: 518 },
    { name: "Captain Britain", fullName: "", description: "Super strength tied to Britain's mystical energies", points: 551 },
    { name: "Storm", fullName: "Ororo Munroe", description: "Weather control with lightning-level power", points: 585 },
    { name: "Doctor Strange", fullName: "", description: "Mystic Arts allow reality-bending strength", points: 620 },
    { name: "Scarlet Witch", fullName: "Wanda Maximoff", description: "Chaos magic warps reality", points: 656 },
    { name: "Captain Marvel", fullName: "Carol Danvers", description: "Cosmic strength flight and blasts", points: 693 },
    { name: "Thor", fullName: "Odinson", description: "Norse god wields Mjolnir extreme strength", points: 731 },
    { name: "Hercules", fullName: "", description: "Stronger than Thor in hand-to-hand combat", points: 770 },
    { name: "Beta Ray Bill", fullName: "", description: "Comparable to Thor worthy of Stormbreaker", points: 810 },
    { name: "Blue Marvel", fullName: "", description: "Can lift millions of tons rivals Sentry", points: 851 },
    { name: "Sentry", fullName: "Robert Reynolds", description: "Power of a million exploding suns", points: 893 },
    { name: "Nova", fullName: "Richard Rider", description: "Cosmic-powered super strength and flight", points: 936 },
    { name: "Jean Grey", fullName: "Phoenix", description: "Phoenix Force gives cosmic-level power", points: 980 },
    { name: "Ikaris", fullName: "Eternals", description: "Immense strength flight eye beams", points: 1025 },
    { name: "Gilgamesh", fullName: "Eternals", description: "Strongest Eternal raw power tank", points: 1071 },
    { name: "Thena", fullName: "Eternals", description: "Not as strong as Gilgamesh but enhanced", points: 1118 },
    { name: "Adam Warlock", fullName: "", description: "Cosmic being with immense strength and energy", points: 1166 },
    { name: "Silver Surfer", fullName: "Norrin Radd", description: "Power Cosmic strength speed invulnerability", points: 1215 },
    { name: "Ghost Rider", fullName: "Johnny Blaze", description: "Superhuman strength plus Hellfire", points: 1265 },
    { name: "Doctor Voodoo", fullName: "Jericho Drumm", description: "Mystical strength through Loa", points: 1316 },
    { name: "Hope Summers", fullName: "", description: "Can mimic Omega-level powers like strength", points: 1368 },
    { name: "Franklin Richards", fullName: "", description: "Reality warping near-omnipotent", points: 1421 },
    { name: "The One Above All", fullName: "as good entity", description: "Creator of Marvel Universe ultimate power", points: 1475 }
];

// Initialize variables
let streakData = {
    count: 0,
    lastDate: null,
    currentCharacterIndex: 0,
    todayStreaks: 0,
    lastStreakTime: null,
    dailyStreakTimes: [],
    todayReasons: [],
    allReasons: [],
    penaltyPoints: 0,
    lastPenaltyCheck: null
};

// Marvel villains for penalty laughs
const marvelVillains = [
    { name: "Loki", quote: "MWAHAHAHA! Your dedication wavers, mortal!", tier: 2 },
    { name: "Thanos", quote: "Inevitable... just like your failure.", tier: 4 },
    { name: "Green Goblin", quote: "HEHEHE! You can't even keep a simple streak!", tier: 2 },
    { name: "Doctor Doom", quote: "Doom laughs at your weakness! BWAHAHA!", tier: 4 },
    { name: "Magneto", quote: "Pathetic! Even humans should do better than this.", tier: 3 },
    { name: "Red Skull", quote: "Your lack of discipline amuses me! MUAHAHAHA!", tier: 3 },
    { name: "Ultron", quote: "Human inconsistency... how predictable. *mechanical laugh*", tier: 3 },
    { name: "Venom", quote: "We are... disappointed! HSSSS-HAHAHA!", tier: 2 },
    { name: "Kingpin", quote: "In my business, consistency is everything. You've failed.", tier: 2 },
    { name: "Mysterio", quote: "Is this an illusion, or are you really this bad? AHAHAHA!", tier: 1 },
    { name: "Shocker", quote: "Shocked by your own incompetence? BZZT-HAHA!", tier: 1 },
    { name: "Vulture", quote: "Your streak has crashed and burned! SCREEECH!", tier: 1 }
];

// Load data when popup opens
document.addEventListener('DOMContentLoaded', async () => {
    await loadStreakData();
    
    // Check and apply penalties
    checkAndApplyPenalties();
    
    updateUI();
    
    // Check if we're still in cooldown
    checkCooldownOnLoad();
    
    // Add click event to streak button
    document.getElementById('streak-button').addEventListener('click', handleStreakClick);
    
    // Add toggle for achievements
    document.querySelector('.achievements-header').addEventListener('click', () => {
        document.getElementById('today-reasons').classList.toggle('show');
    });
});

// Check if cooldown is still active when popup opens
function checkCooldownOnLoad() {
    const now = new Date();
    const today = now.toDateString();
    
    // Reset daily counters if it's a new day
    if (streakData.lastDate !== today && streakData.todayStreaks > 0) {
        streakData.todayStreaks = 0;
        streakData.dailyStreakTimes = [];
        streakData.lastStreakTime = null;
        streakData.todayReasons = [];
        return;
    }
    
    // Check if we're in cooldown
    if (streakData.lastStreakTime && streakData.todayStreaks < 5) {
        const timeSinceLastStreak = now.getTime() - streakData.lastStreakTime;
        const cooldownDuration = 20 * 60 * 1000; // 20 minutes
        
        if (timeSinceLastStreak < cooldownDuration) {
            startCooldownTimer(cooldownDuration - timeSinceLastStreak);
        }
    }
    
    // Disable button if max daily streaks reached
    if (streakData.todayStreaks >= 5) {
        const button = document.getElementById('streak-button');
        button.querySelector('.button-text').textContent = 'Max Daily Streaks';
        button.disabled = true;
    }
}

// Load streak data from Chrome storage
async function loadStreakData() {
    try {
        const result = await chrome.storage.local.get(['streakData']);
        if (result.streakData) {
            streakData = result.streakData;
        }
    } catch (error) {
        console.error('Error loading streak data:', error);
    }
}

// Save streak data to Chrome storage
async function saveStreakData() {
    try {
        await chrome.storage.local.set({ streakData: streakData });
    } catch (error) {
        console.error('Error saving streak data:', error);
    }
}

// Get character by current streak count
function getCharacterByStreak(streakCount) {
    // Find the highest character the user has unlocked based on streak count
    let characterIndex = 0;
    
    for (let i = marvelCharacters.length - 1; i >= 0; i--) {
        if (streakCount >= marvelCharacters[i].points) {
            characterIndex = i;
            break;
        }
    }
    
    return characterIndex;
}

// Calculate effective streak count (with penalties)
function getEffectiveStreakCount() {
    return Math.max(0, streakData.count - streakData.penaltyPoints);
}

// Check and apply penalties for missed streaks
function checkAndApplyPenalties() {
    if (!streakData.lastStreakTime || streakData.count === 0) {
        return; // No penalties for new users or reset streaks
    }
    
    const now = new Date().getTime();
    const timeSinceLastStreak = now - streakData.lastStreakTime;
    const hoursSinceLastStreak = timeSinceLastStreak / (1000 * 60 * 60);
    
    // Calculate how many 24-hour periods have passed
    const missedPeriods = Math.floor(hoursSinceLastStreak / 24);
    
    // Calculate new penalties
    const newPenalties = missedPeriods * 10;
    
    // Check if we need to apply new penalties
    if (newPenalties > streakData.penaltyPoints) {
        const penaltyDifference = newPenalties - streakData.penaltyPoints;
        streakData.penaltyPoints = newPenalties;
        
        // Show villain laugh for the new penalty
        if (penaltyDifference > 0) {
            showVillainLaugh(missedPeriods);
        }
        
        // Check if character needs to be downgraded
        const effectiveCount = getEffectiveStreakCount();
        const newCharacterIndex = getCharacterByStreak(effectiveCount);
        if (newCharacterIndex < streakData.currentCharacterIndex) {
            streakData.currentCharacterIndex = newCharacterIndex;
        }
        
        // Save updated data
        saveStreakData();
    }
}

// Handle streak button click
async function handleStreakClick() {
    const now = new Date();
    const today = now.toDateString();
    const currentTime = now.getTime();
    
    // Check if it's a new day
    if (streakData.lastDate !== today) {
        // Reset daily counters
        streakData.todayStreaks = 0;
        streakData.dailyStreakTimes = [];
        streakData.todayReasons = [];
        
        // Check if streak should be reset (missed a day)
        if (streakData.lastDate) {
            const lastDateObj = new Date(streakData.lastDate);
            const todayObj = new Date(today);
            const dayDiff = Math.floor((todayObj - lastDateObj) / (1000 * 60 * 60 * 24));
            
            if (dayDiff > 1) {
                // Missed a day, reset total streak
                streakData.count = 0;
                streakData.currentCharacterIndex = 0;
                streakData.allReasons = [];
                showMessage("Streak reset! Starting fresh.");
            }
        }
    }
    
    // Check if max daily streaks reached
    if (streakData.todayStreaks >= 5) {
        showMessage("You've reached the maximum 5 streaks for today!");
        return;
    }
    
    // Check 20-minute cooldown
    if (streakData.lastStreakTime) {
        const timeSinceLastStreak = currentTime - streakData.lastStreakTime;
        const minutesSinceLastStreak = timeSinceLastStreak / (1000 * 60);
        
        if (minutesSinceLastStreak < 20) {
            const remainingMinutes = Math.ceil(20 - minutesSinceLastStreak);
            showMessage(`Please wait ${remainingMinutes} more minutes before next streak!`);
            startCooldownTimer(20 * 60 * 1000 - timeSinceLastStreak);
            return;
        }
    }
    
    // Get and validate reason
    const reasonInput = document.getElementById('streak-reason');
    const reason = reasonInput.value.trim();
    
    // Validate word count (max 15 words)
    const wordCount = reason.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount > 15) {
        showMessage("Please keep your reason to 15 words or less!");
        return;
    }
    
    // Add streak
    streakData.count++;
    streakData.todayStreaks++;
    streakData.lastDate = today;
    streakData.lastStreakTime = currentTime;
    streakData.dailyStreakTimes.push(currentTime);
    
    // Reset penalties when streak is recorded
    if (streakData.penaltyPoints > 0) {
        showMessage(`Penalty cleared! +${streakData.penaltyPoints} points restored!`);
        streakData.penaltyPoints = 0;
    }
    
    // Store reason with timestamp
    const streakEntry = {
        time: currentTime,
        reason: reason || "No reason provided",
        streakNumber: streakData.count
    };
    streakData.todayReasons.push(streakEntry);
    streakData.allReasons.push(streakEntry);
    
    // Clear the input field
    reasonInput.value = '';
    
    // Check if we unlocked a new character
    const effectiveCount = getEffectiveStreakCount();
    const newCharacterIndex = getCharacterByStreak(effectiveCount);
    if (newCharacterIndex > streakData.currentCharacterIndex) {
        streakData.currentCharacterIndex = newCharacterIndex;
        showLevelUpAnimation();
    }
    
    // Add animation to button
    const button = document.getElementById('streak-button');
    button.classList.add('animate');
    setTimeout(() => button.classList.remove('animate'), 500);
    
    // Start cooldown timer if not at max daily streaks
    if (streakData.todayStreaks < 5) {
        startCooldownTimer(20 * 60 * 1000); // 20 minutes in milliseconds
    }
    
    // Save and update UI
    await saveStreakData();
    updateUI();
}

// Start cooldown timer
let cooldownInterval;
function startCooldownTimer(duration) {
    // Clear any existing timer
    if (cooldownInterval) {
        clearInterval(cooldownInterval);
    }
    
    const button = document.getElementById('streak-button');
    const buttonText = button.querySelector('.button-text');
    const originalText = buttonText.textContent;
    
    let remaining = duration;
    
    const updateTimer = () => {
        if (remaining <= 0) {
            clearInterval(cooldownInterval);
            button.querySelector('.button-text').textContent = originalText;
            button.disabled = false;
            return;
        }
        
        const minutes = Math.floor(remaining / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        button.querySelector('.button-text').textContent = `Wait ${minutes}:${seconds.toString().padStart(2, '0')}`;
        button.disabled = true;
        
        remaining -= 1000;
    };
    
    updateTimer();
    cooldownInterval = setInterval(updateTimer, 1000);
}

// Get character image filename
function getCharacterImageFilename(character) {
    // Convert character name to icon filename format
    let filename = character.name.toLowerCase()
        .replace(/[()]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\./g, '');
    
    // Special cases for character names
    const nameMap = {
        'the one above all': 'the-one-above-all'
    };
    
    if (nameMap[filename]) {
        filename = nameMap[filename];
    }
    
    return `/images/marvel/icons/${filename}.png`;
}

// Generate character image with initials (fallback)
function generateCharacterImage(character) {
    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background based on character power level
    const gradient = ctx.createRadialGradient(60, 60, 0, 60, 60, 60);
    const hue = (character.points / 1500) * 300; // Color from red to purple based on power
    gradient.addColorStop(0, `hsl(${hue}, 70%, 50%)`);
    gradient.addColorStop(1, `hsl(${hue}, 70%, 30%)`);
    
    // Draw circle
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(60, 60, 58, 0, Math.PI * 2);
    ctx.fill();
    
    // Add border
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Get initials
    const nameParts = character.name.split(' ');
    const initials = nameParts.map(part => part[0]).join('').slice(0, 2);
    
    // Draw initials
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 60, 60);
    
    return canvas.toDataURL();
}

// Update the UI with current data
function updateUI() {
    // Calculate effective streak count
    const effectiveCount = getEffectiveStreakCount();
    
    // Update streak count display
    document.getElementById('streak-count').textContent = effectiveCount;
    
    // Show penalty indicator if any
    const penaltyIndicator = document.getElementById('penalty-indicator');
    if (streakData.penaltyPoints > 0) {
        penaltyIndicator.textContent = `(-${streakData.penaltyPoints} penalty)`;
        penaltyIndicator.style.display = 'block';
    } else {
        penaltyIndicator.style.display = 'none';
    }
    
    // Update daily streak count
    const today = new Date().toDateString();
    if (streakData.lastDate !== today) {
        // Reset if it's a new day
        streakData.todayStreaks = 0;
    }
    document.getElementById('daily-count').textContent = streakData.todayStreaks || 0;
    
    // Get current character based on effective count
    const characterIndex = getCharacterByStreak(effectiveCount);
    const character = marvelCharacters[characterIndex] || marvelCharacters[0];
    
    // Update character info
    document.getElementById('character-name').textContent = character.name;
    document.getElementById('character-level').textContent = characterIndex + 1;
    
    // Set character image
    const characterImage = document.getElementById('character-image');
    characterImage.src = getCharacterImageFilename(character);
    characterImage.onerror = function() {
        // If actual image doesn't exist, use generated fallback
        this.src = generateCharacterImage(character);
    };
    
    // Update progress to next character
    let progressPercent = 0;
    let progressLabel = document.getElementById('progress-label');
    
    if (characterIndex < marvelCharacters.length - 1) {
        const nextCharacter = marvelCharacters[characterIndex + 1];
        const currentPoints = character.points;
        const nextPoints = nextCharacter.points;
        
        const progressCurrent = effectiveCount - currentPoints;
        const progressTotal = nextPoints - currentPoints;
        progressPercent = (progressCurrent / progressTotal) * 100;
        
        progressLabel.textContent = `${nextCharacter.name} in ${nextPoints - effectiveCount} days`;
    } else {
        // Max level reached
        progressPercent = 100;
        progressLabel.textContent = 'Maximum Power Achieved! 🏆';
    }
    
    document.getElementById('progress-fill').style.width = Math.min(100, Math.max(0, progressPercent)) + '%';
    
    // Show warning if close to penalty
    showPenaltyWarning();
    
    // Show character description as tooltip
    characterImage.title = character.description;
    
    // Update today's reasons
    updateTodayReasons();
}

// Update today's reasons display
function updateTodayReasons() {
    const reasonsContainer = document.getElementById('today-reasons');
    const reasonsList = document.getElementById('reasons-list');
    
    // Clear existing reasons
    reasonsList.innerHTML = '';
    
    // Check if we have reasons for today
    if (streakData.todayReasons && streakData.todayReasons.length > 0) {
        reasonsContainer.classList.add('show');
        
        // Add each reason
        streakData.todayReasons.forEach((entry, index) => {
            const reasonItem = document.createElement('div');
            reasonItem.className = 'reason-item';
            
            const time = new Date(entry.time);
            const timeStr = time.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
            
            reasonItem.innerHTML = `
                <span class="reason-time">${timeStr}</span>
                <div>${entry.reason}</div>
            `;
            
            reasonsList.appendChild(reasonItem);
        });
    } else {
        reasonsContainer.classList.remove('show');
    }
}

// Show a temporary message
function showMessage(text) {
    const messageEl = document.createElement('div');
    messageEl.className = 'temp-message';
    messageEl.textContent = text;
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

// Show level up animation
function showLevelUpAnimation() {
    const character = marvelCharacters[streakData.currentCharacterIndex];
    const levelUpEl = document.createElement('div');
    levelUpEl.className = 'level-up-notification';
    levelUpEl.innerHTML = `
        <h3>⚡ NEW HERO UNLOCKED! ⚡</h3>
        <div class="hero-name">${character.name}</div>
        <div class="hero-description">"${character.description}"</div>
        <div class="power-level">Power Level: ${character.points}</div>
    `;
    document.body.appendChild(levelUpEl);
    
    setTimeout(() => {
        levelUpEl.remove();
    }, 5000);
}

// Show villain laugh when penalty is applied
function showVillainLaugh(missedPeriods) {
    // Select villain based on missed periods
    let villainTier = Math.min(4, Math.ceil(missedPeriods / 2));
    const eligibleVillains = marvelVillains.filter(v => v.tier <= villainTier);
    const villain = eligibleVillains[Math.floor(Math.random() * eligibleVillains.length)];
    
    // Create villain popup
    const villainEl = document.createElement('div');
    villainEl.className = 'villain-popup';
    villainEl.innerHTML = `
        <div class="villain-content">
            <div class="villain-name">${villain.name}</div>
            <div class="villain-quote">"${villain.quote}"</div>
            <div class="penalty-info">-${missedPeriods * 10} POINTS!</div>
        </div>
    `;
    document.body.appendChild(villainEl);
    
    // Add shake animation to the container
    document.querySelector('.container').classList.add('shake');
    
    // Flash red border
    document.body.classList.add('penalty-flash');
    
    // Remove effects after animation
    setTimeout(() => {
        villainEl.remove();
        document.querySelector('.container').classList.remove('shake');
        document.body.classList.remove('penalty-flash');
    }, 4000);
}

// Show warning when approaching penalty deadline
function showPenaltyWarning() {
    if (!streakData.lastStreakTime || streakData.count === 0) {
        return;
    }
    
    const now = new Date().getTime();
    const timeSinceLastStreak = now - streakData.lastStreakTime;
    const hoursRemaining = 24 - (timeSinceLastStreak / (1000 * 60 * 60));
    
    // Remove existing warning
    const existingWarning = document.querySelector('.warning-timer');
    if (existingWarning) {
        existingWarning.remove();
    }
    
    // Show warning if less than 4 hours remaining
    if (hoursRemaining > 0 && hoursRemaining < 4) {
        const warningEl = document.createElement('div');
        warningEl.className = 'warning-timer';
        
        if (hoursRemaining < 1) {
            const minutesRemaining = Math.floor(hoursRemaining * 60);
            warningEl.textContent = `⚠️ Penalty in ${minutesRemaining} minutes! Add a streak now!`;
        } else {
            const hours = Math.floor(hoursRemaining);
            warningEl.textContent = `⚠️ Penalty in ${hours} hour${hours > 1 ? 's' : ''}! Don't break your streak!`;
        }
        
        document.querySelector('.header').appendChild(warningEl);
    }
}