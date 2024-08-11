const fs = require('fs').promises;
const path = require('path');

async function isTextFile(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    // Simple heuristic: if no null bytes in the first 1024 bytes, likely text
    return !buffer.slice(0, 1024).includes(0);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false;
  }
}

async function createFileStructure(folderPath, ignorePatterns, includeTxtbkp, relativePath = '') {
  let structure = '';
  const entries = await fs.readdir(path.join(folderPath, relativePath), { withFileTypes: true });

  for (const entry of entries) {
    const entryRelativePath = path.join(relativePath, entry.name);
    if (ignorePatterns.ignores(entryRelativePath)) continue;
    if (!includeTxtbkp && entry.name.endsWith('.txtbkp')) continue;

    if (entry.isDirectory()) {
      structure += `${' '.repeat(relativePath.split(path.sep).length * 2)}├── ${entry.name}/\n`;
      structure += await createFileStructure(folderPath, ignorePatterns, includeTxtbkp, entryRelativePath);
    } else {
      structure += `${' '.repeat(relativePath.split(path.sep).length * 2)}├── ${entry.name}\n`;
    }
  }
  return structure;
}

async function packFiles(folderPath, outputFile, ignorePatterns, includeTxtbkp) {
  let output = 'File Structure:\n';
  output += await createFileStructure(folderPath, ignorePatterns, includeTxtbkp);
  output += '\nFile Contents:\n\n';

  async function processDirectory(currentPath, relativePath = '') {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryRelativePath = path.join(relativePath, entry.name);
      if (ignorePatterns.ignores(entryRelativePath)) continue;
      if (!includeTxtbkp && entry.name.endsWith('.txtbkp')) continue;

      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath, entryRelativePath);
      } else if (entry.isFile() && await isTextFile(fullPath)) {
        output += `file:${entryRelativePath}\n`;
        const content = await fs.readFile(fullPath, 'utf-8');
        output += content + '\n\n';
      }
    }
  }

  await processDirectory(folderPath);
  await fs.writeFile(outputFile, output);
  console.log(`Packed files into ${outputFile}`);
}

module.exports = { packFiles };