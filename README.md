# File Naming Convention Project

A Python utility for enforcing consistent file naming conventions across directories by adding timestamps and directory information to filenames.

## Features

- Renames files according to standardized conventions
- Adds timestamps for file versioning and uniqueness
- Validates filenames against naming convention patterns
- Provides both single-directory and recursive processing
- Web-based demo with file upload and download capabilities
- Flexible timestamp positioning (prefix or suffix)

## Components

### Python Scripts

#### Basic Version (app.py)
- Processes files in a single directory
- Renames files with format: `YYYYMMDDHHMMSS_originalfilename.ext`

#### Advanced Version (appV2.py)
- Recursively processes files in a directory and all subdirectories
- Renames files with format: `YYYYMMDDHHMMSS_directoryname_originalfilename.ext`

#### Validation Script (test_validation.py)
- Tests the validation functionality
- Demonstrates valid and invalid naming patterns

### Web Demo

- Interactive HTML/CSS/JavaScript demonstration
- Simulates both basic and advanced renaming operations
- Features real file upload and download functionality:
  - Upload your own .txt and .csv files
  - Process files according to naming conventions
  - Download renamed files to your local computer
- Configurable timestamp positioning:
  - Prefix mode (timestamp at beginning): `YYYYMMDDHHMMSS_filename.ext`
  - Suffix mode (timestamp at end): `filename_YYYYMMDDHHMMSS.ext`
- Includes filename validation testing
- Open `index.html` in a browser to run the demo

## Usage

### Basic Version

```bash
python3 app.py source_directory destination_directory
```

Example output:
```
Copied sample.txt to 20250302235012_sample.txt
Copied data.csv to 20250302235012_data.csv
```

### Advanced Version

```bash
python3 appV2.py source_directory destination_directory
```

Example output:
```
Copied document.txt from docs to 20250302235012_docs_document.txt
Copied results.csv from data to 20250302235012_data_results.csv
Successfully processed 2 files
```

### Validation Testing

```bash
python3 test_validation.py
```

### Web Demo Usage

1. Open `index.html` in a modern web browser
2. Select the mode (Basic or Advanced)
3. Choose timestamp position (beginning or end)
4. Upload files using the file input control
5. For Advanced mode, specify the directory name
6. Click "Process Files" to generate renamed versions
7. Use the "Download" buttons to save renamed files

## Naming Convention

Files are renamed according to the following rules:

1. Basic format (Prefix mode): `YYYYMMDDHHMMSS_originalfilename.ext`
   - Timestamp must be exactly 14 digits
   - Must have exactly one underscore separator

2. Basic format (Suffix mode): `originalfilename_YYYYMMDDHHMMSS.ext`
   - Timestamp must be exactly 14 digits
   - Must have exactly one underscore separator

3. Advanced format (Prefix mode): `YYYYMMDDHHMMSS_directoryname_originalfilename.ext`
   - Timestamp must be exactly 14 digits
   - Must have exactly two underscore separators

4. Advanced format (Suffix mode): `directoryname_originalfilename_YYYYMMDDHHMMSS.ext`
   - Timestamp must be exactly 14 digits
   - Must have exactly two underscore separators

## Supported File Types

- Currently processes `.txt` and `.csv` files only
- Other file types are skipped during processing

## Requirements

- Python 3.6+ for Python scripts
- No external dependencies for Python scripts
- Modern web browser with JavaScript enabled for web demo
- File API support for file upload/download features

## Future Enhancements

- Support for additional file types
- Configurable naming patterns
- File metadata inclusion option
- Command-line flags for advanced options
- Drag-and-drop file upload interface
- Customizable date/time format options