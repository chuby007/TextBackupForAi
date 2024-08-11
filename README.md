```
  _____         _       _               _     _          _____           _ 
 |_   _|____  _| |_    / \   _ __ ___ | |__ (_)_   ____|_   _|__   ___ | |
   | |/ _ \ \/ / __|  / _ \ | '__/ __|| '_ \| \ \ / / _ \| |/ _ \ / _ \| |
   | |  __/>  <| |_  / ___ \| | | (__ | | | | |\ V /  __/| | (_) | (_) | |
   |_|\___/_/\_\\__| /_/   \_\_|  \___||_| |_|_| \_/ \___||_|\___/ \___/|_|
                                                                          
          ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
          │  ┌───────┐  │  │  ┌───────┐  │  │  ┌───────┐  │
          │  │ File1 │  │  │  │ File2 │  │  │  │ File3 │  │
          │  └───────┘  │  │  └───────┘  │  │  └───────┘  │
          └─────────────┘  └─────────────┘  └─────────────┘
                      │          │          │
                      │          │          │
                      │          ▼          │
                      │  ┌───────────────┐  │
                      │  │   Archive     │  │
                      │  │  ┌─────────┐  │  │
                      └─►│  │ txtbkp  │  │◄─┘
                         │  └─────────┘  │
                         └───────────────┘
```

# Text Archive Tool

## Overview

This application was created to provide a straightforward way to manage and move text files around, particularly code snippets. It's designed to be a helpful tool for AI projects, helping to keep your workspace organized and less cluttered.

## Purpose

The main purpose of this app is to assist users working on AI projects, especially when dealing with large chat conversations (like those in Claude) that eventually reach their limits. By using this tool, you can easily save and manage important pieces of text or code, making it simpler to continue your work across multiple chat sessions.

## Features

- Pack and unpack text files while preserving directory structure
- Simple interface for managing text files
- Easy to save and retrieve code snippets
- Helps organize content for AI projects
- Reduces clutter in your workspace

## Installation

You can download the packaged distributions of this app in the `/dist` directory. Choose the appropriate version for your operating system.

## Usage

The Text Archive Tool can be used via command line with the following options:

```
Usage: node txtbkp.js [options]

Options:
  -p, --pack              Pack files into an archive
  -up, --unpack           Unpack files from an archive
  -f, --folder <path>     Specify the folder to pack or unpack to (default: ./)
  -o, --output <file>     Specify the output file for packing or input file for unpacking
  -ex, --extension <ext>  Specify the archive file extension (default: txtbkp)
  -i, --ignore [file]     Use .gitignore or custom ignore file
  -itxtbkp                Include .txtbkp files in the archive (default: exclude)
  -h, --help              Display this help message
```

### Examples:

1. To pack files in the current directory:
   ```
   node txtbkp.js -p
   ```

2. To unpack files from an archive:
   ```
   node txtbkp.js -up -o archive.txtbkp
   ```

3. To pack files from a specific folder and use a custom extension:
   ```
   node txtbkp.js -p -f /path/to/folder -ex customext
   ```

4. To pack files using a custom ignore file:
   ```
   node txtbkp.js -p -i custom_ignore_file
   ```

## Note on Version Control

I apologize in advance for any inconsistencies or issues with the repository structure or version control. I don't use Git extensively, so there might be some aspects of the project organization that aren't following best practices. I'm always open to suggestions for improvement!

## Contributions

Feel free to contribute to this project by submitting pull requests or opening issues. Any help in improving the app or its documentation is greatly appreciated.

## Support the Project

If you find this tool useful and want to show your appreciation, you can buy me a coffee:

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/RobertoSalvatierra)

Your support helps maintain and improve this project. Thank you!

## License

This project is licensed under the GNU General Public License v3.0. 

GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

For full license text, please see the [LICENSE](LICENSE) file in the project repository or visit [https://www.gnu.org/licenses/gpl-3.0.en.html](https://www.gnu.org/licenses/gpl-3.0.en.html).

---

Thank you for your interest in this Text Archive Tool. I hope it proves useful in your AI projects!
