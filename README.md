# Marvel Streak Tracker Chrome Extension

A fun Chrome extension that helps you track daily streaks and unlock Marvel characters as you progress!

## Features

- **Daily Streak Tracking**: Click the button once per day to maintain your streak
- **51 Marvel Characters**: Progress through characters from Hawkeye (5 points) to The One Above All (1475 points)
- **Point-Based System**: Characters unlock at specific streak milestones matching their power levels
- **Visual Progress**: See your progress toward the next character unlock
- **Character Images**: Each character has a unique image with color-coded power levels
- **Persistent Storage**: Your streak data is saved locally

## Marvel Character Progression

The extension features 51 Marvel characters sorted by power level. You start with no character and unlock them as your streak reaches their point threshold:

- **Hawkeye** - 5 days
- **Black Widow** - 11 days
- **Nick Fury** - 18 days
- **Captain America** - 126 days
- **Iron Man** - 425 days
- **Thor** - 731 days
- **The One Above All** - 1475 days

...and many more in between!

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `streakdash` folder
5. The extension will appear in your Chrome toolbar

## Usage

1. Click the extension icon in your Chrome toolbar
2. Click "Add Streak" once per day
3. Watch your streak count increase
4. Unlock new Marvel characters as you reach their point thresholds
5. If you miss a day, your streak resets to 1

## Point System

- Each character has a specific point threshold
- You unlock a character when your streak count reaches their points
- The points increase progressively, making each unlock more challenging
- Characters are color-coded from red (weak) to purple (cosmic level)

## Files Generated

- **Extension Icons**: Created automatically when you run the extension
- **Character Images**: 51 character images with initials and power-level based colors
- Generated from the `marvel_characters.csv` file

## Development

- `manifest.json` - Extension configuration
- `popup/` - Popup interface files
  - `popup.html` - UI structure
  - `popup.css` - Marvel-themed styling
  - `popup.js` - Core functionality with point system
- `background/` - Background service worker
- `images/` - Icons and character images
- `marvel_characters.csv` - Source data for all characters

## Technical Details

- Uses Chrome Storage API for persistence
- Character images are dynamically generated with:
  - Initials of each character
  - Color gradients based on power level
  - Power point indicators
- Fallback to canvas-generated images if files are missing