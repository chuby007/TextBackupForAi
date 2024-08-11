#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const { packFiles } = require('./packModule');
const { unpackFiles } = require('./unpackModule');
const { getIgnorePatterns } = require('./ignoreModule');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  pack: false,
  unpack: false,
  folder: './',
  output: null,
  extension: 'txtbkp',
  ignore: false,
  itxtbkp: false
};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '-p':
    case '--pack':
      options.pack = true;
      break;
    case '-up':
    case '--unpack':
      options.unpack = true;
      break;
    case '-f':
    case '--folder':
      options.folder = args[++i] || './';
      break;
    case '-o':
    case '--output':
      options.output = args[++i];
      break;
    case '-ex':
    case '--extension':
      options.extension = args[++i] || 'txtbkp';
      break;
    case '-i':
    case '--ignore':
      options.ignore = args[++i] || true;
      break;
    case '-itxtbkp':
      options.itxtbkp = true;
      break;
    case '-h':
    case '--help':
      printHelp();
      process.exit(0);
  }
}


function printHelp() {
  console.log(`
Text Archive Tool: Pack and unpack text files while preserving directory structure.

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
  `);
}

async function fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
  
  async function folderExists(folderPath) {
    try {
      const stats = await fs.stat(folderPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  }
  
  function askOverwrite(filePath) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise(resolve => {
      rl.question(`The file ${filePath} already exists. Do you want to overwrite it? (y/n) `, answer => {
        rl.close();
        resolve(answer.toLowerCase() === 'y');
      });
    });
  }
  
  function ensureFileExtension(filePath, defaultExtension) {
    const parsedPath = path.parse(filePath);
    if (!parsedPath.ext) {
      return `${filePath}.${defaultExtension}`;
    }
    return filePath;
  }
  
  async function main() {
    try {
      if (Object.keys(options).length === 1 && options.folder === './') {
        printHelp();
        return;
      }
  
      if (options.pack) {
        // Check if input folder exists
        if (!(await folderExists(options.folder))) {
          console.error(`Error: Input folder '${options.folder}' not found.`);
          process.exit(1);
        }
  
        const ignorePatterns = await getIgnorePatterns(options.folder, options.ignore);
        let outputFile = options.output;
        if (!outputFile) {
          const folderName = path.basename(path.resolve(options.folder));
          outputFile = `${folderName}.${options.extension}`;
        } else {
          outputFile = ensureFileExtension(outputFile, options.extension);
        }
  
        if (await fileExists(outputFile)) {
          const overwrite = await askOverwrite(outputFile);
          if (!overwrite) {
            console.log('Operation cancelled.');
            return;
          }
        }
  
        await packFiles(options.folder, outputFile, ignorePatterns, options.itxtbkp);
        console.log(`Packed files into ${outputFile}`);
      } else if (options.unpack) {
        let inputFile = options.output;
        if (!inputFile) {
          console.error('Please specify an input file to unpack with -o option');
          process.exit(1);
        }
        
        // Ensure input file has the correct extension
        inputFile = ensureFileExtension(inputFile, options.extension);
        
        // Check if input file exists
        if (!(await fileExists(inputFile))) {
          console.error(`Error: Input file '${inputFile}' not found.`);
          process.exit(1);
        }
  
        // Check if output folder exists
        if (!(await folderExists(options.folder))) {
          console.error(`Error: Output folder '${options.folder}' not found.`);
          process.exit(1);
        }
  
        try {
          await unpackFiles(inputFile, options.folder);
          console.log(`Unpacked files to ${options.folder}`);
        } catch (error) {
          console.error(`Error unpacking files: ${error.message}`);
          process.exit(1);
        }
      } else {
        printHelp();
      }
    } catch (error) {
      console.error('An error occurred:', error);
      process.exit(1);
    }
  }
  
  main();
  
  