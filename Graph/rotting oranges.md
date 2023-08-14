# [Question](https://leetcode.com/problems/rotting-oranges/)
Difficulty: Medium
# Goal
Given - a grid of oranges (rotten and fresh)

Every minute, any fresh orange that is adjacent (4-directionally) to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange.  If this is impossible, return -1 instead.
# Solution
## Trick
Do BFS! First start with existing rotten oranges. Then, for each rotten orange, push all adjacent fresh oranges to the queue. These new oranges will be rotten in the next minute. Repeat this process until there is no more fresh oranges. The number of times we do BFS is the answer. 

Note: 
1. We can't just pop rotten orange from the queue front and add it's adjacent fresh oranges to back on the go, we won't we able to track time that way. We need to pop all rotten oranges in the queue at the same time. Otherwise, we will get wrong answer. So, instead of doing `while(q is not empty)`, we do something less ... tidy.
2. The output is a bit messy, in that we need to check if there was any fresh orange at all at the start. If there was no fresh orange, we return 0. If there was fresh orange and not all became rotten, we return -1. Otherwise, we return time - 1.
## Code
```cpp
class Solution 
{
public:
    int orangesRotting(vector<vector<int>>& grid)
    {
        deque<pair<int, int>> q;
        int n = grid.size(), m = grid[0].size();

        for(int i = 0; i < n; i++)
        {
            for(int j = 0; j < m; j++)
                if(grid[i][j] == 2) q.push_back({j, i});
        }
        
        int time = 0;

        while(not q.empty())
        {
            int nq = q.size();

            while(nq--)
                pushToDQ(q, grid);

            time++;
        }

        bool wasThereOrange = false;
        for(int i = 0; i < n; i++)
        {
            for(int j = 0; j < m; j++)
            {
                if(grid[i][j] == 1) return -1;
                if(grid[i][j] == 2) wasThereOrange = true;
            }
        }
        if(not wasThereOrange) return 0;
        return time - 1;
    }
    
    void pushToDQ(auto& q,auto& g)
    {
        auto ro = q.front();

        int x = ro.first, y = ro.second;

        if (x > 0 and g[y][x - 1] == 1)
        {
			q.push_back({x-1, y});
            g[y][x - 1] = 2;
        }
        if (y > 0 and g[y - 1][x] == 1)
        {
			q.push_back({x, y-1});
			g[y - 1][x] = 2;
		}
        if (x < g[0].size() - 1 and g[y][x + 1] == 1)
        {
			q.push_back({x + 1, y});
            g[y][x + 1] = 2;
        }
        if (y < g.size() - 1 and g[y + 1][x] == 1)
        {
			q.push_back({x, y + 1});
			g[y + 1][x] = 2;
		}

		q.pop_front();
		return;
    }
};
```
Note: In the function argument, I used `auto` instead of `vector<vector<int>>` because I was too lazy to type it out. I don't recommend doing this in an interview.
## Time Complexity: $O(n)$