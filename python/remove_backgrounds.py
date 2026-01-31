"""
Remove backgrounds from valve product images
Uses rembg library for AI-powered background removal
"""

import os
from pathlib import Path

# Install rembg if not present
try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("Installing required packages...")
    os.system("pip install rembg pillow")
    from rembg import remove
    from PIL import Image

# Define paths
VALVE_IMAGES_DIR = Path(r"d:\Github\BTI-TEX\bti_valves")
OUTPUT_DIR = VALVE_IMAGES_DIR  # Overwrite originals (or use a separate folder)

# Image extensions to process
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp'}

def remove_background(input_path: Path, output_path: Path):
    """Remove background from a single image"""
    try:
        print(f"Processing: {input_path.name}", end=" ... ")
        
        # Read input image
        with open(input_path, 'rb') as input_file:
            input_data = input_file.read()
        
        # Remove background
        output_data = remove(input_data)
        
        # Save as PNG (to preserve transparency)
        output_path = output_path.with_suffix('.png')
        with open(output_path, 'wb') as output_file:
            output_file.write(output_data)
        
        print(f"✓ Saved to {output_path.name}")
        return True
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def process_all_images():
    """Process all images in the valve directory"""
    print("=" * 50)
    print("Background Removal for Valve Images")
    print("=" * 50)
    
    # Get all image files
    image_files = [
        f for f in VALVE_IMAGES_DIR.iterdir() 
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
    ]
    
    print(f"\nFound {len(image_files)} images to process\n")
    
    success_count = 0
    fail_count = 0
    
    for img_path in image_files:
        output_path = OUTPUT_DIR / img_path.name
        if remove_background(img_path, output_path):
            success_count += 1
        else:
            fail_count += 1
    
    print("\n" + "=" * 50)
    print(f"Complete! Success: {success_count}, Failed: {fail_count}")
    print("=" * 50)

if __name__ == "__main__":
    process_all_images()
