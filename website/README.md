## generateLinkMap.js
This script goes through the repo and generates a sort of map of class names and question names for each problem. this is derived from the folder strcuture of the repo.
The output is stored in `linkMap.json` file.

Points to keep in mind - 
- the default difficulty is medium so for easy and hard problems, the difficulty has to be manually changed in the json file
- this is a script to be run everytime you add a new soln to the repo, it will not automatically run in github ci/cd or something
- the script has a `excludedFiles`  array which can be used to exclude certain files or folders from the map. just add in their names (the files and folders) and it will be excluded from the map
- its a work in progress, please check if the output is correct and make changes accordingly


