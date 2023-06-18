# [Question](https://leetcode.com/problems/contains-duplicate/)
Difficulty : easy
# Goal
Check for duplicates that's all. 
# Solution
## trick
1. sort and look for any i == i+1 occurence. $O(n\cdot log n)$ solution
2. Maintain a count of each number in a map, if any count > 1, return true. $O(n)$ solution
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
```cpp
bool containsDuplicate(vector<int>& nums) {
  unordered_map<int, int> numCount;

  for(auto n: nums) numCount[n]++;

  for(auto [num, count]: numCount)
    if(count >1) return true;
  
  return false;
}
```
## Time complexity: $O(n)$
sort takes $O(n\cdot log n)$ while map takes $O(n)$
  
