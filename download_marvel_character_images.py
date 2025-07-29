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

# Marvel characters mapping (file name -> display name)
marvel_characters = {
    "hawkeye": "Hawkeye (Clint Barton) Marvel character",
    "black-widow": "Black Widow (Natasha Romanoff) Marvel character",
    "nick-fury": "Nick Fury Marvel character with eye patch",
    "daredevil": "Daredevil (Matt Murdock) Marvel character in red suit",
    "moon-knight": "Moon Knight (Marc Spector) Marvel character in white costume",
    "punisher": "Punisher (Frank Castle) Marvel character with skull logo",
    "shang-chi": "Shang-Chi Marvel character martial artist",
    "kate-bishop": "Kate Bishop Marvel character archer",
    "elektra": "Elektra Marvel character assassin in red",
    "falcon": "Falcon (Sam Wilson) Marvel character with wings",
    "winter-soldier": "Winter Soldier (Bucky Barnes) Marvel character with metal arm",
    "captain-america": "Captain America (Steve Rogers) Marvel character with shield",
    "black-panther": "Black Panther (T'Challa) Marvel character in vibranium suit",
    "wolverine": "Wolverine (Logan) Marvel character with claws",
    "gamora": "Gamora Marvel character green skin warrior",
    "nebula": "Nebula Marvel character blue cyborg",
    "spider-man": "Spider-Man (Peter Parker) Marvel character in red and blue suit",
    "she-hulk": "She-Hulk (Jennifer Walters) Marvel character green skin",
    "jessica-jones": "Jessica Jones Marvel character detective",
    "luke-cage": "Luke Cage Marvel character with unbreakable skin",
    "ant-man": "Ant-Man (Scott Lang) Marvel character in shrinking suit",
    "wasp": "Wasp (Hope Van Dyne) Marvel character with wings",
    "iron-fist": "Iron Fist (Danny Rand) Marvel character with glowing fist",
    "war-machine": "War Machine (James Rhodes) Marvel character in gray armor",
    "iron-man": "Iron Man (Tony Stark) Marvel character in red and gold armor",
    "vision": "Vision Marvel character android with red face",
    "ms-marvel": "Ms. Marvel (Kamala Khan) Marvel character with stretchy powers",
    "quake": "Quake (Daisy Johnson) Marvel character with seismic powers",
    "captain-britain": "Captain Britain Marvel character with British flag costume",
    "storm": "Storm (Ororo Munroe) Marvel X-Men character with white hair",
    "doctor-strange": "Doctor Strange Marvel character sorcerer with red cloak",
    "scarlet-witch": "Scarlet Witch (Wanda Maximoff) Marvel character in red",
    "captain-marvel": "Captain Marvel (Carol Danvers) Marvel character in red and blue",
    "thor": "Thor Marvel character Norse god with hammer",
    "hercules": "Hercules Marvel character Greek god muscular",
    "beta-ray-bill": "Beta Ray Bill Marvel character alien with hammer",
    "blue-marvel": "Blue Marvel character in blue costume",
    "sentry": "Sentry (Robert Reynolds) Marvel character golden hero",
    "nova": "Nova (Richard Rider) Marvel character cosmic hero",
    "jean-grey": "Jean Grey Phoenix Marvel X-Men character with red hair",
    "ikaris": "Ikaris Marvel Eternals character flying hero",
    "gilgamesh": "Gilgamesh Marvel Eternals character strongest eternal",
    "thena": "Thena Marvel Eternals character warrior",
    "adam-warlock": "Adam Warlock Marvel character golden cosmic being",
    "silver-surfer": "Silver Surfer (Norrin Radd) Marvel character on cosmic surfboard",
    "ghost-rider": "Ghost Rider (Johnny Blaze) Marvel character with flaming skull",
    "doctor-voodoo": "Doctor Voodoo (Jericho Drumm) Marvel character mystic",
    "hope-summers": "Hope Summers Marvel X-Men character with red hair",
    "franklin-richards": "Franklin Richards Marvel character young reality warper",
    "the-one-above-all": "The One Above All Marvel cosmic entity creator"
}

# Create icons directory if it doesn't exist
icons_dir = "images/marvel/icons"
os.makedirs(icons_dir, exist_ok=True)

def generate_character_image(character_file, character_desc):
    """Generate a character image using DALL-E 3"""
    try:
        print(f"Generating image for {character_file}...")
        
        # Create a prompt for actual character appearance
        prompt = f"""Create a high-quality portrait of {character_desc}. 
        Style: Modern comic book art, clean and recognizable. 
        Show the character's face and upper body clearly. 
        Include their iconic costume/features.
        Square format suitable for a 120x120px icon.
        Vibrant colors, dynamic pose, no text or logos."""
        
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
            
            # Convert to RGB if necessary (removes alpha channel)
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Resize to 120x120 for icon
            img_resized = img.resize((120, 120), Image.Resampling.LANCZOS)
            
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
    print("Starting Marvel character image generation...")
    print(f"Generating images for {len(marvel_characters)} characters\n")
    
    # First, let's backup existing images
    backup_dir = "images/marvel/icons_backup"
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
        print(f"Backing up existing images to {backup_dir}...")
        for file in os.listdir(icons_dir):
            if file.endswith('.png'):
                os.rename(f"{icons_dir}/{file}", f"{backup_dir}/{file}")
    
    success_count = 0
    failed_characters = []
    
    # Process characters in batches to avoid rate limits
    for character_file, character_desc in marvel_characters.items():
        if generate_character_image(character_file, character_desc):
            success_count += 1
        else:
            failed_characters.append(character_file)
        
        # Add delay to respect rate limits
        time.sleep(3)
        
        # Progress update every 10 characters
        if success_count % 10 == 0:
            print(f"\nProgress: {success_count}/{len(marvel_characters)} completed\n")
    
    print(f"\nCompleted! Generated {success_count}/{len(marvel_characters)} images successfully.")
    
    if failed_characters:
        print(f"\nFailed to generate images for: {', '.join(failed_characters)}")
        print("\nYou can run the script again to retry failed images.")

if __name__ == "__main__":
    # Check for required dependencies
    try:
        import PIL
    except ImportError:
        print("Please install Pillow: pip install Pillow")
        exit(1)
    
    # Check for API key
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY not found in .env file")
        exit(1)
    
    main()