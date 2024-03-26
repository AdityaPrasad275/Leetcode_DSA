function createFooter() {
  return `
    <footer class="footer">
      <a href="https://github.com/AdityaPrasad275" style="margin: 0 10px;">
        <img src="/website/icons/icons8-github-64.png" alt="github" style="vertical-align: middle;">
      </a>
      <a href="https://www.linkedin.com/in/adityanpd/" style="margin: 0 10px;">
        <img src="/website/icons/icons8-linkedin-64.png" alt="linkedin" style="vertical-align: middle;">
      </a>
      <p style="margin: 0px 0px 0px 0px;">Icons by<a href="https://icons8.com/">Icons-8</a></p>
    </footer>
  `;
}
function setFavicon() {
  var link = document.createElement('link');
  link.rel = 'icon';
  link.href = '/website/icons/icons8-rocket-16.png';
  document.head.appendChild(link);
}
setTheme();
setFavicon();
document.querySelector('#footer').innerHTML = createFooter();

document.body.insertAdjacentHTML('afterbegin', '<button id="theme">Toggle Theme</button>');

document.getElementById('theme').addEventListener('click', function () {
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  setTheme();
});

function setTheme() {
  document.body.classList.remove('light-mode', 'dark-mode');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.add('light-mode');
  }
}