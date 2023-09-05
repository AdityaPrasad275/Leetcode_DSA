# [Question](https://leetcode.com/problems/house-robber/)
Difficulty: Medium (easy dp)
# Goal
Like the climbing stairs problem but we can take any number of steps > 1.

Wording : You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint is you can't rob adjacent houses. Determine the maximum amount of money you can rob

# Solution
## Trick
As i said, it's like climbing stairs problem. Think from the back of array

1. Consider only the last house, max money = nums[n-1]
2. Consider last 2 houses, max money = max(nums[n-1], nums[n-2])
3. Now when you come to the third last, think if you rob it, you can't rob the second last so would have to rob the last. Otherwise you can just rob the second last. So max money = max(nums[n-1] + nums[n-3], nums[n-2]). Now store 

Consider an ans array of size (n+2) with values 0. The $i$ th value is the max we can get at this stage.  
```
ans[i] = max(nums[i] + ans[i+2], ans[i+1])
```
This way we go from the back of the array and store the max we can get at each stage.  
Finally, return ans[0] which is the max we can get from the first house.

- The reason we are taking n+2 size is it accomodate the base cases of n==1 and n==2. ans[n-1] becomes nums[n-1] and ans[n-2] becomes max(nums[n-1], nums[n-2]).
- We can also do this in O(1) space by just storing the last 2 values of ans array. This is because we only need ans[i+1] and ans[i+2] to calculate ans[i]. So we can just store the last 2 values and keep updating them. This is the smarty pants solution.
## Code
1. Simple DP $O(n)$ space solution
```cpp
int rob(vector<int>& nums) {
    int n = nums.size();
    vector<int> ans(n + 2, 0); //taken n+2 to avoid explicitly doing if n==1 or n==2 base cases
    
    for(int i = n - 1; i >= 0; i--)
        ans[i] = max(nums[i] + ans[i+2], ans[i+1]);
    
    return ans[0];
}
```
2. Smarty pants $O(1)$ space solution
```cpp
int rob(std::vector<int>& nums) 
{
    if(nums.size() == 1) return nums[0];
    else if(nums.size()==2) return std::max(nums[0], nums[1]);
    
    int a = nums[0];
    int b = std::max(nums[0], nums[1]);
    int maxRob = max(a, b);
    
    for (int i = 2; i < nums.size(); i++)
    {
        maxRob = max(a + nums[i], b);
        a = b;
        b = maxRob;
    }
    return max(a, b);
}
```
## Time Complexity: $O(n)$
Simple array traversal
## Space Complexity: 
### $O(n)$ for the first solution and $O(1)$ for the second solution