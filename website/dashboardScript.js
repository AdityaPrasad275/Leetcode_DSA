// dashboardScript.js

// Function to load and parse the JSON file
async function loadLinkMap() {
  try {
    const response = await fetch('./website/linkMap.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    createProblemClassDivs(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Function to create div elements for each problem class
function createProblemClassDivs(linkMap) {
  const problemClassesGrid = document.querySelector('.problem-classes-grid');

  for (const problemClass in linkMap) {
    if (linkMap.hasOwnProperty(problemClass)) {
      const a = document.createElement('a');
      a.classList.add('grid-card');
      a.href = `./website/problemClassPage.html?name=${encodeURIComponent(problemClass)}`;
      a.textContent = problemClass;
      problemClassesGrid.appendChild(a);
    }
  }
}

// Call the function to load the JSON file
loadLinkMap();