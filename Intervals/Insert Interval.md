# [Question](https://leetcode.com/problems/insert-interval/description/)
Difficulty: Medium
# Goal
Given an array of intervals, and a new interval, insert the new interval into the array of intervals (merge if necessary).
# Solution
## Trick
basically, if the new interval doesnt intersect with any existing intervals, we can simply insert it at the correct position.

If it does intersect, we can merge the new interval with the intersecting intervals and insert the merged interval at the correct position.

This is handled smartly in code below, where we iterate through the intervals and update new interval when we detect an intersection. the addition of new interval is handed independently at the correct position.
## Code
```cpp
vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) 
{
  vector<vector<int>> res;

  for(int i = 0; i < intervals.size(); i++)
  {
    if(newInterval[1] < intervals[i][0])
    {
      res.push_back(newInterval);

      res.insert(res.end(), intervals.begin() + i, intervals.begin() + intervals.size());

      return res;
    }
    else if(newInterval[0] > intervals[i][1])
    {
      res.push_back(intervals[i]);
    }
    else
    {
      newInterval = {
        min(newInterval[0], intervals[i][0]),
        max(newInterval[1], intervals[i][1])
      };
    }
  }  
  res.push_back(newInterval);
  return res;
}
```
## Time Complexity: $O(n)$
Where $n$ is the number of intervals in the array.