# [Question](https://leetcode.com/problems/jump-game-ii/description/)
Difficulty: Medium
# Goal
Same as Jump game, but this time find minimum number of jumps to reach the end of the array.

Original question: Given an array of non-negative integers, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Determine the minimum number of jumps to reach end.
# Solution
## Trick
This is an optimization question, so one would think of doing DP.
The recursive relation would be `f(i) = min(f(i+1), f(i+2), ... f(i+A[i])) + 1`. But this is $O(n^2)$ and will give TLE.

So let's think of a greedy approach.
The best way to desribe it is basically capture ranges. At first step we can go from 0 to 0 + A[0]. Now take every elemetn from i = 1 to i = A[0] and see how far we can go. The farthest we can go is the next range. The number of such ranges is the answer. Sort of like BFS.

## Code
```python
def jump(self, nums: List[int]) -> int:
  res = 0
  l = r = 0

  while r < len(nums) - 1:
    farthest = 0
    for i in range(l, r+1):
      farthest = max(farthest, i + nums[i])

    l = r+1
    r = farthest
    res += 1
  
  return res
```
## Time Complexity: $O(n)$
Greedy choice makes DP $O(n^2)$ solution to $O(n)$. Smart as hell.