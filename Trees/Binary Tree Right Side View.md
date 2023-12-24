# [Question](https://leetcode.com/problems/binary-tree-right-side-view/)
Difficulty: Medium (super easy due to BFS)
# Goal
Look at a tree from right, and return the values of the nodes that are visible from the right side. (not a simple node->right->right.... bit more nuanced).
# Solution
## Trick
Use BFS (level ordere traversal), It will give the view of the whole level and you'll know which is rightmost. 

To easily "extract" out the rightmost, add first the node->right to the queue then node->left. Thus q[0] would be the rightmost always.

## Code
```cpp
vector<int> rightSideView(TreeNode* root) 
{
    if(root==nullptr) return {};

    deque<TreeNode*> q;
    vector<int> res;

    q.push_back(root);
    
    while(!q.empty())
    {
        int n = q.size();
        res.push_back(q[0]->val);

        while(n--)
        {
            TreeNode* node = q.front();
            q.pop_front();

            if(node->right) q.push_back(node->right);
            if(node->left) q.push_back(node->left);
        }
    }
    return res;
}
```
comment - this can be easily modified to get left side veiw as well, just change the order of pushing the nodes in the queue.
## Time Complexity: $O(n)$
Same as level order traversal, we are visiting every node once, so it is $O(n)$.