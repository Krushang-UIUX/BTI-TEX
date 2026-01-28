import os
import glob

def rename_images(directory):
    files = glob.glob(os.path.join(directory, "img*.jpg"))
    files.sort() # Ensure deterministic order
    
    print(f"Found {len(files)} images.")
    
    for i, file_path in enumerate(files):
        new_name = f"bti_valve_{i+1:02d}.jpg"
        new_path = os.path.join(directory, new_name)
        
        # Avoid overwriting if file already exists (unlikely with this naming scheme unless run twice)
        if os.path.exists(new_path):
            print(f"Skipping {new_name}, already exists.")
            continue
            
        os.rename(file_path, new_path)
        print(f"Renamed {os.path.basename(file_path)} to {new_name}")

if __name__ == "__main__":
    rename_images(r"d:\Github\BTI-TEX\bti_valves")
