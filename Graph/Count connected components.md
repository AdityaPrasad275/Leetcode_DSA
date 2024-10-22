# [Question](https://neetcode.io/problems/count-connected-components)
Difficulty: Medium, Done in DSA course
# Goal
Given a graph, find the number of connected components in it.
# Solution
## Trick
Simple dfs or bfs with a visited array traversal to get all the nodes.
## Code
```cpp
class Solution {
public:
  int countComponents(int n, vector<vector<int>>& edges)
  {
    vector<bool> visited(n, false);
    int count = 0;

    map<int, vector<int>> adj;
    for (auto& e : edges)
    {
      adj[e[0]].push_back(e[1]);
      adj[e[1]].push_back(e[0]);
    }//asumgin edges doesnt coantin duplicates

    for (int i = 0; i < n; i++)
    {
      if (visited[i] == false)
      {
        dfs(i, adj, visited);
        count++;
      }
    }
    return count;
  }
  void dfs(int node, auto& adj, auto& visited)
  {
    if (visited[node])
      return;

    visited[node] = true;
    for (auto nei : adj[node])
      dfs(nei, adj, visited);

    return;
  }
};

```
## Time Complexity: $O(n)$
We're visiting each node once.