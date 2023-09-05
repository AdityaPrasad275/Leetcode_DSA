# [Question](https://leetcode.com/problems/min-cost-climbing-stairs/)
Difficulty: Medium
# Goal
Given a bunch of steps, each step has a cost, you can climb 1 or 2 steps each time, find the minimum cost to climb to the top (you can either start from the first step or the second step)
# Solution
## Trick
Instead of going from front and thinking next step should minimum of the two (which is greedy algo, incorrect for this) go from behind/top. Think iteratively -
- If you are at last step, the cost to top is the last step's cost
- If you are at second last step, the cost to top is the minimum of last step's cost and second last step's cost
- If you are at third last step, the cost to top is the cost of that step + minimum of last step's cost and second last step's cost. Now update the third last step's cost to this value

Now for fourth last step, the cost would be cost of that step + minimum of next two steps. Why? Because we have already updated the third last step's cost to the minimum cost to top from that step. So we can use that value to calculate the minimum cost to top from fourth last step.

Now we can use this to build the minimum cost to top from the first step.
## Code
```cpp
int minCostClimbingStairs(vector<int>& cost) 
{
    for(int i = cost.size() -1 -2; i >= 0; i--)
        cost[i] += min(cost[i+1], cost[i+2]);
    
    return min(cost[0], cost[1]);
}
```
## Time Complexity: $O(n)$
Just one pass through the array
## Space Complexity: $O(1)$
Using the same array so no extra space