// unpackModule.js

const fs = require('fs').promises;
const path = require('path');

async function unpackFiles(archiveFile, destinationFolder) {
  const archiveContent = await fs.readFile(archiveFile, 'utf-8');
  const lines = archiveContent.split('\n');

  let currentFile = null;
  let currentContent = '';
  let isReadingContent = false;

  for (const line of lines) {
    if (line.startsWith('file:')) {
      if (currentFile) {
        await saveFile(currentFile, currentContent.trim(), destinationFolder);
        currentContent = '';
      }
      currentFile = line.slice(5); // Remove 'file:' prefix
      isReadingContent = true;
    } else if (isReadingContent) {
      currentContent += line + '\n';
    }
  }

  if (currentFile) {
    await saveFile(currentFile, currentContent.trim(), destinationFolder);
  }
}

async function saveFile(filePath, content, destinationFolder) {
  const fullPath = path.join(destinationFolder, filePath);
  const dirPath = path.dirname(fullPath);

  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(fullPath, content);
  console.log(`Created file: ${fullPath}`);
}

module.exports = { unpackFiles };