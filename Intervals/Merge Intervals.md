# [Question](https://leetcode.com/problems/merge-intervals/)
Difficulty: medium
# Goal
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
# Solution
## Trick
We insert intervals one by one. at each step, we check if the current interval overlaps with the last interval in the result array. If it does, we merge the two intervals and update the last interval in the result array. If it doesn't, we simply insert the current interval in the result array.

Smart af ngl
## Code
```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals) 
{
  sort(intervals.begin(), intervals.end());

  vector<vector<int>> res = {intervals[0]};

  for(int i = 1; i < intervals.size(); i++)
  {
    if(intervals[i][0] <= res.back()[1])
      res.back()[1] = max(res.back()[1], intervals[i][1]);
    else
      res.push_back(intervals[i]);
  }
  return res;  
}
```
## Time Complexity: $O(n)$
Where $n$ is the number of intervals in the array.