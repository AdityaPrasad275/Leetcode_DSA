function generateLinkList(files, folder) {
  const problemList = document.querySelector('.problem-list');
  const list = document.createElement('ul');
  
  for (var i = 0; i < files.length; i++) {
    const encodedFileName = encodeURIComponent(files[i][0]);
    const encodedFolderName = encodeURIComponent(folder);

    const url = `../website/html/md_render.html?url=${encodedFolderName}/${encodedFileName}.md`;

    const a = document.createElement('a');
    a.href = url;
    a.textContent = files[i][0];

    const li = document.createElement('li');
    if (files[i][1] == 1) {
      li.className = 'easy';
    }
    else if (files[i][1] == 2) {
      li.className = 'medium';
    }
    else {
      li.className = 'hard';
    }
    
    li.appendChild(a);
    list.appendChild(li);
    problemList.appendChild(list);
  }
}