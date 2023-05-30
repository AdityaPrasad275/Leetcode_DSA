# [Question](https://leetcode.com/problems/binary-search/)
Difficulty: Easy
# Goal
Standard binary search in a sorted array.
# Solution
## Trick
Have a left, middle, right pointer. Middle = (left+right)/2. while(length > 0) and in each iteration length =/ 2.
## Code
```
int search(vector<int>& nums, int target) {
    int length = nums.size(), left = 0, right = nums.size() - 1, mid = 0;

    while(length > 0){
        mid = (right + left)/2;

        if(nums[mid] > target) right = mid - 1;
        else if(nums[mid] == target) return mid;
        else left = mid + 1;
        
        length /= 2;
    }
    return -1;
}
```
## Time Complexity: $O(log n)$
Each time we shift pointers, we halve the array to be searched. 