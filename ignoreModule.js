// ignoreModule.js

const fs = require('fs').promises;
const path = require('path');
const ignore = require('ignore');

async function getIgnorePatterns(folderPath, ignoreOption) {
  const ig = ignore();

  if (ignoreOption) {
    let ignoreFile = '.gitignore';

    if (typeof ignoreOption === 'string') {
      ignoreFile = ignoreOption;
    } else if (await fileExists(path.join(folderPath, '.txtbkpignore'))) {
      ignoreFile = '.txtbkpignore';
    }

    try {
      const ignoreContent = await fs.readFile(path.join(folderPath, ignoreFile), 'utf-8');
      ig.add(ignoreContent);
    } catch (error) {
      console.warn(`Warning: Could not read ${ignoreFile}. Proceeding without ignore patterns.`);
    }
  }

  return ig;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

module.exports = { getIgnorePatterns };