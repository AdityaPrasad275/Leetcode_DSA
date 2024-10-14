# [Question](https://neetcode.io/problems/islands-and-treasure)
Difficulty: medium
Leetcode has this question locked behind premium, so i have included link to neetcode's question
# Goal
Basically we have a 2D grid with land, water, treasure chest. We want to find the distance from each land tile to the nearest treasure chest. We can move in 4 directions and we can only move to land tiles. 

representation details:
-`1` - A water cell that can not be traversed.
-`0` - A treasure chest.
-`INF` - A land cell that can be traversed. We use the integer 2^31 - 1 = `2147483647` to represent `INF`.

# Solution
## Trick
Simply - BFS from every treasure chest. we update land tile values with distance values, specifically minimum in competing cases.

The represenation is given adequately in the question itself. Such that we can easily manage visited and ensure the land tiles store the minimum distance from the treasure chest.

In code i have done dfs because managing distances is easier, just +1 of previous call. 
But the code works the same way as BFS.

## Code
```cpp
class Solution {
public:
    void islandsAndTreasure(vector<vector<int>>& grid) 
    {
        for(int i = 0; i < grid.size(); i++)
        {
            for(int j = 0; j < grid[0].size(); j++)
            {
                if(grid[i][j] == 0)
                    dfs(i, j, grid, 0);
            }
        }
    }
    void dfs(int i, int j, auto& grid, int d)
    {
        if( i < 0 or i >= grid.size() or
            j < 0 or j >= grid[0].size() or
            grid[i][j] == -1 or grid[i][j] < d)
            return;
        
        grid[i][j] = d;
        dfs(i-1, j, grid, d+1);
        dfs(i+1, j, grid, d+1);
        dfs(i, j-1, grid, d+1);
        dfs(i, j+1, grid, d+1);
    }
};
```
## Time Complexity: $O(n*k)$
Where $n$ is number of land tiles which can be at max $r*c$ (the number of tiles each bfs/dfs touches) and $k$ is the number of treasure chests (the number of times we do bfs/dfs)