# [Question](https://leetcode.com/problems/word-search/)
Difficulty: Medium 
# Goal
given a 2D board and a word, find if the word exists in the grid. The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell/tile may not be used more than once.
# Solution
## Trick
Simple dfs. On every tile check it and it's neighbours for the next letter in the word. If found, recurse. If not found, backtrack.
## Code
```cpp
class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) 
    {
        for(int i = 0; i < board.size(); i++)
            for(int j = 0; j < board[0].size(); j++)
                if(dfs(word, 0, board, i, j)) return true;

        return false;
    }
    bool dfs(string &word, int index, vector<vector<char>>& board, int i, int j)
    {
        if(i < 0 or j < 0 or i >= board.size() or j >= board[0].size() or board[i][j] != word[index]) return false;

        if(index == word.size() - 1) return true;
        
        board[i][j] = '#';
        
        bool found = dfs(word, index + 1, board, i + 1, j) or
                     dfs(word, index + 1, board, i - 1, j) or
                     dfs(word, index + 1, board, i, j - 1) or 
                     dfs(word, index + 1, board, i, j + 1);

        board[i][j] = word[index];
        return found;
    }
};
```
comment - i didn't even know 'or' was a thing in cpp. I thought it was just ||. 
## Time Complexity: $O(n\cdot 3^{l-1})$
Where n is number of cells and l is length of word.