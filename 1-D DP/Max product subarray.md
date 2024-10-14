# [Question](https://leetcode.com/problems/maximum-product-subarray/description/)
Difficulty: medium
# Goal
Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
# Solution
## Trick
Its similar to Longest increasing subsequence where we did something like maximum subarray ending here = 1 + max ending at previous index.  
But we need to keep track of minimum product ending at each index too. This is because if we encounter a negative number, it can make the minimum product ending at that index the maximum product.   
And also take care of 0, because if we encounter 0, we reset the product to 1.
## Code
```cpp
int maxProduct(vector<int>& nums) 
  {
    //we cant initliaze res to 0 because of singleton array edgecase 
    int res = *max_element(nums.begin(), nums.end());
    int max_ending_here = 1, min_ending_here = 1; 

    for(auto& n: nums)
    {
      if(n==0) //if we encounter 0, we reset 
      {
        min_ending_here = 1;
        max_ending_here = 1;
        continue;
      }
      int t = max_ending_here; //temp varaible because  min_ending_here updation also requires this value
      max_ending_here = max(max(n*max_ending_here, n*min_ending_here), n);
      min_ending_here = min(min(n*t, n*min_ending_here), n);
      res = max(res, max_ending_here);
    }
    return res;
  }
```
## Time Complexity: $O(n)$
We iterate through the array once.