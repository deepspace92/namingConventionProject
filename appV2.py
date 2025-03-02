"""
File naming convention enforcer (version 2).

This script enforces naming conventions by recursively searching a directory
and its subdirectories, copying files to a destination directory with 
standardized names based on timestamps and parent directory names.
"""
import os
import sys
import shutil
from datetime import datetime
from typing import List, Tuple, Optional


def enforce_naming_convention(source_dir: str, dest_dir: str) -> List[Tuple[str, str]]:
    """
    Enforce naming convention for files in a local directory and its subdirectories.
    
    Args:
        source_dir: Path to the source directory containing files to process
        dest_dir: Path to the destination directory where renamed files will be placed
    
    Returns:
        List[Tuple[str, str]]: List of tuples containing (original_filename, new_filename)
    """
    # Create the destination directory if it doesn't exist
    os.makedirs(dest_dir, exist_ok=True)
    
    processed_files = []
    
    # Recursively walk through all subdirectories
    for dirpath, _, filenames in os.walk(source_dir):
        for filename in filenames:
            if not filename.endswith((".txt", ".csv")):
                # Skip files not matching the expected suffixes
                continue

            # Generate a unique timestamp for the file
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            
            # Get the directory name and remove any leading path separators
            directory_name = os.path.basename(os.path.normpath(dirpath))
            
            # Create the new name for the file including the directory name and timestamp
            new_name = f"{timestamp}_{directory_name}_{filename}"
            
            # Define source and destination paths
            source_path = os.path.join(dirpath, filename)
            dest_path = os.path.join(dest_dir, new_name)
            
            try:
                shutil.copyfile(source_path, dest_path)
                processed_files.append((os.path.join(dirpath, filename), new_name))
                print(f"Copied {filename} from {directory_name} to {new_name}")
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
    # Check if the filename matches our convention: timestamp_directory_originalname.ext
    parts = filename.split("_", 2)
    if len(parts) != 3:
        return False
    
    try:
        datetime.strptime(parts[0], "%Y%m%d%H%M%S")
        return True
    except ValueError:
        return False


def main() -> None:
    """Process command line arguments and run the script."""
    if len(sys.argv) != 3:
        print("Usage: python appV2.py source_directory destination_directory")
        sys.exit(1)

    source_dir = sys.argv[1]
    dest_dir = sys.argv[2]
    
    if not os.path.isdir(source_dir):
        print(f"Error: Source directory '{source_dir}' does not exist")
        sys.exit(1)
        
    processed_files = enforce_naming_convention(source_dir, dest_dir)
    print(f"Successfully processed {len(processed_files)} files")


# Example usage
if __name__ == "__main__":
    main()