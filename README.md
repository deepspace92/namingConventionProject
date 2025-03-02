# File Naming Convention Project

A Python utility for enforcing consistent file naming conventions across directories.

## Features

- Renames files according to standardized conventions
- Adds timestamps to ensure unique filenames
- Two versions available:
  - `app.py`: Processes files in a single directory
  - `appV2.py`: Recursively processes files in a directory and its subdirectories

## Usage

### Basic Version (app.py)

```bash
python app.py source_directory destination_directory
```

Files will be renamed to: `YYYYMMDDHHMMSS_originalfilename.ext`

### Advanced Version (appV2.py)

```bash
python appV2.py source_directory destination_directory
```

Files will be renamed to: `YYYYMMDDHHMMSS_directoryname_originalfilename.ext`

## Supported File Types

Currently supports `.txt` and `.csv` files only.