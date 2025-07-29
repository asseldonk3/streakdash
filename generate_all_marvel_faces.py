#!/usr/bin/env python3
import os
import requests
from openai import OpenAI
from dotenv import load_dotenv
import time
from PIL import Image
import io

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# All Marvel characters (excluding the ones we already generated)
marvel_characters = {
    # Already done: "spider-man", "iron-man", "captain-america", "thor", "black-widow"
    "hawkeye": "Hawkeye Clint Barton archer with bow, purple costume",
    "nick-fury": "Nick Fury with eye patch, black leather coat, serious expression",
    "daredevil": "Daredevil Matt Murdock in red suit with horned mask",
    "moon-knight": "Moon Knight Marc Spector in white hooded costume with crescent moon",
    "punisher": "Punisher Frank Castle with skull symbol on chest, military gear",
    "shang-chi": "Shang-Chi martial artist in red costume with golden rings",
    "kate-bishop": "Kate Bishop young female archer in purple costume",
    "elektra": "Elektra assassin in red outfit with sai weapons",
    "falcon": "Falcon Sam Wilson with mechanical wings, red and white costume",
    "winter-soldier": "Winter Soldier Bucky Barnes with metal arm, tactical gear",
    "black-panther": "Black Panther T'Challa in vibranium suit with cat ears",
    "wolverine": "Wolverine Logan with adamantium claws extended, yellow costume",
    "gamora": "Gamora green-skinned alien warrior woman",
    "nebula": "Nebula blue-skinned cyborg woman with mechanical parts",
    "she-hulk": "She-Hulk Jennifer Walters green-skinned muscular woman",
    "jessica-jones": "Jessica Jones in leather jacket, detective look",
    "luke-cage": "Luke Cage powerful black man in yellow shirt",
    "ant-man": "Ant-Man Scott Lang in red suit with helmet",
    "wasp": "Wasp Hope Van Dyne in yellow and black suit with wings",
    "iron-fist": "Iron Fist Danny Rand with glowing yellow fist, green costume",
    "war-machine": "War Machine James Rhodes in grey military armor suit",
    "vision": "Vision android with red face and green costume, mind stone on forehead",
    "ms-marvel": "Ms. Marvel Kamala Khan young woman in red and blue costume",
    "quake": "Quake Daisy Johnson with seismic gauntlets",
    "captain-britain": "Captain Britain in costume with British flag design",
    "storm": "Storm Ororo Munroe with white hair, lightning effects",
    "doctor-strange": "Doctor Strange sorcerer with goatee, red cloak, mystical symbols",
    "scarlet-witch": "Scarlet Witch Wanda Maximoff in red costume, red energy",
    "captain-marvel": "Captain Marvel Carol Danvers in red blue and gold costume",
    "hercules": "Hercules muscular Greek god with beard and lion skin",
    "beta-ray-bill": "Beta Ray Bill alien horse-like face with hammer",
    "blue-marvel": "Blue Marvel in blue and white costume",
    "sentry": "Sentry Robert Reynolds golden hero with cape",
    "nova": "Nova Richard Rider in blue and gold cosmic suit with star helmet",
    "jean-grey": "Jean Grey Phoenix with red hair and phoenix flame effects",
    "ikaris": "Ikaris Eternal with cosmic powers in blue and gold",
    "gilgamesh": "Gilgamesh strongest Eternal massive warrior",
    "thena": "Thena female Eternal warrior in golden armor",
    "adam-warlock": "Adam Warlock golden-skinned cosmic being",
    "silver-surfer": "Silver Surfer chrome metallic alien on cosmic surfboard",
    "ghost-rider": "Ghost Rider with flaming skull head on motorcycle",
    "doctor-voodoo": "Doctor Voodoo Jericho Drumm mystic with staff and face paint",
    "hope-summers": "Hope Summers young woman with red and green hair",
    "franklin-richards": "Franklin Richards young boy with reality-warping powers",
    "the-one-above-all": "The One Above All cosmic entity glowing figure of pure light"
}

# Create icons directory if it doesn't exist
icons_dir = "images/marvel/icons"
os.makedirs(icons_dir, exist_ok=True)

def generate_character_image(character_file, character_desc):
    """Generate a character image using DALL-E 3"""
    try:
        print(f"Generating image for {character_file}...")
        
        # Create a prompt for actual character appearance
        prompt = f"""Professional portrait of Marvel {character_desc}. 
        High quality character portrait showing face and upper body clearly.
        Comic book movie style, detailed rendering.
        Iconic costume and features visible.
        Square composition, centered, simple background.
        No text, logos, or watermarks."""
        
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        
        image_url = response.data[0].url
        
        # Download the image
        img_response = requests.get(image_url)
        if img_response.status_code == 200:
            # Open image and resize it
            img = Image.open(io.BytesIO(img_response.content))
            
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Crop to center square
            width, height = img.size
            size = min(width, height)
            left = (width - size) // 2
            top = (height - size) // 2
            right = left + size
            bottom = top + size
            img_cropped = img.crop((left, top, right, bottom))
            
            # Resize to 120x120 for icon
            img_resized = img_cropped.resize((120, 120), Image.Resampling.LANCZOS)
            
            # Save the resized image
            filename = f"{icons_dir}/{character_file}.png"
            img_resized.save(filename, 'PNG', optimize=True)
            print(f"✓ Saved {filename}")
            return True
        else:
            print(f"✗ Failed to download image for {character_file}")
            return False
            
    except Exception as e:
        print(f"✗ Error generating image for {character_file}: {str(e)}")
        return False

def main():
    print("Marvel Character Face Generator - Full Set")
    print("=" * 50)
    
    # Check which characters already exist
    existing = []
    for char in marvel_characters.keys():
        if os.path.exists(f"{icons_dir}/{char}.png"):
            existing.append(char)
    
    # Remove existing from the list
    for char in existing:
        del marvel_characters[char]
    
    print(f"Found {len(existing)} existing character images")
    print(f"Generating {len(marvel_characters)} remaining characters\n")
    
    if not marvel_characters:
        print("All characters already have images!")
        return
    
    success_count = 0
    failed = []
    
    # Process in batches
    batch_size = 5
    chars_list = list(marvel_characters.items())
    
    for i in range(0, len(chars_list), batch_size):
        batch = chars_list[i:i+batch_size]
        print(f"\nBatch {i//batch_size + 1}/{(len(chars_list) + batch_size - 1)//batch_size}")
        
        for character_file, character_desc in batch:
            if generate_character_image(character_file, character_desc):
                success_count += 1
            else:
                failed.append(character_file)
            
            # Add delay to respect rate limits
            time.sleep(3)
        
        # Longer pause between batches
        if i + batch_size < len(chars_list):
            print(f"\nPausing between batches...")
            time.sleep(5)
    
    print(f"\n{'='*50}")
    print(f"Completed! Generated {success_count}/{len(marvel_characters)} images successfully.")
    
    if failed:
        print(f"\nFailed characters: {', '.join(failed)}")

if __name__ == "__main__":
    # Check for API key
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY not found in .env file")
        exit(1)
    
    main()