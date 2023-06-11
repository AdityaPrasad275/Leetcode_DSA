# [Question](https://leetcode.com/problems/find-the-duplicate-number/)
Difficulty: Medium, truly a high iq problem. Or more like there's a specific trick to it.Not exactly intiutive.
# Goal
Given an array of size [n+1] and only one number being duplicated, find the duplicate number. Do it in $O(1)$ space and $O(n)$ time.
# Solution
## Trick
The tric is to ->
1. Realise that the question is of llist.
2. Realise that the question is of cycle detection, or better, the start of cycle detection.

<details>
  <summary> Long explanation of these two points </summary>
  
  Look at constraints first ->
  1. Every value in the array is in the range [1, n]
  2. The array has a length of n+1

  See it this way. Each num[i] can be used as an index to other array cell. Now because each nums[i] is in range [1, n], nums[i] for i > 0 will never point back to nums[0]. So we can use nums[0] as a starting point and traverse the array. We will eventually reach a cycle. Now we can use the cycle detection algorithm to find the start of the cycle. 
  
The start of the cycle is the duplicate number.The cycle detection algo is floyd's turtle and heir algo. This detects the cycle. To find the starting point, we need an additional slow pointer running from start (nums[0]) and a slow pointer running from the point slow and fast met (in detection phase). The point where they meet is the starting point of the cycle. This is the duplicate number. why? because this is a node which two nodes are pointing to. This means there are two nums[i] pointing to same cell, which ofcourse means, there are two nums[i] with same value. This is the duplicate number. 
</details>
<details>
  <summary> Why is this problem difficult </summary>
  Comment: This complexity in logic arises only due to space constraint. A simple way is to maintain a hashmap and keep track of the number of times each number appears. The number which appears twice is the duplicate number. This is $O(n)$ time and $O(n)$ space. Another way is to maintain a visited array. This is $O(n)$ time and $O(n)$ space. The trick is to do it in $O(1)$ space. This is the difficult part.
</details>

## Code
```cpp
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
<details>
  <summary> O(n) space solutions </summary>

  visited array one -
  ```cpp
  int findDuplicate(std::vector<int>& nums) {
    vector<bool> visited(nums.size(), false);

    int slow = 0;
    visited[slow] = true;

    while(visited[slow]){
        slow = nums[slow];
        if(visited[slow]) return slow;
        visited[slow] = true;
    }
    return 0;
  }
  ```
  hashmap one -
  ```cpp
  int findDuplicate(std::vector<int>& nums) {
    unordered_map<int, int> m;

    for(int i = 0; i < nums.size(); i++){
        if(m.find(nums[i]) != m.end()) return nums[i];
        m[nums[i]] = 1;
    }
    return 0;
  }
  ```
  comment - hashmap one is waaaaaay slower jesus. Gives a beats 14% in runtime. Visited one(beats 81%) is as fast as the tortoise and hare algo one (beats 88%)
</details>

## Time Complexity: $O(n)$
## Space Complexity: $O(1)$
The logic is pretty hard, non intuitive. brute force is easy but it's $O(n^2)$ time and $O(1)$ space.