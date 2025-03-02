# File Naming Convention Project Documentation

## Project Overview

This project provides tools for standardizing file naming conventions in directories. It was designed to help maintain consistency in file organization, especially in environments where many files are generated or processed.

## Implementation Details

### Core Functionality

The project is implemented as two Python scripts with different capabilities:

1. **app.py**: Basic implementation for single directory processing
2. **appV2.py**: Advanced implementation with recursive directory traversal

Both scripts follow a similar architecture:

```
Input Directory → File Selection → Rename Operation → Output Directory
```

### Function Descriptions

#### enforce_naming_convention

This function is the main entry point for both scripts:

- **Input**: Source directory path, destination directory path
- **Process**:
  1. Creates destination directory if it doesn't exist
  2. Finds relevant files (.txt, .csv)
  3. Generates timestamp for each file
  4. Creates new filename according to the convention
  5. Copies file with new name to destination directory
- **Output**: List of processed files (tuples of original and new names)

#### is_valid_name

This function validates if a filename follows the naming convention:

- **Input**: Filename string
- **Process**:
  1. Splits filename by underscores
  2. Validates number of parts (2 for basic, 3 for advanced)
  3. Validates timestamp format (must be 14 digits matching YYYYMMDDhhmmss)
  4. Validates timestamp is a valid date/time
- **Output**: Boolean indicating if the filename is valid

#### main

Entry point function that:
1. Processes command-line arguments
2. Validates source directory exists
3. Calls enforce_naming_convention
4. Outputs results

### Web Demo Implementation

The web demo (**index.html**, **styles.css**, **script.js**) provides a browser-based interface:

- Tab-based interface for basic and advanced modes
- File addition simulation
- Renaming simulation with timestamp generation
- Validation testing for filenames

The JavaScript implements the same validation logic as the Python scripts to ensure consistency.

## Testing

Testing is implemented through a dedicated script (**test_validation.py**) that:

1. Imports validation functions from both app.py and appV2.py
2. Tests a variety of valid and invalid filenames
3. Outputs results to verify validation logic works correctly

## Error Handling

The code includes several error handling mechanisms:

1. Input validation for command-line arguments
2. Directory existence validation
3. Try/except blocks for file operations
4. Timestamp validation in the validation functions

## Performance Considerations

- File operations use Python's built-in **shutil.copyfile** for efficiency
- The scripts store processed files in memory, which could be a limitation for very large directories
- Recursive traversal in appV2.py handles nested directories but may take longer for deep hierarchies

## Extension Points

The code is designed with several extension points:

1. **File type expansion**: Modify the file extension check to include more types
2. **Naming pattern customization**: Modify the timestamp format or naming pattern structure
3. **Processing options**: Add command-line flags for additional functionality
4. **Logging enhancement**: Replace print statements with proper logging

## Test Fixtures

The repository includes test directories for both versions:

- **test_source** and **test_destination**: For basic version testing
- **test_source_advanced** and **test_destination_advanced**: For advanced version testing

These provide ready-to-use examples for manual testing and demonstration.