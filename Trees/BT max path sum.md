# [Question](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
Difficulty: Hard (hard to imagine the recursion, specially the case of negative numbers) 
# Goal
Find the max sum of node->values along a path in a binary tree. The path can start and end at any node in the tree. The path must contain at least one node and does not need to go through the root.
# Solution
## Trick
Consider this, a path when looked from above (and the path have down-left and down-right facing arrows), will only ever have one node at which it splits (which also happens to be the top node of path). So when we do a dfs, at each node we ask two questions. 
1. what is max sum if this is the node at which path splits? (or another way to say is, what is max sum if this is the top node of path) 
2. what is max sum if this is not the node at which path splits?(or if this is not the top node of path)   
The answer to the first question is the sum (node->val + left + right). The answer to the second question is the sum (node->val + max(left, right)). We return the second answer to the parent node. The first answer can be used to update the global max sum variable.
  
One annoying part is negative numbers. for this, for each node, we take max of left and right with 0. This ensures we don't go adding paths with negative sum to our overall sum.
## Code
```cpp
class Solution 
{
public:
    int maxPathSum(TreeNode* root) 
    {
        helper(root);
        return sum;
    }
    int helper(TreeNode* root)
    {
        if(!root) return 0;

        int left = max(helper(root->left), 0);
        int right = max(helper(root->right), 0);

        sum = max(sum, root->val + left + right);

        return root->val + max(left, right);        
    }
    int sum = INT_MIN;
};
```
Comment- the code is pretty simple and elegant but don't be fooled, it's hard to tackle.
## Time Complexity: $O(n)$