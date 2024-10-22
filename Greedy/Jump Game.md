# [Question](https://leetcode.com/problems/jump-game/description/)
Difficulty: Medium
# Goal
Given an array of non-negative integers, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Determine if you are able to reach the last index.
# Solution
## Trick
Idk why dp doesnt work here, i must be making some mistake. the simple choice diagram is that from index i i can go to (i+1, i+2 .... i+A[i]). So recursion would be
`f(i) = f(i+1) || f(i+2) || ... || f(i+A[i])`
But idk my implementation gives TLE at the weirdest input.

So let's understand greedy. I cant think why this is greedy as it is more logical really.
There are two ways to look at this, from end of array and from start of array.  
### Let's look at it from start of array. 
At every step i, the max index we can get to is `i + A[i]`. So if we can get to index i, we can get to all indexes from i to i + A[i]. So we can keep track of the last index we can get to. If at any point, the last index is greater than or equal to the current index, we can reach the end. something like max(reach, i + A[i])  till it becomes greater than or equal to n-1.

### Let's look at it from end of array.
To reach the end of array, first i need to check, can i reach it from second last element. Let's say we can. Now the "minimum" goal to reach becomes second last element. 
Now can we reach second last element from third last element? If we can, then the minimum goal to reach becomes third last element. And so on.
You can also imagine it as an array of bools. If we can reach the end from second last element, then the second last element is true. If we can reach the end from third last element, then the third last element is true. And so on.
But to compress this to $O(1)$ space, we can just keep track of the minimum goal to reach. If at any point, the minimum goal to reach becomes 0, then we can reach the end.

## Code
### going from start
```cpp
bool canJump(vector<int>& nums) 
{
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  int reach = nums[0];

  for(int i = 0; i < nums.size(); i++)
  {
    reach = max(reach, i+nums[i]);
    
    if(reach >= nums.size() - 1)
      return true;
    if(reach == i) // this positioning (after the prev if) turns out to be crucial for edgecase [0]
      return false;
  }  
  return false;
}
```

### going from end
```cpp
bool canJump(vector<int>& nums) 
{
  ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    
  int idx = nums.size() - 1;

  for(int i = nums.size() - 1; i >= 0; i--)
  {
    if(nums[i] + i >= idx)
      idx = i;
  }
  return idx == 0;  
}
```

### my dp soln that idk why doesnt work
```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
      // 2 3 1 2 0 4
      // from i + 1 to i + A[i] , check max, jump to that then repeat
      // but this is n^2

      // take A[i] jump everytime? 
      // 2 3 0 
      // doesnt work

      // whats dp?
      // f(i) = f(i+1) or f(i+2) or ... f(i+A[i]) 
      // if i == n return true;

      vector<int> dp(nums.size(), -1);
      return helper(0, nums, dp);
    }
    int helper(int i, auto& A, auto& dp)
    {
      if(i == A.size() - 1)
        return dp[i] = true;
      if(A[i] == 0)
        return dp[i] = false;
      if(dp[i] != -1)
        return dp[i];

      bool res = false;
      //cout << i << " " << A[i] << '\n';
      for(int k = i + 1; k <= i + A[i]; k++)
        res = res or helper(k, A, dp);

      return dp[i] = res;
    }
};
```
## Time Complexity: $O(n)$