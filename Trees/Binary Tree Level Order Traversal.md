# [Question](https://leetcode.com/problems/binary-tree-level-order-traversal/)
Difficulty: Medium (Easy because of bfs implementation)
# Goal
Create a vector of vectors, where each vector contains the nodes of a level of the tree.
ex. 
``` 
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```
Note: We're actually given a pointer to the root node of the tree. We have to return a vector of vectors. Each vector contains the nodes of a level of the tree.
# Solution
## Trick
Use bst to traverse the tree level by level. That's it lol. This implementation can also be seen in "maximum depth of Binary tree".
## Code
```cpp
vector<vector<int>> levelOrder(TreeNode* root) 
{
    if(root==nullptr) return {};

    deque<TreeNode*> q;
    vector<vector<int>> ans;

    q.push_back(root);

    while (!q.empty())
    { 
        vector<int> temp;
        int n = q.size(); 
        while(n--) 
        { 
            TreeNode *node = q.front();
            q.pop_front();

            if (node->left) q.push_back(node->left);
            if (node->right) q.push_back(node->right);
            temp.push_back(node->val);
        }
        ans.push_back(temp);
    }
    return ans;
}
```
## Time Complexity: $O(n)$
Even though we are going level by level (which would suggest a $O(logn)$ complexity), we are still visiting every node once, so it is $O(n)$.