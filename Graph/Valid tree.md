# [Question](https://neetcode.io/problems/valid-tree)
Difficulty: medium
Leetcode has this question locked behind premium, so i have included link to neetcode's question
# Goal
Given a graph, determine if it is a valid tree.
A valid tree is a graph with no cycles and all nodes are connected.
# Solution
## Trick
If you wanted to check connectedness you'd check if a node has been visited twice. but in bfs or dfs, it is possible that we visit a node twice when we retrace our step back, essentailly visiting the parent node. This "visiting twice" is not a cycle, so we need to check if the node has been visited before, but not by its children/nodes adjacent to it. We check this by adding a barrier to backtracking, so that we dont visit the parent node again.

in the queue for bfs, we store {node, parent} pair, so that we can check if the node has been visited before by its parent or not.

## Code
```cpp
bool validTree(int n, vector<vector<int>>& edges) 
{
    vector<bool> vis(n, false);
    map<int, vector<int>> adj;

    for(auto& e: edges)
    {
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
        if(e[0] == e[1])
            return false;
    }

    deque<vector<int>> q;
    q.push_back({0, 0});
    vis[0] = true;
    //does there exist a cycle
    while(not q.empty())
    {
        auto node = q.front();
        q.pop_front();
        for(auto nei: adj[node[0]])
        {
            cout << node[0] << " " << nei << '\n';
            if(vis[nei] and node[1] != nei)
                return false; // detected a cycle
            if(not vis[nei])
            {
                q.push_back({nei, node[0]});
                vis[nei] = true;
            }
        }
        
    }
    //did we visit all nodes?
    for(auto b: vis)
        if(not b)
            return false;

    return true;
}
```
## Time Complexity: $O(n)$
Where $n$ is the number of nodes in the graph.