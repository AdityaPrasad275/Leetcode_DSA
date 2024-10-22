# [Question](https://leetcode.com/problems/non-overlapping-intervals/description/)
Difficulty: Medium
# Goal
Given a set of intervals, remove the minimum number of intervals to make the rest of the intervals non-overlapping.
# Solution
## Trick
Its greedy and here's the proof (its hard to arrive at this by itself, it makes sense after you see the proof). Credit - @WangQiuc  
The heuristic is: always pick the interval with the earliest end time. Then you can get the maximal number of non-overlapping intervals. (or minimal number to remove).
This is because, the interval with the earliest end time produces the maximal capacity to hold rest intervals.  
E.g. Suppose current earliest end time of the rest intervals is x. Then available time slot left for other intervals is [x:]. If we choose another interval with end time y, then available time slot would be [y:]. Since x ≤ y, there is no way [y:] can hold more intervals then [x:]. Thus, the heuristic holds.
## Code
```cpp
int eraseOverlapIntervals(vector<vector<int>>& intervals) 
{
  sort(intervals.begin(),  intervals.end(), [](vector<int> a, vector<int> b){
    return a[1] < b[1];
  });
  int end = -INT_MAX, count = 0;
  for(auto& i: intervals)
  {
    if(i[0] >= end)
       end = i[1];
    else
      count++;
  }
  return count;
}
```
## Time Complexity: $O(n \cdot log n)$
Where $n$ is the number of intervals in the array. Sorting produces the $log n$ factor. while greedy is $O(n)$.