# [Question](https://leetcode.com/problems/missing-number/)
Difficulty: Easy (very clever use of 'single number')
# Goal
Given an array of size n containting distinct numbers from 0 to n (inclusive), find the missing number.
# Solution
## Trick
A very clever solution is to use the 'single number' trick. In single number, we had an array with duplicates and we had to find the one number that was not duplicated. We did this by XORing all the numbers and the result was the single number. Here what we do is have our original array and then add/append to it [0, 1, 2......n-1, n]. If we now XOR all the numbers, the result will be the missing number. Why? Because now the array forms the exact array given in simple number.  
## Code
```cpp
int missingNumber(vector<int>& nums) 
{
    int res = 0;

    for(int i = 0; i < nums.size(); i++)
        res = (res ^ i) ^ nums[i];

    return res ^ nums.size();
}
```
## Time Complexity: $O(n)$
## Space Complexity: $O(1)$