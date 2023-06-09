# [Question](https://leetcode.com/problems/search-in-rotated-sorted-array/)
Difficulty: Medium
# Goal
Given a rotated sort array, find the index of the target element in $O(logn)$ time.
# Solution
## Trick
Bunch of nested if's and else's for binary search. Here's the basic flow (ofcourse we start with left, right, mid pointers)=>  
1. Check if target < nums[right]. This means that the target is in the right half of the array. 
2. Check if nums[mid] < nums[right]. This means that the mid is in the right half of the array. 
3. Now that both mid and target are in right half of array, we can update right and left pointers on basis of nums[mid] and target comparison.

Else's are just for redirecting the pointers(or our search width) to the correct half of the array. If the target is in left half, while mid lands in right half, we need to update right pointer to mid-1. If the target is in right half, while mid lands in left half, we need to update left pointer to mid+1.
## Code
```
int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1, mid = (left+right)/2;
    if(right == 0) return (nums[0]==target)?0:-1;
    while(left<right){
        mid = (left + right)/2;
        if(nums[mid]==target) return mid;
        if(nums[right]==target) return right;
        if(nums[left]==target) return left;

        if(target < nums[right]){
            if(nums[mid]<nums[right]){
                if(nums[mid] < target) left = mid +1;
                else right = mid - 1;
            }else left = mid + 1;
        }else{
            if(nums[mid] > nums[left]){
                if(nums[mid] < target) left = mid +1;
                else right = mid - 1;
            }else right = mid - 1;
        }
    }
    return -1;
}
```
comment - the whole num[mid] == target and num[right] == target and nums[left] == target can be incorporated into if else below it (so we'll have just one complicated if else block) but eh.
## Time Complexity: $O(logn)$
Binary search but with more if's