# [Question](https://neetcode.io/problems/meeting-schedule-ii)
Difficulty: Medium
# Goal
Given a set of intervals, return the minimum number of meeting rooms required.
# Solution
## Trick
Take start to be a +1 in meeting rooms, end to be -1. Create a new array of pairs with {start time, +1} and {end time, -1}. Sort this array with time.   
Note: If (0, 8), (8, 10) was considered a conflict, we'd have to sort to take +1 before -1 to get the maximum number of rooms.  
Now iterate through this array. At every point, if +1, increment the number of rooms. If -1, decrement the number of rooms. Keep track of the maximum number of rooms at any point.
## Code
```cpp
int minMeetingRooms(vector<Interval>& intervals) {
  vector<pair<int, int>> v;
  for (auto& i : intervals)
  {
    v.push_back({ i.start, 1 });
    v.push_back({ i.end, -1 });
  }
  sort(v.begin(), v.end());

  // if (0, 8), (8, 10) was considered a conflict, we'd have to sort to take +1 before -1 to get the maximum number of rooms
  /*
  sort(v.begin(), v.end(), [](pair<int, int> a, pair<int, int> b){
            if(a.first == b.first)
                return a.second > b.second;
            return a.first < a.second;
        })
  */
  int res = 0, run = 0;
  for (auto& p : v)
  {
    run += p.second;
    res = max(res, run);
  }
  return res;
}
```
## Time Complexity: $O(n \cdot logn)$
Just one pass through the array 