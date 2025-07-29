#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

# Create directories if they don't exist
os.makedirs('images/icons', exist_ok=True)

# Icon sizes
sizes = [16, 32, 48, 128]

for size in sizes:
    # Create a new image with a red background
    img = Image.new('RGB', (size, size), color='#e94560')
    draw = ImageDraw.Draw(img)
    
    # Draw a lightning bolt (simplified)
    # Scale coordinates based on size
    scale = size / 128
    
    # Lightning bolt coordinates (scaled)
    points = [
        (int(70 * scale), int(20 * scale)),
        (int(50 * scale), int(55 * scale)),
        (int(65 * scale), int(55 * scale)),
        (int(45 * scale), int(108 * scale)),
        (int(70 * scale), int(65 * scale)),
        (int(55 * scale), int(65 * scale))
    ]
    
    # Draw the lightning bolt in gold
    draw.polygon(points, fill='#ffd700', outline='#ffffff')
    
    # Save the icon
    img.save(f'images/icons/icon-{size}.png')
    print(f'Created icon-{size}.png')

print('All icons created successfully!')