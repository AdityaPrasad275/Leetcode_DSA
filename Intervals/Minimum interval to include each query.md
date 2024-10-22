# [Question](https://leetcode.com/problems/minimum-interval-to-include-each-query/description/)
Difficulty: Hard
# Goal
Given a set of intervals ([start, end]), and a set of queries (an integer), return the interval with minimum size that includes each query. 
# Solution
## Trick

### priority_queue
I think the hardness and sort of unintuitiveness of this problem comes from the iterative nature of the problem. Instead of trying to find one way to do all queries, lets go one query at a time.  

- First lets sort the intervals and queries. It makes sense to go in "increasing time" and eases our work.  
- For each query, we find all the intervals that contain it. The moment we encounter an interval whose start > q, we know all the intervals that contain q have been found. 
- Now we need a way to get the minimum size interval that contains q. For this min heap is the perfect data structure.
- We push all the intervals that contain q in the min heap. The top of the heap will always be the smallest interval that contains q. But there's a caviet that we insert elements that are of form {size of interval, end of interval}. Why? this will become clear later
- Now we can answer the query. If the heap is empty, we return -1. Else we return the top of the heap.
- Lets go ahead with the next query.
- Again, we add all the intervals that contain the query in the heap.
- But this time, we also need to remove all the intervals that have ended before the query. We can do this by popping all the intervals from the heap whose end < q. This is why added the end times in the heap.

See this works iteratively as it maintains the smallest interval that contains the query at all times. We add and we remove, taking logn time for each query. So a $O(n \cdot logn + q \cdot logq)$ solution. The heap manipulations are at most inserting and deleting n elements so $O(n \cdot logn)$ complexity. 

### The almighty god, Binary search
Solution 2: Iterate through intervals
This is another way to look at this problem. We process intervals from smaller to larger, and binary-search for queries that fit into the current interval.

For that, we store queries in a set; when a query fits into an interval, we record the answer and remote that query from the set. That way, we guarantee that we pick the smallest interval for that query.

## Code
### priority_queue
```cpp
vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries)
{
  sort(intervals.begin(), intervals.end());
  auto queries2 = queries;
  sort(queries.begin(), queries.end());

  unordered_map<int, int> res;
  int i = 0;
  priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;

  for (auto q : queries)
  {
    while (i < intervals.size() and intervals[i][0] <= q)
    {
      pq.push({ intervals[i][1] - intervals[i][0] + 1, intervals[i][1] });
      i++;
    }
    while (not pq.empty() and pq.top()[1] < q)
      pq.pop();

    res[q] = pq.size() ? pq.top()[0] : -1;
  }
  vector<int> res2;
  for (auto& q : queries2)
    res2.push_back(res[q]);

  return res2;
}
```
### Binary search
```cpp
vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
  vector<int> res(queries.size(), -1);

  sort(intervals.begin(), intervals.end(), [](const auto &a, const auto &b) { 
    return a[1] - a[0] < b[1] - b[0]; });

  set<pair<int, int>> s;

  for (int i = 0; i < queries.size(); ++i)
    s.insert({queries[i], i});

  for (auto &i : intervals) 
  {
    auto it = s.lower_bound({i[0], 0}); //this is the binary step
    while (it != end(s) && it->first <= i[1]) 
    {
      res[it->second] = i[1] - i[0] + 1;
      s.erase(it++);
    }
  }
  return res;
}
```
## Time Complexity: $O(n \cdot logn + q \cdot logq)$ for first soln
- n is the number of intervals
- q is the number of queries
- Sorting the intervals takes $O(n \cdot logn)$
- Sorting the queries takes $O(q \cdot logq)$
- For each query, we insert and delete from the heap. This takes $O(logn)$ time. But at most we'd do n elements so $O(n \cdot logn)$

