// Import required modules
const fs = require('fs');
const path = require('path');

// Define the files to exclude
const excludedFiles = ['README.md', 'index.html', '.gitignore', '.git', 'website', 'resources', 'images'];

// Define the function to create a folder tree
function createFolderTree(dir, folderTree = {}) {
  const files = fs.readdirSync(dir); // Read the directory

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const fileStats = fs.statSync(fullPath);

    // Check if the file should be excluded
    if (excludedFiles.includes(file)) return;

    if (fileStats.isDirectory()) {
      // If it's a folder, recurse into the directory
      folderTree[file] = createFolderTree(fullPath);
    } else {
      // If it's a file, add it to the folder tree
      folderTree[file] = 'file';
    }
  });

  return folderTree;
}

// Helper function to transform the folder structure
function transformStructureToMap(structure, difficulty = 2) {
  let result = {};

  for (const [key, value] of Object.entries(structure)) {
    if (typeof value === 'object') {
      // If it's a folder (object), recursively transform its content
      result[key] = transformStructureToMap(value, difficulty);
    } else if (key.endsWith('.md')) {
      // If it's an .md file, add it with default difficulty (or logic for difficulty assignment)
      const problemName = key.replace('.md', ''); // Remove the ".md" extension
      result[problemName] = difficulty; // Default difficulty is 2
    }
  }

  return result;
}

// Top-level function to map directories (like 1-D DP, Stack, etc.)
function convertToDesiredFormat(structure, difficulty = 2) {
  let finalMap = {};

  for (const [folder, content] of Object.entries(structure)) {
    // Skip system folders or files, and ensure folder-level exclusion
    if (folder.startsWith('.') || excludedFiles.includes(folder) || folder === 'website') continue;

    // Transform the inner structure of each folder
    finalMap[folder] = transformStructureToMap(content, difficulty);
  }

  return finalMap;
}

// Specify the directory you want to scan (the root folder)
const directoryToScan = path.join(__dirname, '../');  // Adjust this path to your repo root folder

// Step 1: Create the folder structure
const folderStructure = createFolderTree(directoryToScan);

// Step 2: Convert the folder structure into the desired format (linkMap)
const linkMap = convertToDesiredFormat(folderStructure);

// Step 3: Output the result to linkMap.json
fs.writeFileSync(path.join(__dirname, 'linkMap.json'), JSON.stringify(linkMap, null, 2));

console.log('linkMap.json generated successfully!');
