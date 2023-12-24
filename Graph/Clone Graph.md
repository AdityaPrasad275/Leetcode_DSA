# [Question](https://leetcode.com/problems/clone-graph/)
Difficulty: Medium (Slightly hard to think of the solution)
# Goal
Given a undirected graph, clone it. Each node in the graph contains a label(or value) and a list of its neighbors.
# Solution
## Trick
The trick is to maintain a old Node new Node hashmap and the recursion function we use returns a node ptr which we can append to neighbors of the node we are processing.   
The recursion has two base cases. If the current node is null, return null. If the current node is in the hashmap, return the new node.
Then comes the recursion part. We create a new node with the same label as the current node. Then we map the current node to the new node in our hashmap.   
Then we loop through the neighbors of the current node and to the newly created node's neighbors, we recursively call the function on the neighbor, each call adding neighbors to the new node.     
Then we return the new node.  
## Code
```cpp
class Solution 
{
    unordered_map<Node*, Node*> oldNew;
public:
    Node* cloneGraph(Node* node) 
    {
        if(not node) return nullptr;

        return helper(node);
    }
    Node* helper(Node* node)
    {
        if(oldNew.find(node) != oldNew.end()) return oldNew[node];

        Node* temp = new Node(node->val);

        oldNew[node] = temp;

        for(auto n: node->neighbors)
            temp->neighbors.push_back(helper(n));

        return temp;
    }
};
```
## Time Complexity: $O(n)$
Where n is number of nodes in the graph. We visit each node twice. Once when we create the new node and once when we add this as a neighbor to it's neighbors.