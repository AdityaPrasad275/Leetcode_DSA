// script.js

// Your map of categories and filenames with difficulty levels
const linkMap = new Map([
  ["Arrays and Hashing", [
    ["Contains Duplicate", 1],
    ["Valid Anagram", 1],
    ["Two sum", 2],
    ["Group Anagrams", 2],
    ["Top K Frequent Elements", 2],
    ["Product of Array except self", 2],
    ["Valid Sudoku", 2],
    ["Longest Consecutive Sequence", 2],
  ]],
  ["Stack", [
    ["Valid Parentheses", 1],
    ["Min Stack", 2],
    ["Evaluate Reverse Polish Notation", 2],
    ["Generate Parentheses", 2],
    ["Daily Temperatures", 2],
    ["Car Fleet", 2],
    ["Largest Rectangle in Histogram", 3]
  ]],
  ["Two Pointers", [
    ["Valid Palindrome", 1],
    ["Two Sum II", 2],
    ["3Sum", 2],
    ["Container with most water", 2],
    ["Trapping rain water", 3]
  ]],
  ["Binary search", [
    ["Binary Search", 1],
    ["Search a 2D Matrix", 2],
    ["Koko Eating Bananas", 2],
    ["Find Minimum in Rotated Sorted Array", 2],
    ["Search in Rotated Sorted Array", 2],
    ["Time Based Key-Value Store", 2],
    ["Median of Two Sorted Arrays", 3]
  ]],
  ["Sliding Window", [
    ["Best Time to Buy And Sell Stock", 1],
    ["Longest Substring Without Repeating Characters", 2],
    ["Longest Repeating Character Replacement", 2],
    ["Permutation In String", 2],
    ["Minimum Window Substring", 3],
    ["Sliding Window Maximum", 3]
  ]],
  ["Linked Lists", [
    ["Reverse Linked List", 1],
    ["Merge Two Sorted Lists", 1],
    ["Reorder List", 2],
    ["Remove Nth Node From End of List", 2],
    ["Copy List With Random Pointer", 2],
    ["Add Two Numbers", 2],
    ["Linked List cycle", 1],
    ["Find The Duplicate Number", 2],
    ["LRU Cache", 2],
    ["Merge K Sorted Lists", 3],
    ["Reverse Nodes In K Group", 3]
  ]],
  ["Trees", [
    ["Invert Binary Tree", 1],
    ["Maximum Depth of Binary Tree", 1],
    ["Diameter of Binary Tree", 1],
    ["Balanced Binary Tree", 1],
    ["Same Tree", 1],
    ["Subtree of Another Tree", 1],
    ["Lowest Common Ancestor of a Binary Search Tree", 2],
    ["Binary Tree Level Order Traversal", 2],
    ["Binary Tree Right Side View", 2],
    ["Count Good Nodes In Binary Tree", 2],
    ["Validate Binary Search Tree", 2],
    ["Kth Smallest Element In a Bst", 2],
    ["Construct Binary Tree From Preorder And Inorder Traversal", 2],
    ["Binary Tree Maximum Path Sum", 3],
    ["Serialize And Deserialize Binary Tree", 3]
  ]],
  ["Tries", [
    ["Implement Trie Prefix Tree", 2],
    ["Design Add And Search Words Data Structure", 2],
    ["Word Search II", 3]
  ]],
  ["Heap", [
    ["Kth Largest Element In a Stream", 1],
    ["Last Stone Weight", 1],
    ["K Closest Points to Origin", 2],
    ["Kth Largest Element In An Array", 2],
    ["Task Scheduler", 2],
    ["Design Twitter", 2],
    ["Find Median From Data Stream", 3]
  ]],
  ["Backtracking", [
    ["Subsets", 2],
    ["Combination Sum", 2],
    ["Permutations", 2],
    ["Subsets II", 2],
    ["Combination Sum II", 2],
    ["Word Search", 2],
    ["Palindrome Partitioning", 2],
    ["Letter Combinations of a Phone Number", 2],
    ["N Queens", 3]
  ]],
  ["Graph", [
    ["Number of Islands", 2],
    ["Clone Graph", 2],
    ["Max Area of Island", 2],
    ["Pacific Atlantic Water Flow", 2],
    ["Surrounded Regions", 2],
    ["Rotting Oranges", 2],
    ["Course Schedule", 2],
    ["Course Schedule II", 2]
  ]],
  ["Dynamic Programming 1", [
    ["Climbing Stairs", 1],
    ["Min Cost Climbing Stairs", 1],
    ["House Robber", 2],
    ["House Robber II", 2],
    ["Longest Palindromic Substring", 2],
    ["Palindromic Substrings", 2],
    ["Decode Ways", 2],
    ["Coin Change", 2]
  ]],
  ["Bit Manipulation", [
    ["Single Number", 1],
    ["Number of 1 Bits", 1],
    ["Counting Bits", 1],
    ["Reverse Bits", 1],
    ["Missing Number", 1]
  ]]
]);

const problemClassTechnique = new Map([
  ["Arrays and Hashing",
    "Maintaining frequency of elements - Hashing, 26 length arrays for strings, sets for ensuring duplicate elements are not present\n"
  + "Grouping elements based on property asked in question\n"
  + "Prefix, suffix arrays\n"],
  ["Stack", "Stack"],
  ["Two Pointers", "Two Pointers"],
  ["Binary search", "Binary Search"],
  ["Sliding Window", "Sliding Window"],
  ["Linked Lists", "Linked List"],
  ["Trees", "Tree"],
  ["Tries", "Trie"],
  ["Heap", "Heap"],
  ["Backtracking", "Backtracking"],
  ["Graph", "Graph"],
  ["Dynamic Programming 1", "Dynamic Programming"],
  ["Bit Manipulation", "Bit Manipulation"]
]);

// Function to encode special characters in a string
function encodeURLParam(param) {
  return encodeURIComponent(param);
}

// Function to construct the URL
function constructURL(folder, filename) {
  const encodedFolder = encodeURLParam(folder);
  const encodedFilename = encodeURLParam(filename);
  return `./website.html?url=${encodedFolder}/${encodedFilename}.md`;
}

// function to create blocks for each category. Each category has a title, its problem solving techinque/description and the list of problems
function createBlocks(container, map)
{
  map.forEach((entries, category) =>
  {
    const categoryDiv = document.createElement('div');// create a div for each category
    categoryDiv.classList.add('problemClassBlock'); 
    categoryDiv.innerHTML = `<h2 style="margin-bottom: 0px;">${category}</h2><hr>`; // accordian div for each category
    
    const technique = problemClassTechnique.get(category); // get the problem solving technique for each category
    const problemClassDiv = document.createElement('div');
    problemClassDiv.innerHTML = `<p>${technique}</p>`;
    categoryDiv.appendChild(problemClassDiv);

    const problems = document.createElement('div');
    problems.innerHTML = '<button class="accordion">Problems</button>';
    const panel = document.createElement('div');
    panel.classList.add('panel');
    problems.appendChild(panel);

    categoryDiv.appendChild(problems);
    entries.forEach(entry => {
      const [filename, difficulty] = entry;
      const dynamicURL = constructURL(category, filename);

      const linkElement = document.createElement('a');
      linkElement.href = dynamicURL;
      linkElement.textContent = filename;

      const listItem = document.createElement('li');
      // Set class based on difficulty level
      if (difficulty === 1) {
        listItem.classList.add('easy');
      } else if (difficulty === 2) {
        listItem.classList.add('medium');
      } else if (difficulty === 3) {
        listItem.classList.add('hard');
      }
      listItem.appendChild(linkElement);
      panel.appendChild(listItem);
    });

    container.appendChild(categoryDiv);
  });
}

function accordion() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

// Example usage
const arrayContainer = document.querySelector('.links-list');
createBlocks(arrayContainer, linkMap);
accordion();
