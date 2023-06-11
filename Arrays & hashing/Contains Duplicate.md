# [Question](https://leetcode.com/problems/contains-duplicate/)
Difficulty : easy
# Goal
Check for duplicates that's all. 
# Solution
## trick
sort and look for any i == i+1 occurence
  
## code
```cpp
bool containsDuplicate(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    for(int i = 0; i<nums.size() - 1;i++){
        if(nums[i]==nums[i+1]) return true;
    }
    return false;
}
  ```
  
## Time complexity: O(n log n)
sort takes O(n log n) while looping takes O(n)
  
