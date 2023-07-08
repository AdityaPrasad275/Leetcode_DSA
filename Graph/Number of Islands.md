# [Question](https://leetcode.com/problems/number-of-islands/)
Difficulty: Medium (Simple DFS so easy)
# Goal
In a 2D grid map of `1`s (land) and `0`s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
# Solution
## Trick
Just simple DFS. The only trick is to change the value of the visited node to `0` so that we don't need to use a visited array. We loop through the grid and call the helper/dfs function when we see a `1`. Each call, we increment counter which is the number of islands.   
In the helper function, we check if the current node is out of bound or is a `0`. If it is, we return. Otherwise, we change the value of the current node to `0` and call the helper function on the four adjacent nodes.
## Code
```cpp
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) 
    {
        int counter = 0;
        for(int i = 0; i < grid.size(); i++)
        {
            for(int j = 0; j < grid[0].size(); j++)
            {
                if(grid[i][j] == '1')
                {
                    helper(grid, i, j);
                    counter++;
                }
            }
        }
        return counter;
    }
    void helper(vector<vector<char>>& grid, int i, int j)
    {
        if(i < 0 or i >= grid.size() 
        or j < 0 or j >= grid[0].size()
        or grid[i][j] == '0') return;

        grid[i][j] = '0';
        
        helper(grid, i - 1, j);
        helper(grid, i + 1, j);
        helper(grid, i, j - 1);
        helper(grid, i, j + 1);
        
        return;
    }
};
```
## Time Complexity: $O(n)$
Where n is number of tiles of the grid. We visit each tile once.

The function call stack is huge though. For each tile we call the helper function 4 times, which is roughly $O(4^n)$. 