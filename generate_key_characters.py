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

# Key characters to generate
marvel_characters = {
    "wolverine": "Wolverine Logan with adamantium claws extended, yellow and blue costume, fierce expression",
    "hulk": "Hulk Bruce Banner as green giant with massive muscles, angry face",
    "doctor-strange": "Doctor Strange Stephen Strange sorcerer with goatee beard, red levitating cloak"
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
        Comic book movie style, photorealistic.
        Iconic costume and features prominently visible.
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
    print("Generating Key Marvel Characters")
    print("=" * 40)
    
    # Check which already exist
    to_generate = {}
    for char, desc in marvel_characters.items():
        if not os.path.exists(f"{icons_dir}/{char}.png"):
            to_generate[char] = desc
        else:
            print(f"✓ {char} already exists")
    
    if not to_generate:
        print("\nAll key characters already have images!")
        return
    
    print(f"\nGenerating {len(to_generate)} characters...\n")
    
    for character_file, character_desc in to_generate.items():
        generate_character_image(character_file, character_desc)
        time.sleep(2)
    
    print("\nDone! Your extension now has real Marvel character faces.")
    print("You can run generate_all_marvel_faces.py later to get all characters.")

if __name__ == "__main__":
    main()