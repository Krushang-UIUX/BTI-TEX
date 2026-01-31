"""
Process Machine Product Images
- Remove backgrounds
- Add white background
- Resize to fixed dimensions
"""

import os
from pathlib import Path

try:
    from rembg import remove
    from PIL import Image
    import io
except ImportError:
    print("Installing required packages...")
    os.system('pip install "rembg[cpu]" pillow')
    from rembg import remove
    from PIL import Image
    import io

# Fixed output dimensions
FIXED_WIDTH = 800
FIXED_HEIGHT = 600

# Directories to process
MACHINE_DIRS = [
    Path(r"d:\Github\BTI-TEX\btitex_machines"),
    Path(r"d:\Github\BTI-TEX\bti_machines\Ganga 2x154"),
    Path(r"d:\Github\BTI-TEX\bti_machines\Super model 64inch underpick 1x1"),
    Path(r"d:\Github\BTI-TEX\bti_machines\butter narmada 56 overpick"),
    Path(r"d:\Github\BTI-TEX\bti_machines\chand-tara mau"),
    Path(r"d:\Github\BTI-TEX\bti_machines\cimmco overpick meerut orissa 56"),
    Path(r"d:\Github\BTI-TEX\bti_machines\sumo102"),
    Path(r"d:\Github\BTI-TEX\bti_machines\vanketashwar 54 2x1"),
    Path(r"d:\Github\BTI-TEX\btitex-machine-new\Ganga Machine"),
    Path(r"d:\Github\BTI-TEX\btitex-machine-new\Sumo Machine"),
    Path(r"d:\Github\BTI-TEX\btitex-machine-new\Under Pick Machine"),
    Path(r"d:\Github\BTI-TEX\btitex-machine-new\Venkateshwar machine"),
    Path(r"d:\Github\BTI-TEX\btitex-machine-new\butter narmada machine"),
    Path(r"d:\Github\BTI-TEX\btitex-machine-new\chau maru machine"),
    Path(r"d:\Github\BTI-TEX\btitex-machine-new\machine3"),
]

IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp'}

def process_image(input_path: Path, output_path: Path):
    """Remove background, add white background, resize to fixed dimensions"""
    try:
        print(f"Processing: {input_path.name}", end=" ... ")
        
        # Read and remove background
        with open(input_path, 'rb') as f:
            input_data = f.read()
        
        # Remove background (returns RGBA PNG)
        output_data = remove(input_data)
        
        # Open the transparent image
        img = Image.open(io.BytesIO(output_data)).convert("RGBA")
        
        # Create white background
        white_bg = Image.new("RGBA", (FIXED_WIDTH, FIXED_HEIGHT), (255, 255, 255, 255))
        
        # Resize image to fit within fixed dimensions while maintaining aspect ratio
        img_ratio = img.width / img.height
        target_ratio = FIXED_WIDTH / FIXED_HEIGHT
        
        if img_ratio > target_ratio:
            # Image is wider - fit to width
            new_width = int(FIXED_WIDTH * 0.9)  # 90% of width with padding
            new_height = int(new_width / img_ratio)
        else:
            # Image is taller - fit to height
            new_height = int(FIXED_HEIGHT * 0.9)  # 90% of height with padding
            new_width = int(new_height * img_ratio)
        
        img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Center the image on white background
        x = (FIXED_WIDTH - new_width) // 2
        y = (FIXED_HEIGHT - new_height) // 2
        
        # Paste transparent image onto white background
        white_bg.paste(img_resized, (x, y), img_resized)
        
        # Convert to RGB (remove alpha) and save as PNG
        final_img = white_bg.convert("RGB")
        output_path = output_path.with_suffix('.png')
        final_img.save(output_path, "PNG", quality=95)
        
        print(f"✓ Saved ({new_width}x{new_height}) to {output_path.name}")
        return True
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def process_directory(directory: Path):
    """Process all images in a directory"""
    if not directory.exists():
        print(f"  Directory not found: {directory}")
        return 0, 0
    
    image_files = [
        f for f in directory.iterdir()
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
    ]
    
    if not image_files:
        return 0, 0
    
    success = 0
    failed = 0
    
    for img_path in image_files:
        output_path = directory / img_path.name
        if process_image(img_path, output_path):
            success += 1
        else:
            failed += 1
    
    return success, failed

def main():
    print("=" * 60)
    print("Machine Image Processor")
    print(f"Output size: {FIXED_WIDTH}x{FIXED_HEIGHT} with white background")
    print("=" * 60)
    
    total_success = 0
    total_failed = 0
    
    for directory in MACHINE_DIRS:
        print(f"\n📁 {directory.name}")
        success, failed = process_directory(directory)
        total_success += success
        total_failed += failed
    
    print("\n" + "=" * 60)
    print(f"Complete! Success: {total_success}, Failed: {total_failed}")
    print("=" * 60)

if __name__ == "__main__":
    main()
