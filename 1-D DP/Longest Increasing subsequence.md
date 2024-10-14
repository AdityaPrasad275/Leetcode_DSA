# [Question](https://leetcode.com/problems/longest-increasing-subsequence/description/)
Difficulty: Medium
# Goal
Given an integer array nums, return the length of the longest strictly increasing 
subsequence. 
A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.
# Solution
## Trick
Recursive relation:
LIS(i) = max(LIS(j) + 1) for all j < i and nums[j] < nums[i]

A simple DP solution is to create a vector e of size n, where e[i] stores the length of the longest increasing subsequence ending at index i. 
Then we iterate through the array and update the length of the longest increasing subsequence ending at each index.
Finally, we return the maximum value in the vector e.

## Code
```cpp
int lengthOfLIS(vector<int>& nums) 
{
  vector<int> e(nums.size(), 1);
  // this vector contains the information of "max length of increasing subsequence ending at this i" for each i

  for(int i = 1; i < nums.size(); i++)
  {
    for(int j = 0; j < i; j++)
    {
      if(nums[j] < nums[i])
        e[i] = max(e[i], e[j] + 1);
    }
  }
  
  return *max_element(e.begin(), e.end());
}
```
## Time Complexity: $O(n^2)$
For each element, we go to each element smaller than it and update the length of increasing subsequence ending at that element. So $O(n^2)$
