// Background service worker for Marvel Streak Tracker

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Marvel Streak Tracker installed!');
    
    // Initialize storage with default data
    chrome.storage.local.get(['streakData'], (result) => {
        if (!result.streakData) {
            chrome.storage.local.set({
                streakData: {
                    count: 0,
                    lastDate: null,
                    characterLevel: 0
                }
            });
        }
    });
});

// Optional: Set up daily reminder (can be expanded later)
chrome.alarms.create('dailyReminder', {
    periodInMinutes: 24 * 60, // 24 hours
    when: Date.now() + (24 * 60 * 60 * 1000) // First alarm in 24 hours
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'dailyReminder') {
        // Could show a notification here to remind users about their streak
        // For now, just log it
        console.log('Daily reminder triggered');
    }
});