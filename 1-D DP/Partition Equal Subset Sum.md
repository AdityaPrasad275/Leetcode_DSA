# [Question](https://leetcode.com/problems/partition-equal-subset-sum/description/)
Difficulty: Medium
# Goal
Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.
# Solution
## Trick
The partition is just confusing, simply said we need to find a subset of the array whose sum is half of the total sum of the array.
And here we can use the soln of a question we have already solved - Subset sum problem.
## Code
```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) 
    {
      int sum = 0;
      for(auto n: nums)
        sum += n;
      if(sum%2 == 1)
        return false;

      vector<vector<int>> dp(nums.size()+1, vector<int>(sum/2 + 1, -1));

      return subsetSum(sum/2,nums.size()-1, nums, dp); 
    }
    bool subsetSum(int sum, int n, auto& nums, auto& dp)
    {
      if(n < 0 or sum < 0)
        return false;

      if(sum == 0)
        return true;

      if(dp[n][sum] != -1)
        return dp[n][sum];

      return dp[n][sum] = subsetSum(sum-nums[n], n-1, nums, dp) 
                        or subsetSum(sum, n-1, nums, dp);
    }
};
```
## Time Complexity: $O(sum*n)$
Where $n$ is the number of elements in the array and $sum$ is the sum of all elements in the array.
