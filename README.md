# Leetcode_DSA
A repo for 150 problem set from neetcode's rodemap, all problems' simplified statement and their answer is stored here. [This](https://adityaprasad275.github.io/Leetcode_DSA/) website renders it in a simple and beautiful way.

## How the website is designed?
The landing page is a simple list of links to all the problems. The link is to a page which simply renders the .md file for the problem that can be found in this repo. The .md file is rendered using [zero-md](https://github.com/zerodevx/zero-md). The website is hosted using github pages. 

### Organisation 
- [index.html](./index.html) is the landing page. It contains the list of links to all the problems.
- [styles.css](./styles.css) contains the styling for the website. Quite proud of it's minimal yet beautiful design.
- [script.js](./script.js) handles what links are present in the landing page. It loops through a map data structure which essentially stores the file system/structure of this repo. The main function(`createLinks`) loops through this map/array and creates a list of links to all the problems. Because `zero-md` takes the url of .md file to be rendered, we have to carefully construct the url such that it points to the correct .md file. Then the link tag is created for each problem and it's src is given the url of formate `./website.html?url=${encodedFolder}/${encodedFilename}.md`. The encodedFolder and encodedFilename are the encoded versions of the folder and filename respectively. This is done to avoid any errors due to special characters in the folder or filename. The encodedFolder and encodedFilename are created using the `encodeURI()` function. The difficulty level for eac problem is also stored and used for color coding(green for easy, yellow for medium and red for hard).
- [website.html]('./website.html') is the page that renders the .md file. It has it's own script that does the following - 
  - It gets the url of the .md file to be rendered from the url of the page. This is done using the `URLSearchParams` object.
  - Then it passes this url to `zero-md` which renders the .md file.
- [prism-material-light.css](./prism-material-light.css) is the css file for the code blocks in the .md files. It is used by `zero-md` to render the code blocks.

### How to add a new problem?
- First and foremost is obviously to make a file under whichever folder the problem belongs to. 
- Then go to [script.js](./script.js#L/4) and add the problem to the map data structure (it's present on top, line 4). The `linkMap` is a map of the form `Map<folderName, Array<[fileName, difficultyLevel]>>`. The `folderName` is the name of the folder under which the problem is stored. The `fileName` is the name of the problem/filename.The names are encoded by the script, we don't need to worry about spaces and such. The `linkMap` looks something like this - 
```javascript
const linkMap = new Map([
  ["Arrays and Hashing", [
    ["Contains Duplicate", 1], //easy problem so difficulty level is 1
    ["Valid Anagram", 1],
    .
    .
  ]],
  ["Stack", [
    ["Valid Parentheses", 1],
    ["Min Stack", 2], //medium problem so difficulty level is 2
    .
    .
  ]],
  .
  .
  .
```
The `difficultyLevel` is the difficulty level of the problem. It is used for color coding the problem links in the landing page. The difficulty level is a number from 1 to 3. 1 is for easy, 2 for medium and 3 for hard.

---

If you add the new problem to the map, it will automatically be added to the landing page with proper linking to the md file. The script will take care of the rest.
