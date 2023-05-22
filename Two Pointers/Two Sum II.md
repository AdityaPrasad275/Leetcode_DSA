# [Question](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
Difficulty: Medium
# Goal
Given a target, find two numbers in array that add up to target. Tho this time, use constant space.
# Solution
## Trick
Use left and right pointers on array. Two sum I used maps. But this time extra space needs to be constant so use pointers.
## Code
```
vector<int> twoSum(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while(l < r){
        if(nums[l] + nums[r] == target){
            return {l + 1, r + 1};
        }
        else if(nums[l] + nums[r] < target){
            l++;
        }
        else{
            r--;
        }
    }
    return {-1, -1};
}
```
## Time Complexity: $O(n)$