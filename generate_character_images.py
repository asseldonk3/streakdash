#!/usr/bin/env python3
import os
import csv
from PIL import Image, ImageDraw, ImageFont
import colorsys

# Create directories if they don't exist
os.makedirs('images/marvel', exist_ok=True)

# Read character data from CSV
characters = []
with open('marvel_characters.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        characters.append({
            'name': row['Character Name'],
            'description': row['Description'],
            'points': int(row['Points'])
        })

# Function to create character image
def create_character_image(character, index):
    # Create a new image
    size = 200
    img = Image.new('RGB', (size, size), color='#1a1a2e')
    draw = ImageDraw.Draw(img)
    
    # Calculate color based on power level (from red to purple)
    hue = (character['points'] / 1500) * 0.83  # 0 to 0.83 (red to purple)
    saturation = 0.7
    lightness = 0.5
    rgb = colorsys.hls_to_rgb(hue, lightness, saturation)
    color = tuple(int(c * 255) for c in rgb)
    
    # Draw gradient-like background
    for i in range(size//2):
        alpha = 1 - (i / (size//2))
        circle_color = tuple(int(c * alpha + 26 * (1-alpha)) for c in color)
        draw.ellipse([i, i, size-i, size-i], fill=circle_color)
    
    # Draw golden border
    draw.ellipse([5, 5, size-5, size-5], outline='#ffd700', width=5)
    
    # Get initials
    name_parts = character['name'].split('(')[0].strip().split(' ')
    initials = ''.join([part[0] for part in name_parts if part])[:2]
    
    # Draw initials
    font_size = 60
    try:
        # Try to use a system font
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), initials, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center the text
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    # Draw text with shadow
    draw.text((x+2, y+2), initials, fill='#000000', font=font)
    draw.text((x, y), initials, fill='#ffffff', font=font)
    
    # Add power level indicator
    power_text = f"P:{character['points']}"
    bbox = draw.textbbox((0, 0), power_text, font=font)
    text_width = bbox[2] - bbox[0]
    draw.text((size - text_width - 10, size - 30), power_text, fill='#ffd700', font=font)
    
    # Create filename from character name
    filename = character['name'].lower()
    filename = filename.replace(' ', '_').replace('(', '').replace(')', '')
    filename = filename.replace('-', '_').replace('.', '')
    filename = f"{filename}.png"
    
    # Save the image
    img.save(f'images/marvel/{filename}')
    print(f"Created {filename} for {character['name']} (Power: {character['points']})")

# Generate all character images
for i, character in enumerate(characters):
    create_character_image(character, i)

print(f"\nGenerated {len(characters)} character images!")