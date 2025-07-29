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
    allReasons: []
};

// Load data when popup opens
document.addEventListener('DOMContentLoaded', async () => {
    await loadStreakData();
    updateUI();
    
    // Check if we're still in cooldown
    checkCooldownOnLoad();
    
    // Add click event to streak button
    document.getElementById('streak-button').addEventListener('click', handleStreakClick);
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
        const buttonText = button.querySelector('.button-text');
        button.disabled = true;
        button.style.opacity = '0.5';
        buttonText.textContent = 'Max Daily Streaks';
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
    const newCharacterIndex = getCharacterByStreak(streakData.count);
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
            buttonText.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
            return;
        }
        
        const minutes = Math.floor(remaining / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        buttonText.textContent = `Wait ${minutes}:${seconds.toString().padStart(2, '0')}`;
        button.disabled = true;
        button.style.opacity = '0.5';
        
        remaining -= 1000;
    };
    
    updateTimer();
    cooldownInterval = setInterval(updateTimer, 1000);
}

// Get character image filename
function getCharacterImageFilename(character) {
    // Convert character name to filename format
    let filename = character.name.toLowerCase();
    if (character.fullName) {
        filename = `${character.name} ${character.fullName}`.toLowerCase();
    }
    filename = filename.replace(/[()]/g, '').replace(/[\s-]/g, '_').replace(/\./g, '');
    return `../images/marvel/${filename}.png`;
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
    // Update streak count
    document.getElementById('streak-count').textContent = streakData.count;
    
    // Update daily streak count
    const today = new Date().toDateString();
    if (streakData.lastDate !== today) {
        // Reset if it's a new day
        streakData.todayStreaks = 0;
    }
    document.getElementById('daily-count').textContent = streakData.todayStreaks || 0;
    
    // Get current character
    const characterIndex = streakData.currentCharacterIndex || 0;
    const character = marvelCharacters[characterIndex];
    
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
    let progressCurrent = 0;
    let progressTotal = 0;
    
    if (characterIndex < marvelCharacters.length - 1) {
        const nextCharacter = marvelCharacters[characterIndex + 1];
        const currentPoints = character.points;
        const nextPoints = nextCharacter.points;
        
        progressCurrent = streakData.count - currentPoints;
        progressTotal = nextPoints - currentPoints;
        progressPercent = (progressCurrent / progressTotal) * 100;
        
        document.getElementById('progress-current').textContent = Math.max(0, progressCurrent);
        document.querySelector('.progress-text').innerHTML = 
            `<span id="progress-current">${Math.max(0, progressCurrent)}</span> / ${progressTotal}`;
        document.querySelector('.progress-label').textContent = 
            `Progress to ${nextCharacter.name} (${nextPoints} days)`;
    } else {
        // Max level reached
        progressPercent = 100;
        document.querySelector('.progress-label').textContent = 'Maximum Power Achieved!';
        document.querySelector('.progress-text').textContent = 'LEGENDARY';
    }
    
    document.getElementById('progress-fill').style.width = Math.min(100, Math.max(0, progressPercent)) + '%';
    
    // Update last streak info
    if (streakData.lastDate) {
        const lastDate = new Date(streakData.lastDate);
        const formattedDate = lastDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        document.getElementById('last-streak').textContent = `Last streak: ${formattedDate}`;
    }
    
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
                ${entry.reason}
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
    messageEl.textContent = text;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

// Show level up animation
function showLevelUpAnimation() {
    const character = marvelCharacters[streakData.currentCharacterIndex];
    const levelUpEl = document.createElement('div');
    levelUpEl.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 10px;">⚡ NEW HERO UNLOCKED! ⚡</div>
        <div style="font-size: 18px;">You've unlocked</div>
        <div style="font-size: 20px; color: #ffd700; font-weight: bold;">${character.name}</div>
        <div style="font-size: 14px; color: #ccc; margin-top: 10px; font-style: italic;">"${character.description}"</div>
        <div style="font-size: 16px; margin-top: 10px;">Power Level: ${character.points}</div>
    `;
    levelUpEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        color: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        z-index: 1000;
        border: 3px solid #ffd700;
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        max-width: 300px;
    `;
    document.body.appendChild(levelUpEl);
    
    setTimeout(() => {
        levelUpEl.remove();
    }, 5000);
}