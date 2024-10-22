# [Question](https://neetcode.io/problems/meeting-schedule)
Difficulty: Easy
# Goal
Given a set of intervals, return if true if there exists no overlapping intervals.
# Solution
## Trick
Use soln of Non overlapping intervals. If the number of intervals to remove is 0, then return true. this soln is $O(n \cdot log n)$
The brute-force is to check if any two intervals overlap. This is $O(n^2)$. Given the constraints, this is also applicable and that's why this is an easy question.
## Code
```cpp
bool canAttendMeetings(vector<Interval>& intervals) 
{
  sort(intervals.begin(), intervals.end(), [](Interval& a, Interval& b) {
    return a.end < b.end;
    });
  int end = -INT_MAX, count = 0;
  for (auto& i : intervals)
  {
    if (i.start >= end)
      end = i.end;
    else
      count++;
  }
  return count == 0;
}
```
## Time Complexity: $O(n \cdot logn)$
Sorting produces the $log n$ factor. while greedy is $O(n)$.
