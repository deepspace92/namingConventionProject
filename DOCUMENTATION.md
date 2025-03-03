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

The web demo (**index.html**, **styles.css**, **script.js**) provides a browser-based interface with the following features:

#### File Upload System

The web demo uses the HTML5 File API to implement file uploading:

- **HTML**: `<input type="file">` elements with multiple file selection support
- **JavaScript**: FileReader API to handle file contents
- **Validation**: Client-side extension checking (.txt and .csv)

#### File Processing

Processing happens entirely client-side:

1. Files are stored in memory as JavaScript File objects
2. When "Process Files" is clicked, JavaScript:
   - Generates timestamps using the current date/time
   - Creates new filenames based on the naming convention
   - Creates virtual renamed files ready for download

#### Download Implementation

The download functionality uses the following browser APIs:

1. **Blob API**: To create file data blobs in memory
2. **URL.createObjectURL()**: To create temporary URLs for the file blobs
3. **Programmatic download links**: To trigger file downloads

#### Key Code Components

- **File Collection**: Arrays store uploaded files with metadata
- **DOM Manipulation**: Dynamic creation of file list and result items
- **Event Handling**: Click events for upload, process, download
- **File Processing**: Pure JavaScript implementation of the naming convention logic

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
5. Client-side validation in the web demo for file types

## Browser Compatibility

The web demo requires the following browser capabilities:

- HTML5 File API support
- JavaScript ES6 features (template literals, arrow functions)
- Blob API and URL.createObjectURL support
- Modern CSS (flexbox layouts)

Tested and confirmed working on:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Considerations

- File operations use Python's built-in **shutil.copyfile** for efficiency
- The scripts store processed files in memory, which could be a limitation for very large directories
- Recursive traversal in appV2.py handles nested directories but may take longer for deep hierarchies
- The web demo processes files in memory, so very large files may cause performance issues

## Extension Points

The code is designed with several extension points:

1. **File type expansion**: Modify the file extension check to include more types
2. **Naming pattern customization**: Modify the timestamp format or naming pattern structure
3. **Processing options**: Add command-line flags for additional functionality
4. **Web demo enhancements**: Add drag-and-drop, progress indication, batch downloads
5. **Logging enhancement**: Replace print statements with proper logging

## Test Fixtures

The repository includes test directories for both versions:

- **test_source** and **test_destination**: For basic version testing
- **test_source_advanced** and **test_destination_advanced**: For advanced version testing

These provide ready-to-use examples for manual testing and demonstration.