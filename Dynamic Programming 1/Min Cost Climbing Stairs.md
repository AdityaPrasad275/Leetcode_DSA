# [Question](https://leetcode.com/problems/min-cost-climbing-stairs/)
Difficulty: Medium
# Goal
Given a bunch of steps, each step has a cost, you can climb 1 or 2 steps each time, find the minimum cost to climb to the top (you can either start from the first step or the second step)
# Solution
## Trick

<details>
<summary> Bottom up approach, very smort, not "derivable"</summary>

Instead of going from front and thinking next step should minimum of the two (which is greedy algo, incorrect for this) go from behind/top. Think iteratively -
- If you are at last step, the cost to top is the last step's cost
- If you are at second last step, the cost to top is the minimum of last step's cost and second last step's cost
- If you are at third last step, the cost to top is the cost of that step + minimum of last step's cost and second last step's cost. Now update the third last step's cost to this value

Now for fourth last step, the cost would be cost of that step + minimum of next two steps. Why? Because we have already updated the third last step's cost to the minimum cost to top from that step. So we can use that value to calculate the minimum cost to top from fourth last step.

Now we can use this to build the minimum cost to top from the first step.

</details>

<details>
<summary> Recurse + memoise approach, methodological and easy</summary>

A simple recursive relation not too hard to arrive at is this ->

cost to top from ith step = cost of ith step + minimum of (cost to top from i+1th step) and (cost to top from i+2th step)

Memoise this recusive relation and you have the DP solution. 

(The base case is for i >= n, cost = 0)

</details>


## Code
### Bottom up approach

```cpp
int minCostClimbingStairs(vector<int>& cost) 
{
    for(int i = cost.size() -1 -2; i >= 0; i--)
        cost[i] += min(cost[i+1], cost[i+2]);
    
    return min(cost[0], cost[1]);
}
```

### Recurse + memoise approach

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) 
    {
        vector<int> dp(cost.size(), -1);

        return min(helper(cost, 0, dp), helper(cost, 1, dp));
    }

    int helper(vector<int>& cost, int i, vector<int>& dp)
    {
        if(i >= cost.size()) return 0;
        if(dp[i] != -1) return dp[i];

        return dp[i] = cost[i] + min(helper(cost, i+1, dp), helper(cost, i+2, dp));
    }
};
```
## Time Complexity: $O(n)$
Just one pass through the array for the bottom up approach and for the Recurse + memoise approach, we memoise the results so we don't have to recalculate them again and again. So the time complexity is $O(n)$

The original recursive solution would have been $O(2^n)$ (which of course would have TLE'd)

## Space Complexity:
Bottom-up approach: Using the same array so no extra space

Recurse + memoise approach: $O(n)$ for the dp array