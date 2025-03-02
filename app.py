"""
File naming convention enforcer.

This script enforces naming conventions by copying files from a source directory
to a destination directory with standardized names based on timestamps.
"""
import os
import sys
import shutil
from datetime import datetime
from typing import List, Optional, Tuple


def enforce_naming_convention(source_dir: str, dest_dir: str) -> List[Tuple[str, str]]:
    """
    Enforce naming convention for files in a local directory.
    
    Args:
        source_dir: Path to the source directory containing files to process
        dest_dir: Path to the destination directory where renamed files will be placed
    
    Returns:
        List[Tuple[str, str]]: List of tuples containing (original_filename, new_filename)
    """
    # Create the destination directory if it doesn't exist
    os.makedirs(dest_dir, exist_ok=True)
    
    processed_files = []
    for filename in os.listdir(source_dir):
        if not filename.endswith((".txt", ".csv")):
            # Skip files not matching the expected suffixes
            continue

        # Generate a unique timestamp for the file
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        
        # Create the new name for the file
        new_name = f"{timestamp}_{filename}"
        
        # Copy the file to the destination directory with the new name
        source_path = os.path.join(source_dir, filename)
        dest_path = os.path.join(dest_dir, new_name)
        
        try:
            shutil.copyfile(source_path, dest_path)
            processed_files.append((filename, new_name))
            print(f"Copied {filename} to {new_name}")
        except (IOError, OSError) as e:
            print(f"Error copying {filename}: {e}")
    
    return processed_files


def is_valid_name(filename: str) -> bool:
    """
    Check if the filename complies with the naming convention.
    
    Args:
        filename: The filename to check against the convention
    
    Returns:
        bool: True if filename matches convention, False otherwise
    """
    # Check if the filename matches our convention: timestamp_originalname.ext
    parts = filename.split("_", 1)
    if len(parts) != 2:
        return False
    
    try:
        # Ensure the timestamp is exactly 14 digits (YYYYMMDDhhmmss)
        timestamp = parts[0]
        if len(timestamp) != 14:
            return False
            
        datetime.strptime(timestamp, "%Y%m%d%H%M%S")
        return True
    except ValueError:
        return False


def main() -> None:
    """Process command line arguments and run the script."""
    if len(sys.argv) != 3:
        print("Usage: python app.py source_directory destination_directory")
        sys.exit(1)

    source_dir = sys.argv[1]
    dest_dir = sys.argv[2]
    
    if not os.path.isdir(source_dir):
        print(f"Error: Source directory '{source_dir}' does not exist")
        sys.exit(1)
        
    enforce_naming_convention(source_dir, dest_dir)


# Example usage
if __name__ == "__main__":
    main()