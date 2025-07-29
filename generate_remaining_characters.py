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

# Remaining Marvel characters
marvel_characters = {
    "nebula": "Nebula blue-skinned cyborg woman with mechanical parts, bald head",
    "winter-soldier": "Winter Soldier Bucky Barnes with metal arm, long dark hair, tactical gear",
    "quake": "Quake Daisy Johnson with seismic gauntlets, Asian woman",
    "nova": "Nova Richard Rider in blue and gold cosmic suit with star helmet",
    "jean-grey": "Jean Grey Phoenix with red hair and phoenix flame effects",
    "ikaris": "Ikaris Eternal with cosmic powers, strong jaw, blue and gold costume",
    "gilgamesh": "Gilgamesh strongest Eternal, massive muscular warrior",
    "thena": "Thena female Eternal warrior in golden armor, blonde hair",
    "adam-warlock": "Adam Warlock golden-skinned cosmic being with gem on forehead",
    "silver-surfer": "Silver Surfer chrome metallic alien on cosmic surfboard",
    "ghost-rider": "Ghost Rider with flaming skull head, leather jacket",
    "doctor-voodoo": "Doctor Voodoo Jericho Drumm mystic with face paint and staff",
    "hope-summers": "Hope Summers young woman with red and green hair",
    "franklin-richards": "Franklin Richards young boy with blonde hair, Fantastic Four costume",
    "the-one-above-all": "The One Above All cosmic entity, glowing figure of pure white light"
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
        Iconic features and costume visible.
        Square composition, centered, clean background.
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
    print("Generating Remaining Marvel Characters")
    print("=" * 40)
    
    # Check which already exist
    to_generate = {}
    for char, desc in marvel_characters.items():
        if not os.path.exists(f"{icons_dir}/{char}.png"):
            to_generate[char] = desc
    
    print(f"Need to generate {len(to_generate)} characters\n")
    
    if not to_generate:
        print("All characters already have images!")
        return
    
    success_count = 0
    
    for character_file, character_desc in to_generate.items():
        if generate_character_image(character_file, character_desc):
            success_count += 1
        time.sleep(3)  # Rate limiting
    
    print(f"\nCompleted! Generated {success_count}/{len(to_generate)} images successfully.")
    
    # List all characters to verify
    all_files = sorted([f for f in os.listdir(icons_dir) if f.endswith('.png')])
    print(f"\nTotal character images: {len(all_files)}")

if __name__ == "__main__":
    main()