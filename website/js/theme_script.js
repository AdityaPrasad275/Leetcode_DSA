// Check for saved 'darkMode' in localStorage
const savedDarkMode = localStorage.getItem('darkMode');

const body = document.body;
const darkModeToggle = document.getElementById('darkModeToggle');

// Set dark mode from saved preference
if (savedDarkMode === 'dark') {
  body.classList.add('dark-mode');
} else {
  body.classList.remove('dark-mode');
}

// Event listener
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  // Save the current theme preference to localStorage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'dark');
  } else {
    localStorage.setItem('darkMode', 'light');
  }
});