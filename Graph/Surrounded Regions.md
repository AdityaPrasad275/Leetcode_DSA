# [Question](https://leetcode.com/problems/surrounded-regions/)
Difficulty: Medium
# Goal
Capture all 'O' islands that are 4 directionally surrounded by 'X'. Which means all 'O' islands that are not captured are on the edge of the board.

# Solution
## Trick
Start at edges, and do DFS to capture all 'O' islands touching the edges(Mark them as '#'). Then, all 'O' islands that are not captured are surrounded by 'X'. Finally, we can capture all 'O' islands by marking them as 'X' and restore all '#' to 'O'.
## Code
```cpp
class Solution 
{
public:
    void solve(vector<vector<char>>& board) 
    {
        //top edge
        for(int j = 0; j < board[0].size(); j++)
            helper(board, 0, j);

        //bottom edge
        for(int j = 0; j < board[0].size(); j++)
            helper(board, board.size() - 1, j);

        //left edge
        for(int j = 0; j < board.size(); j++)
            helper(board, j, 0);

        //right edge
        for(int j = 0; j < board.size(); j++)
            helper(board, j, board[0].size() - 1);

        //capture all 'O' islands
        for(int i = 0; i < board.size(); i++)
        {
            for(int j = 0; j < board[0].size(); j++)
            {
                if(board[i][j] != '#') board[i][j] = 'X';
            }        
        }

        //restore all '#' to 'O'
        for(int i = 0; i < board.size(); i++)
        {
            for(int j = 0; j < board[0].size(); j++)
            {
                if(board[i][j] == '#') board[i][j] = 'O';
            }        
        }
    }
    void helper(vector<vector<char>>& b, int i, int j)
    {
        if(i<0 or i >= b.size() or j < 0 or j >= b[0].size() or b[i][j] == '#' or b[i][j] == 'X') return;

        b[i][j] = '#';

        helper(b, i + 1, j);
        helper(b, i - 1, j);
        helper(b, i, j+1);
        helper(b, i, j-1);
    }
};
```
## Time Complexity: $O(n)$
Where $n$ is the number of tiles in the board. We visit each tile at most thrice.