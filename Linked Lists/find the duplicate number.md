# [Question](https://leetcode.com/problems/find-the-duplicate-number/)
Difficulty: Medium, truly a high iq problem. Or more like there's a specific trick to it.Not exactly intiutive.
# Goal
Given an array of size [n+1] and only one number being duplicated, find the duplicate number. Do it in $O(1)$ space and $O(n)$ time.
# Solution
## Trick
Look at constraints first ->
1. Every value in the array is in the range [1, n]
2. The array has a length of n+1

See it this way. Each num[i] can be used as an index to other array cell. Now because each nums[i] is in range [1, n], nums[i] for i > 0 will never point back to nums[0]. So we can use nums[0] as a starting point and traverse the array. We will eventually reach a cycle. Now we can use the cycle detection algorithm to find the start of the cycle. 
  
The start of the cycle is the duplicate number.The cycle detection algo is floyd's turtle and heir algo. This detects the cycle. To find the starting point, we need an additional slow pointer running from start (nums[0]) and a slow pointer running from the point slow and fast met (in detection phase). The point where they meet is the starting point of the cycle. This is the duplicate number. why? because this is a node which two nodes are pointing to. This means there are two nums[i] pointing to same cell, which ofcourse means, there are two nums[i] with same value. This is the duplicate number. 
## Code
```
int findDuplicate(vector<int>& nums) {
    int slow = nums[nums[0]];
    int fast = nums[nums[nums[0]]];

    while (slow != fast) {
      slow = nums[slow];
      fast = nums[nums[fast]];
    }

    slow = nums[0];

    while (slow != fast) {
      slow = nums[slow];
      fast = nums[fast];
    }

    return slow;
}
```
## Time Complexity: $O(n)$
## Space Complexity: $O(1)$
The logic is pretty hard, non intuitive. brute force is easy but it's $O(n^2)$ time and $O(1)$ space.