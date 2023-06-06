# [Question](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
Difficulty: Medium
# Goal
Find minimum in rotated sorted array in $O(logn)$. ex. {4, 6, 7, 0, 1, 2}
# Solution
## Trick
Do binary search ofcourse. The way to update pointers is nums[mid] < nums[right] then search to the left of mid (right = mid), otherwise search to the left (left = mid + 1)
## Code
```
int findMin(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    int m = 0;
    // 6, 7, 0, 1, 2, 4, 5
    // 0, 1, 2, 3, 4, 5, 6
    // 5, 6, 7, 0, 1, 2, 4
    while(l<r){
        m = (l+r)/2;
        if(nums[m] < nums[r]) r = m;
        else l = m + 1; 
    }
    //return min(nums[l], nums[r]);
    return nums[r];
}
```
## Time Complexity: $O(logn)$
typical binary search. Can be 'improved' by doing nums[mid] and nums[left] comparison and whenever nums[left] < nums[right], you're done. What to return is a bit more comlicated. 