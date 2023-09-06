# [Question](https://leetcode.com/problems/house-robber-ii/)
Difficulty: Medium (very interesting extension of house robber 1)
# Goal
House robber 1 but now the houses are in a circle. So the first and last house are adjacent.

Wording: You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint is you can't rob adjacent houses. Determine the maximum amount of money you can rob. The houses are in a circle.

# Solution
## Trick
The trick is to figure out how to use robber 1 solution (a row of houses) in this (a circle of houses). 

The idea is to consider 2 cases:
### 1. Rob the first house  
Now the houses we can't rob are second and last. All the other houses (houses[2] to houses[n-2]) are the same as the row of houses problem. So we can use the solution of that problem for this. Here the max money we can get is houseMoney[1] + maxMoney(houses[2] to houses[n-2]).
### 2. Don't rob the first house  
Now the houses we can rob are second to last (houses[1] to houses[n-1]). This again becomes the row of houses problem. So we can use the solution of that problem for this. Here the max money we can get is maxMoney(houses[1] to houses[n-1]).

So the max money we can get is max of both the answers.

- don't get confused by thinking there's no starting point anymore. There isn't any considering it a circle so starting at 0 is just as fair as any other house (and in face way easier to code).
- Changing from $O(n)$ space to $O(1)$ is really just a consideration of which numbers are important to be kept in memory.

## Code
1. Simple DP $O(n)$ space solution
```cpp
int rob(vector<int>& nums) 
{
    int n = nums.size();
    if(n == 1) return nums[0];
    if(n == 2) return max(nums[0], nums[1]);

    vector<int> ans(n + 2, 0);

    for(int i = n - 1; i >= 0; i--)
        ans[i] = max(ans[i + 2] + nums[i], ans[i+1]);
    
    int notIncludingFirst = ans[1];

    vector<int> ans2(n-1, 0);

    for(int i = n - 2; i >= 2; i--)
        ans2[i-2] = max(nums[i] + ans2[i], ans2[i-1]);// be extra careful here with the indices, ith index in nums is (i-2)th index in ans2. nums is n-3 size and ans2 is n-1 size.
    int includingFirst = nums[0] + ans2[0];

    return max(notIncludingFirst, includingFirst);
}
```
2. Smarty pants $O(1)$ space solution
```cpp
class Solution {
public:
    int rob(vector<int>& nums) 
    {
        // the ifs are annoying but it's necessary as the 1st choice (rob first house) is not valid when we have less than 4 houses
        if(nums.size() == 1) return nums[0];
        if(nums.size() == 2) return max(nums[0], nums[1]);;
        if(nums.size() == 3) return max(max(nums[0], nums[1]), nums[2]);

        int robFirst = nums[0] + helper(2, nums.size() - 2, nums);
        int dontRobFirst = helper(1, nums.size() - 1, nums);

        return max(robFirst, dontRobFirst);
    }

    int helper(int s, int e, auto& nums)
    {
        int a = 0, b = 0, c;
        for(int i = s; i < e; i++)
        {
            c = max(nums[i] + a, b);
            a = b;
            b = c;
        }
        return c;
    }
};
```
## Time Complexity: $O(n)$
We are doing two traversals of the array. One for the first case and one for the second case. Both are $O(n)$.
## Space Complexity: 
### $O(n)$ for the first solution and $O(1)$ for the second solution