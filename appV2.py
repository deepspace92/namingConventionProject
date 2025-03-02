import os
import sys
from datetime import datetime
import shutil


def enforce_naming_convention():
    """Enforce naming convention for files in a local directory."""
    if len(sys.argv) != 3:
        print("Usage: python script.py source_directory destination_directory")
        sys.exit(1)

    source_dir = sys.argv[1]
    dest_dir = sys.argv[2]

    # Create the destination directory if it doesn't exist
    os.makedirs(dest_dir, exist_ok=True)

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

            # Copy the file to the destination directory with the new name
            shutil.copyfile(os.path.join(dirpath, filename), os.path.join(dest_dir, new_name))
            print(f"Copied {filename} to {new_name}")


# Example usage
if __name__ == "__main__":
    enforce_naming_convention()
