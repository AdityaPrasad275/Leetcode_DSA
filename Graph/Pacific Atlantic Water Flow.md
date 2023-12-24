# [Question](https://leetcode.com/problems/pacific-atlantic-water-flow/)
Difficulty: Medium (Quite hard to come up with efficient solution. Brute force dfs is easy but gets TLE)
# Goal
Removing the "story" of the problem, the task is to find all the tiles in a `m by n` grid such that there should exist a path from this tile to both (top OR left edge) AND (bottom OR right edge) of the grid and this path follows the rule that each new tile in the path(towards the goal) should have a height less than or equal to the previous tile. The "height" of a tile is given by the value of the tile in the grid.
# Solution
## Trick
The brute force that results in TLE -  
For each tile, we do a dfs to find if it satisfies the required condition. If there is, we add this tile to the result. This takes $O((mn)^2)$ time.

The efficient solution -  
Instead of going center to out or tile to edge, we go from edge to tile. From top and left edge, we do a dfs to find all the tiles that can be reached from this edge. We store these tiles in a set. Then we do the same from bottom and right edge and our answer is the intersection of these two sets. This takes $O(mn)$ time.

These two sets can also be thought of as two "visited" arrays.   
The helper function is simple dfs where visited not only helps us not retrace our steps but also keeps track of the tiles that can be reached from the edge.
## Code
```cpp
class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) 
    {
        int n = heights.size();//number of rows
        int m = heights[0].size();//number of columns

        vector<vector<bool>> topLeft(n, vector<bool>(m));
        vector<vector<bool>> bottomRight(n, vector<bool>(m));

        //loop through all columns
        for(int i = 0; i < m; i++)
        {
            helper(0, i, heights, heights[0][i], topLeft);//call helper on top edge
            helper(n - 1, i, heights, heights[n-1][i], bottomRight);//call helper on bottom edge
        }

        //loop through all rows
        for(int i = 0; i < n; i++)
        {
            helper(i, 0, heights, heights[i][0], topLeft);//call helper on left edge
            helper(i, m - 1, heights, heights[i][m-1], bottomRight);//call helper on right edge
        }


        vector<vector<int>> res;
        
        for(int i = 0; i < n; i++)
            for(int j = 0; j < m; j++)
                if(topLeft[i][j] and bottomRight[i][j]) res.push_back({i, j});

        return res;
    }
    void helper(int i, int j, vector<vector<int>>& heights, int height, vector<vector<bool>>& visited)
    {
        if(i < 0 or i >= heights.size()
        or j < 0 or j >= heights[0].size() 
        or heights[i][j] < height 
        or visited[i][j]) 
            return;

        visited[i][j] = true;

        helper(i + 1, j, heights, heights[i][j], visited);
        helper(i - 1, j, heights, heights[i][j], visited);
        helper(i, j + 1, heights, heights[i][j], visited);
        helper(i, j - 1, heights, heights[i][j], visited);

        return;
    }
};
```
## Time Complexity: $O(mn)$
Where n is number of rows and m is number of columns. We visit each tile once.

Space complexity is $O(mn)$ as well. We use two visited arrays of size $mn$ each.