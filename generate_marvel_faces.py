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

# Start with just a few key characters
marvel_characters = {
    "spider-man": "Spider-Man Peter Parker in classic red and blue costume with web pattern, face visible through mask",
    "iron-man": "Iron Man Tony Stark in red and gold armor suit, face visible through open helmet visor",
    "captain-america": "Captain America Steve Rogers in patriotic costume with star on chest, holding shield",
    "thor": "Thor the Norse god with long blonde hair, red cape, holding Mjolnir hammer",
    "black-widow": "Black Widow Natasha Romanoff with red hair in black tactical suit"
}

# Create icons directory if it doesn't exist
icons_dir = "images/marvel/icons"
os.makedirs(icons_dir, exist_ok=True)

def generate_character_image(character_file, character_desc):
    """Generate a character image using DALL-E 3"""
    try:
        print(f"Generating image for {character_file}...")
        
        # Create a prompt for actual character appearance
        prompt = f"""Professional portrait photograph of {character_desc}. 
        High quality Marvel character portrait showing face and upper body.
        Comic book movie style, photorealistic rendering.
        Clear facial features, iconic costume details visible.
        Square composition, centered subject, clean background.
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
    print("Marvel Character Face Generator")
    print("=" * 40)
    print(f"Generating images for {len(marvel_characters)} popular characters\n")
    
    success_count = 0
    
    for character_file, character_desc in marvel_characters.items():
        if generate_character_image(character_file, character_desc):
            success_count += 1
        
        # Add delay to respect rate limits
        time.sleep(2)
    
    print(f"\nCompleted! Generated {success_count}/{len(marvel_characters)} images successfully.")
    print("\nTo generate more characters, you can add them to the marvel_characters dictionary.")

if __name__ == "__main__":
    # Check for API key
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY not found in .env file")
        exit(1)
    
    main()