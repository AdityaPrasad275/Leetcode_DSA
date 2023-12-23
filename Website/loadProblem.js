// loadProblem.js
async function loadProblem(url) {
  try {
    const response = await fetch(`${url}`);
    const markdown = await response.text();
    const html = marked.parse(markdown);
    document.getElementById('problem-content').innerHTML = html;
  } catch (error) {
    console.error('Error loading problem:', error);
  }
}
