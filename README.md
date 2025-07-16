# Photo File Renamer

An automated photo processing system that works with iOS Shortcuts to rename and organize photos based on their EXIF metadata.

## Overview

This project consists of two parts:

1. **iOS Shortcut**: Allows users to select photos and save them to a watched folder
2. **Deno Application**: Monitors the folder, extracts EXIF data, renames files with creation timestamps, and moves them to a processed directory

## Features

- 📁 **File Watching**: Automatically detects new image files (HEIC, MOV, JPG, JPEG)
- 📸 **EXIF Processing**: Extracts creation date from photo metadata
- 🏷️ **Smart Renaming**: Formats filenames as `DD MMM YYYY HH:MM:SS_originalname`
- 📧 **Error Notifications**: Email alerts for processing issues
- 🧪 **Well Tested**: Comprehensive test suite with 90%+ coverage

## Quick Start

### Prerequisites

- [Deno](https://deno.land/) installed

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd rename-photo-file
```

2. Set up environment variables:

```bash
# Create .env file
echo "WATCHER_FOLDER_PATH=/path/to/your/watch/folder" > .env
```

3. Run the application:

```bash
# Development mode (watches src/example-assets)
deno task dev

# Production mode (watches WATCHER_FOLDER_PATH)
deno task start
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `WATCHER_FOLDER_PATH` | Yes (prod) | Path to the folder to monitor for new photos |
| `NODE_ENV` | No | Set to `prod` for production mode |

### iOS Shortcut Setup

1. Create a new Shortcut in the Shortcuts app
2. Add "Get Photos from Library" action
3. Add "Save to Files" action pointing to your watch folder
4. The app will automatically process new files

## Project Structure

```text
src/
├── modules/ # Core functionality
│ ├── exifReader.ts # EXIF data extraction
│ ├── renameFile.ts # File renaming logic
│ └── email.ts # Notification system
├── tests/ # Test files
├── types.ts # TypeScript definitions
├── constants.ts # Configuration constants
├── utils.ts # Utility functions
└── main.ts # Application entry point
```

## Development

### Running Tests

```bash
deno test --allow-all
```

### Code Quality

```bash
# Format code
deno fmt

# Lint code
deno lint
```

## How It Works

1. **File Detection**: The app watches the specified folder for new image files
2. **EXIF Extraction**: When a new file is detected, it reads the creation date from EXIF metadata
3. **Filename Generation**: Creates a new filename format: `21 Oct 2024 23:20:34_originalname.ext`
4. **File Processing**: Moves the renamed file to a `processed` subfolder
5. **Completion Tracking**: Writes a timestamp to `latest.txt` when all files are processed

## Error Handling

The application includes comprehensive error handling:

- Invalid or missing EXIF data
- File system errors
- Email notification failures
- Graceful recovery from processing errors

## License

MIT License - see LICENSE file for details
