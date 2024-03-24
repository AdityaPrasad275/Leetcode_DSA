
// Make use of global config object to change default options
window.ZeroMdConfig = {
  prismUrl: [
    // Default Prism URLs
    ['https://cdn.jsdelivr.net/gh/PrismJS/prism@1/prism.min.js', 'data-manual'],
    'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js',
    // Also load Prism's `toolbar` and `copy-to-clipboard` plugins
    'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/toolbar/prism-toolbar.min.js',
    'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js'
  ],
  cssUrls: [
    // Default stylesheets
    'https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css',
    'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css',
    // Include CSS for `toolbar` plugin
    'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/toolbar/prism-toolbar.min.css'
  ]
}

// Configure MathJax settings for zero-md
MathJax = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ]
  }
}
addEventListener('zero-md-rendered', () => MathJax.typeset())
